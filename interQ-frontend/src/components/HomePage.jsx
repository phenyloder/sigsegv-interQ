import React from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaListAlt, FaDatabase } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <img src='/interQ.png' ></img>
      <h1 style={styles.header}>Welcome to your own Interview Assistant</h1>
      <div style={styles.optionsContainer}>
        <Link to="/select-resume" style={{ ...styles.optionBox, ...styles.uploadBox }} className="option-box">
          <FaUpload style={styles.icon} />
          <h2 style={styles.optionHeader}>Upload Resume to Extract Skills</h2>
          <p style={styles.optionText}>Upload a candidate's resume to automatically identify their skills.</p>
        </Link>
        <Link to="/select-skill" style={{ ...styles.optionBox, ...styles.selectBox }} className="option-box">
          <FaListAlt style={styles.icon} />
          <h2 style={styles.optionHeader}>Select Skill to Generate Questions</h2>
          <p style={styles.optionText}>Select a skill from the list to generate interview questions instantly.</p>
        </Link>
        <Link to="/sqlBot" style={{ ...styles.optionBox, ...styles.sqlBox }} className="option-box">
          <FaDatabase style={styles.icon} />
          <h2 style={styles.optionHeader}>Access the DB using SQLBot</h2>
          <p style={styles.optionText}>Get live candidates status using Natural Language</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '50px',
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  optionBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    border: '2px solid transparent',
    borderRadius: '15px',
    textDecoration: 'none',
    color: '#000',
    width: '300px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
  },
  uploadBox: {
    borderColor: '#007BFF',
  },
  selectBox: {
    borderColor: '#28a745',
  },
  sqlBox: {
    borderColor: '#ffc107',
  },
  optionBoxHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
  icon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  optionHeader: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#007BFF',
  },
  optionText: {
    fontSize: '16px',
    color: '#555',
  },
};

export default HomePage;
