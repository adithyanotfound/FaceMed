require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./db/User');
const Professional = require('./db/professional');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const cors = require('cors');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_DB_URL);

faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, 'models'));
faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, 'models'));
faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, 'models'));

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send('Access Denied');
        }
        next();
    };
}

// POST /upload endpoint (User registration)
app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { name, password, emergencyContact, bloodGroup, allergies, pastSurgery, otherMedicalConditions, aadharNumber } = req.body;
        
        if (!name || !password || !emergencyContact || !bloodGroup || !req.file || !aadharNumber) {
            return res.status(400).send('All fields are required.');
        }
        
        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long.');
        }

        const existingUser = await User.findOne({ aadharNumber });

        if (existingUser) {
            return res.status(400).send('A user with this Aadhaar number already exists.');
        }

        const newUser = new User({
            name,
            password,
            emergencyContact,
            bloodGroup,
            allergies,
            pastSurgery,
            otherMedicalConditions,
            aadharNumber,
            photo: req.file.buffer
        });
        await newUser.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).send('Error saving user: ' + error.message);
    }
});

// POST /register-professional endpoint (Medical professional registration)
app.post('/register-professional', async (req, res) => {
    try {
        const { name, contact, doctorId, affiliatedHospital, password } = req.body;

        if (!name || !contact || !doctorId || !affiliatedHospital || !password) {
            return res.status(400).send('All fields are required.');
        }

        const existingProfessional = await Professional.findOne({ doctorId });

        if (existingProfessional) {
            return res.status(400).send('A professional with this Doctor ID already exists.');
        }

        const newProfessional = new Professional({
            name,
            contact,
            doctorId,
            affiliatedHospital,
            password,
        });
        await newProfessional.save();
        res.status(201).send('Medical professional registered successfully');
    } catch (error) {
        res.status(500).send('Error registering professional: ' + error.message);
    }
});

// POST /login endpoint
app.post('/login', async (req, res) => {
    const { password, role, doctorId, aadharNumber } = req.body;
    const model = role === 'professional' ? Professional : User;
    const additionalField = role === 'professional' ? { doctorId } : { aadharNumber };

    try {
        const user = await model.findOne({ ...additionalField });

        if (!user) {
            return res.status(400).send('User not found or invalid credentials');
        }

        if (password !== user.password) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// GET /userData endpoint (User login and get data)
app.get('/userData', authenticateJWT, authorize('user'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        res.json({
            name: user.name,
            aadharNumber: user.aadharNumber,
            emergencyContact: user.emergencyContact,
            bloodGroup: user.bloodGroup,
            allergies: user.allergies,
            pastSurgery: user.pastSurgery,
            otherMedicalConditions: user.otherMedicalConditions
        });
    } catch (error) {
        res.status(500).send('Error fetching user data: ' + error.message);
    }
});

// POST /update endpoint (User data update)
app.post('/update', authenticateJWT, authorize('user'), upload.single('photo'), async (req, res) => {
    try {
        const { emergencyContact, bloodGroup, allergies, pastSurgery, otherMedicalConditions } = req.body;
        const updateFields = {
            emergencyContact,
            bloodGroup,
            allergies,
            pastSurgery,
            otherMedicalConditions
        };
        if (req.file) updateFields.photo = req.file.buffer;

        const user = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true });
        res.status(200).send('User data updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user data: ' + error.message);
    }
});

// POST /verify endpoint (Restricted to medical professionals)
app.post('/verify', authenticateJWT, authorize('professional'), upload.single('photo'), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).send('No photo provided or invalid file.');
        }

        const img = await canvas.loadImage(req.file.buffer);

        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

        if (!detection) {
            return res.status(404).send('No face detected in the provided image.');
        }

        const inputDescriptor = detection.descriptor;

        const users = await User.find({});
        let match = null;

        for (const user of users) {
            const dbBuffer = Buffer.from(user.photo.buffer);
            const dbImg = await canvas.loadImage(dbBuffer);

            const dbDetection = await faceapi.detectSingleFace(dbImg).withFaceLandmarks().withFaceDescriptor();

            if (dbDetection) {
                const dbDescriptor = dbDetection.descriptor;
                const distance = faceapi.euclideanDistance(inputDescriptor, dbDescriptor);

                if (distance < 0.6) {
                    match = user;
                    break;
                }
            }
        }

        if (match) {
            res.json({
                name: match.name,
                aadharNumber: match.aadharNumber,
                emergencyContact: match.emergencyContact,
                bloodGroup: match.bloodGroup,
                allergies: match.allergies,
                pastSurgery: match.pastSurgery,
                otherMedicalConditions: match.otherMedicalConditions
            });
        } else {
            res.status(404).send('No match found');
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).send('Error verifying user: ' + error.message || error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});