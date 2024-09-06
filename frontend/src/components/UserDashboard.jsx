import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/userData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User data updated successfully');
      setIsEditing(false);
      setUserData(formData);
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
        <motion.div
          className="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
          }}
        >
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent border-solid rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">User Dashboard</h2>
        {!isEditing ? (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Aadhaar Number:</strong> {userData.aadharNumber}</p>
            <p><strong>Emergency Contact:</strong> {userData.emergencyContact}</p>
            <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
            <p><strong>Allergies:</strong> {userData.allergies}</p>
            <p><strong>Past Surgery:</strong> {userData.pastSurgery}</p>
            <p><strong>Other Medical Conditions:</strong> {userData.otherMedicalConditions}</p>
            <button
              className="bg-teal-600 text-white w-full py-2 mt-4 rounded-lg hover:bg-teal-700 transition duration-300"
              onClick={() => setIsEditing(true)}
            >
              Edit Information
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.allergies}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pastSurgery"
              placeholder="Past Surgery"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.pastSurgery}
              onChange={handleChange}
            />
            <input
              type="text"
              name="otherMedicalConditions"
              placeholder="Other Medical Conditions"
              className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
              value={formData.otherMedicalConditions}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white w-full py-2 mt-2 rounded-lg hover:bg-gray-600 transition duration-300"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
        <button
          className="bg-red-500 text-white w-full py-2 mt-4 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
