import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupUser from './components/SignupUser';
import SignupProfessional from './components/SignupProfessional';
import UserDashboard from './components/UserDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup-user" element={<SignupUser />} />
      <Route path="/signup-professional" element={<SignupProfessional />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
    </Routes>
  );
}

export default App;
