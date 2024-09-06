import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

const SignupProfessional = () => {
  const [formData, setFormData] = useState({
    name: '',
    doctorId: '',
    password: '',
    contact: '',
    affiliatedHospital: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/register-professional', formData);
      alert('Medical Professional registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + error.response.data);
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
          Signup as Professional
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
          name="doctorId"
          placeholder="Doctor ID"
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
          name="contact"
          placeholder="Contact"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          name="affiliatedHospital"
          placeholder="Affiliated Hospital"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          type="submit"
          className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
        >
          Signup
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default SignupProfessional;
