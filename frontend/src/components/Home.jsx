import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Ripple from "./Ripple";

const Home = () => {
  const navigate = useNavigate();

  const handleUseItClick = () => {
    navigate("/login");
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#BCEFF1',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Ripple />
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: window.innerWidth < 768 ? '16px' : '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontSize: window.innerWidth < 768 ? '20px' : '28px',
          fontWeight: 'bold',
          color: '#004d40'
        }}>FaceMed</div>
        <nav style={{
          display: window.innerWidth < 768 ? 'none' : 'flex',
          gap: '24px'
        }} />
      </header>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)',
        padding: window.innerWidth < 768 ? '16px' : '32px',
        textAlign: 'center'
      }}>
        <motion.h1
  style={{
    fontSize: window.innerWidth < 768 ? '40px' : '92px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #004d40, #009688, #004d40)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px',
    zIndex: 1
  }}
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  FaceMed
</motion.h1>

        <motion.h1
          style={{
            fontSize: window.innerWidth < 768 ? '24px' : '36px',
            fontWeight: '700',
            color: '#004d40',
            marginBottom: '24px'
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Your Medical History at Your Fingertips
        </motion.h1>
        <motion.p
          style={{
            fontSize: window.innerWidth < 768 ? '16px' : '20px',
            color: '#004d40',
            marginBottom: '32px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Scan your face and instantly access your medical records.
        </motion.p>
        <motion.button
          style={{
            background: 'linear-gradient(135deg, #004d40, #00695c)',
            color: 'white',
            padding: window.innerWidth < 768 ? '12px 24px' : '16px 32px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            border: 'none',
            cursor: 'pointer',
            fontSize: window.innerWidth < 768 ? '16px' : '18px',
            fontWeight: '700',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            zIndex: 1
          }}
          onClick={handleUseItClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}
          transition={{ duration: 0.3 }}
        >
          Use It
        </motion.button>
      </main>
    </div>
  );
};

export default Home;
