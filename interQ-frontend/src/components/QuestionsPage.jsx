import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import SkillCard from './SkillCard';

const QuestionsPage = () => {
  const location = useLocation();
  const { questions: initialQuestions, skill: initialSkill, name: candidateName } = location.state || { questions: [], skill: null, name: null };
  const [questions, setQuestions] = useState(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Location State:', location.state);
    console.log('Initial Questions:', initialQuestions);
    console.log('Initial Skill:', initialSkill);
  }, [location.state, initialQuestions, initialSkill]);

  const [score, setScore] = useState(0);
  
  
  const fetchQuestions = async () => {
    console.log('Fetching questions for skill:', initialSkill);
    setIsLoading(true);
    try {
      const response = await axios.post('https://3.109.184.229/api/v1/getQuestions', {
        skill: initialSkill,
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <img src='/interQ.png' ></img>
      
      {isLoading ? (
        <div style={styles.backdropStyle}>
          <div style={styles.spinnerStyle}></div>
        </div>
      ) : (
        <div style={styles.outerContainer}>
          <div style={styles.container}>
            <h2 style={styles.header}>Generated Questions</h2>
            <ul style={styles.questionsList}>
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <li key={index} style={styles.questionItem}>
                    {question}
                  </li>
                ))
              ) : (
                <li style={styles.questionItem}>No questions available.</li>
              )}
            </ul>
            <div style={styles.buttonContainer}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={styles.goBackButton}>
                  Go Back
                </button>
              </Link>
              <button onClick={fetchQuestions} style={styles.generateButton}>
                Generate More Questions
              </button>
            </div>
          </div>
          {questions.length > 1 ? (
            <div>
              <SkillCard skill={initialSkill} score={score} onScoreChange={setScore} candidateName={candidateName}/>
            </div>
          ):(<></>)}
        </div>
      )}
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
  outerContainer: {
    display: 'flex',
  },
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
  questionsList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  questionItem: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
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
  generateButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
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
    animation: 'spin 2s linear infinite'
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
    zIndex: 1000
  },
  flexy: {
    display: 'flex'
  },
};

export default QuestionsPage;
