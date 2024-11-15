// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useToken } from './TokenContext';

function Login() {
  const [name, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { saveToken } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      username: name,
      password: pass,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', postData);

      // Store tokens in localStorage
      saveToken(response.data.token);
      console.log("Token saved from Login: " + response.data.token);
      
      // Navigate to the protected route
      window.location.href = '/property'; 
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '4rem auto',
      padding: '30px',
      backgroundColor: '#FAF7F0',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    title: {
      textAlign: 'center',
      color: '#B17457',
      marginBottom: '10px',
      fontSize: '28px', // Increased font size for better visibility
    },
    subtitle: {
      textAlign: 'center',
      color: '#4A4947',
      marginBottom: '20px',
      fontSize: '16px', // Increased font size for better visibility
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '15px',
      fontWeight: 'bold',
    },
    input: {
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #D8D2C2',
      borderRadius: '5px',
      fontSize: '16px',
      width: '100%',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#B17457', // Change border color on focus
    },
    button: {
      padding: '12px',
      backgroundColor: '#B17457',
      color: '#FAF7F0',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px', // Increased font size for better visibility
      transition: 'background-color 0.3s, transform 0.3s',
      width: '100%',
      marginTop: '15px', // Add margin for spacing
    },
    buttonHover: {
      backgroundColor: '#4A4947',
      transform: 'scale(1.05)', // Slightly enlarge on hover
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <p style={styles.subtitle}>Please enter your credentials to log in</p>
      
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={(e) => e.currentTarget.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.currentTarget.style.borderColor = '#D8D2C2'} // Reset border color on blur
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => e.currentTarget.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.currentTarget.style.borderColor = '#D8D2C2'} // Reset border color on blur
          required
        />
        
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} // Button press effect
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset scale
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
