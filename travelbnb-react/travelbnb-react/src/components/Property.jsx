import React from 'react';

function Property(props) {
    const propertyCardStyle = {
        background: '#3B3030', // Light background color
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '15px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
    };

    const propertyNameStyle = {
        fontSize: '1.8em',
        margin: '0 0 10px',
        color: '#FFF0D1', // Dark gray color for the title
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '2px solid #B17457', // Use a darker shade for the underline
        paddingBottom: '10px',
    
    };

    const propertyDetailStyle = {
        fontSize: '1em',
        margin: '8px 0',
        color: '#B17457', // Use the brown color for details
        lineHeight: '1.6',
        transition: 'color 0.3s ease',
    };

    const highlightStyle = {
        fontWeight: 'bold',
        color: '#D8D2C2', // Lighter brown for highlights
    };

    return (
        <div
            className="property-card"
            style={propertyCardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px #F8EDE3';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px #F8EDE3';
            }}
        >
            <h3 style={propertyNameStyle}>{props.name}</h3>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Guests:</span> {props.no_guests}
            </p>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Bedrooms:</span> {props.no_bedrooms}
            </p>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Bathrooms:</span> {props.no_bathrooms}
            </p>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Price:</span> ${props.price.toLocaleString()}
            </p>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Country:</span> {props.country_id}
            </p>
            <p style={propertyDetailStyle}>
                <span style={highlightStyle}>Location:</span> {props.location_id}
            </p>
        </div>
    );
}

export default Property;
