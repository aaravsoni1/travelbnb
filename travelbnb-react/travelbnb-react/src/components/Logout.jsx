// Logout.jsx
import React, { useContext, useState } from 'react';
import { TokenContext } from './TokenContext';
import 'src/styles.css';

const Logout = ({ setLoggedIn }) => {
  const { setToken } = useContext(TokenContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  // Inline styles
  const styles = {

    
    button: {
      padding: '10px 20px',
      backgroundColor: '#B17457',
      color: '#FAF7F0',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#4A4947',
    },
    dialog: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FAF7F0',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      zIndex: 1000,
    },
    dialogTitle: {
      fontWeight: 'bold',
      color: '#4A4947',
      marginBottom: '10px',
    },
    dialogContent: {
      color: '#333',
      marginBottom: '20px',
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };

  return (
    <>
      <button className='logout-button'
        style={styles.button}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        Logout
      </button>

      {open && (
        <>
          <div style={styles.overlay} onClick={() => setOpen(false)} />
          <div style={styles.dialog}>
            <h2 style={styles.dialogTitle}>Confirm Logout</h2>
            <p style={styles.dialogContent}>Are you sure you want to logout?</p>
            <div style={styles.dialogActions}>
              <button
                // style={{
                //   ...styles.button,
                //   backgroundColor: '#D8D2C2',
                //   color: '#4A4947',
                //   marginRight: '10px',
                // }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button 
           

                onClick={handleLogout}
              >
                Logout
              </button>
            
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Logout;



