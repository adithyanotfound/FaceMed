import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        password,
        role,
        [role === 'professional' ? 'doctorId' : 'aadharNumber']: identifier,
      });

      localStorage.setItem('token', response.data.token);

      if (role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/professional-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + (error.response?.data || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 100%)',
          zIndex: -1,
          filter: 'blur(2px)',
        }}
      />

      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">Login</h2>

        <motion.select 
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform duration-300 ease-in-out"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <option value="user">User</option>
          <option value="professional">Medical Professional</option>
        </motion.select>

        <motion.input
          type="text"
          placeholder={role === 'user' ? 'Aadhaar Number' : 'Doctor ID'}
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform duration-300 ease-in-out"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        />

        <motion.input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform duration-300 ease-in-out"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
        />

        <motion.button
          className="relative bg-teal-600 text-white w-full py-2 rounded-lg shadow-md overflow-hidden"
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Logging In...' : 'Login'}
        </motion.button>
        
        {loading && <div className="text-teal-600 mt-4">Loading...</div>}

        <div className="mt-6 flex justify-between">
          <motion.button
            className="text-teal-600 hover:text-teal-800"
            onClick={() => navigate('/signup-user')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          >
            Signup as User
          </motion.button>
          <motion.button
            className="text-teal-600 hover:text-teal-800"
            onClick={() => navigate('/signup-professional')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          >
            Signup as Professional
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
