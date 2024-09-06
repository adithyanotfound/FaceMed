import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';

const SignupUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadharNumber: '',
    password: '',
    emergencyContact: '',
    bloodGroup: '',
    allergies: '',
    pastSurgery: '',
    otherMedicalConditions: '',
    photo: null,
  });
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        setFormData((prevData) => ({
          ...prevData,
          photo: new File([blob], 'captured.png', { type: 'image/png' }),
        }));
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
    setCapturedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      await axios.post('http://localhost:3000/upload', formDataObj);
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + (error.response?.data || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md"
        onSubmit={handleSubmit}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.h2
          className="text-2xl mb-6 text-center text-teal-800 font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Signup as User
        </motion.h2>

        <motion.input
          type="text"
          name="name"
          placeholder="Name"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="aadharNumber"
          placeholder="Aadhaar Number"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="allergies"
          placeholder="Allergies"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="pastSurgery"
          placeholder="Past Surgery"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="otherMedicalConditions"
          placeholder="Other Medical Conditions"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <button
            type="button"
            className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={() => {
              setUseCamera((prev) => !prev);
              setCapturedImage(null);
              setFormData((prevData) => ({
                ...prevData,
                photo: null,
              }));
            }}
          >
            {useCamera ? 'Switch to Upload' : 'Use Camera'}
          </button>
        </motion.div>

        {useCamera ? (
          <div className="mb-4">
            {!capturedImage ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full h-auto mb-4"
              />
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4" />
            )}
            {!capturedImage && (
              <button
                type="button"
                className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                onClick={handleCapture}
              >
                Capture Photo
              </button>
            )}
          </div>
        ) : (
          <motion.input
            type="file"
            className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
            onChange={handleFileChange}
            whileFocus={{ scale: 1.05 }}
          />
        )}

        <motion.button
          type="submit"
          className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1,
          }}
        >
          {loading ? (
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: 'linear',
              }}
            >
              Signing Up...
            </motion.div>
          ) : (
            'Signup'
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default SignupUser;
