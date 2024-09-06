import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { FaSpinner } from 'react-icons/fa'; // For spinner icon

const ProfessionalDashboard = () => {
  const [photo, setPhoto] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setCapturedImage(null);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUseCamera(false);

    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => setPhoto(new File([blob], "captured.png", { type: "image/png" })));
  };

  const handleScan = async () => {
    if (!photo) {
      alert('Please upload or capture a photo to scan');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/verify', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResultData(response.data);
    } catch (error) {
      console.error('Error scanning photo:', error);
      alert('Failed to retrieve data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md">
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">Medical Professional Dashboard</h2>
        
        <div className="mb-4">
          <button
            className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={() => {
              setUseCamera(!useCamera);
              setCapturedImage(null);
            }}
          >
            {useCamera ? 'Switch to Upload' : 'Use Camera'}
          </button>
        </div>

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
                className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                onClick={handleCapture}
              >
                Capture Photo
              </button>
            )}
          </div>
        ) : (
          <input
            type="file"
            className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
            onChange={handleFileChange}
            required
          />
        )}

        {capturedImage && (
          <div className="mb-4">
            <h3 className="text-lg mb-2 text-teal-800">Captured Image:</h3>
            <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4" />
          </div>
        )}

        <button
          className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center"
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Scanning...
            </>
          ) : (
            'Scan and Retrieve Data'
          )}
        </button>

        {loading && (
          <div className="mt-4 text-center">
            <p className="text-teal-800 font-bold">Scanning in progress, please wait...</p>
          </div>
        )}

        {resultData && (
          <div className="mt-4">
            <h3 className="text-lg mb-2 text-teal-800">Patient Information:</h3>
            <p><strong>Name:</strong> {resultData.name}</p>
            <p><strong>Aadhaar Number:</strong> {resultData.aadharNumber}</p>
            <p><strong>Emergency Contact:</strong> {resultData.emergencyContact}</p>
            <p><strong>Blood Group:</strong> {resultData.bloodGroup}</p>
            <p><strong>Allergies:</strong> {resultData.allergies}</p>
            <p><strong>Past Surgery:</strong> {resultData.pastSurgery}</p>
            <p><strong>Other Medical Conditions:</strong> {resultData.otherMedicalConditions}</p>
          </div>
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

export default ProfessionalDashboard;
