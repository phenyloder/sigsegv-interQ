import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResumePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [canName, setCanName] = useState("Candidate");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    toast.info("Fetching Skills...");

    try {
      const response = await axios.post('https://3.109.184.229/api/v1/getSkills/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSkills(response.data.matched_skills);
      setCanName(response.data.candidate_name);
      setFilteredSkills(response.data.matched_skills);
      toast.success("Skills fetched successfully!");
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error fetching skills.");
    }
  };

  const handleSkillSelection = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://3.109.184.229/api/v1/getQuestions', {
        skill: selectedSkill,
      });
      navigate('/questions', { state: { questions: response.data.questions, skill: selectedSkill, name: canName } });
    } catch (error) {
      setIsLoading(false);
      console.error('Error getting questions:', error);
    }
  };

  return (
    <div>
       <img src='/interQ.png' ></img>
      {isLoading && (
        <div style={styles.backdropStyle}>
          <div style={styles.spinnerStyle}></div>
        </div>
      )}
      <div style={styles.container}>
        <h2 style={styles.header}>Upload Resume to Extract Skills</h2>
        <div style={styles.uploadContainer}>
          <input type="file" onChange={handleFileChange} style={styles.fileInput} />
          <button onClick={handleFileUpload} style={styles.uploadButton}>Upload Resume</button>
        </div>
        <select
          value={selectedSkill}
          onChange={handleSkillSelection}
          style={styles.dropdown}
        >
          <option value="" disabled>Select a skill</option>
          {filteredSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        <div style={styles.buttonContainer}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={styles.goBackButton}>Go Back</button>
          </Link>
          {selectedSkill && (
            <button onClick={handleSubmit} style={styles.submitButton}>Submit Skill</button>
          )}
        </div>
      </div>
      <ToastContainer />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f7f9fc',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  fileInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  uploadButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  dropdown: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  spinnerStyle: {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
  },
  backdropStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20px',
  },
  goBackButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ResumePage;
