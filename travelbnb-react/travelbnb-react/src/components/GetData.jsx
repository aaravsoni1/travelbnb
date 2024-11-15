import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToken } from './TokenContext';
import { useNavigate } from 'react-router-dom';
import Property from './Property';
import { motion } from 'framer-motion';

function GetData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/property/allProperties', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching protected data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    background: {
      backgroundColor: '#FAF7F0', // Background color for the entire page
      minHeight: '100vh', // Ensure it covers full height
      padding: '20px', // Padding around the container
    },
    header: {
      textAlign: 'center',
      color: '#4A4947', // Header color
      fontSize: '2em', // Increased font size
      marginBottom: '10px', // Margin below header
      borderBottom: '2px solid #B17457', // Underline with specified color
      paddingBottom: '5px', // Space between text and underline
      backgroundColor: '#F8F4E1', // Light taupe background
      borderRadius: '5px', // Optional: Add slight rounding to the corners
      padding: '10px', // Optional: Add padding around the text
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#007bff',
    },
    errorMessage: {
      textAlign: 'center',
      color: '#f00',
    },
    propertyContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    logoutButton: {
      display: 'block',
      margin: '20px auto',
      padding: '10px 20px',
      backgroundColor: '#B17457',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    logoutButtonHover: {
      backgroundColor: '#333',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.header}>Property Listings</h2>

        {loading && <p style={styles.loadingMessage}>Loading data...</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <div style={styles.propertyContainer}>
          {data && (
            <>
              {data.length > 0 ? (
                data.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ margin: '10px', flex: '1 1 calc(30% - 20px)', overflow: 'hidden' }} // Style for property cards
                  >
                    <Property
                      name={property.name}
                      no_guests={property.noGuests}
                      no_bedrooms={property.no_bedrooms}
                      no_bathrooms={property.no_bathrooms}
                      price={property.price}
                      country_id={property.country}
                      location_id={property.location}
                    />
                  </motion.div>
                ))
              ) : (
                <p>No properties found.</p>
              )}
            </>
          )}
        </div>

        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.logoutButton.backgroundColor}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default GetData;
