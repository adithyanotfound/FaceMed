const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    emergencyContact: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    allergies: { type: String },
    pastSurgery: { type: String },
    otherMedicalConditions: { type: String },
    photo: { type: Buffer, required: true }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
