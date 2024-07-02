import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const predefinedSkills = {
  "algorithms": ["algorithms"],
  "javascript": ["javascript", "js"],
  "html": ["html"],
  "sql": ["sql"],
  "css": ["css"],
  "programming": ["programming"],
  "cpp": ["c++", "cpp"],
  "react": ["react", "reactjs"],
  "node.js": ["node.js", "nodejs"],
  "python": ["python"],
  "java": ["java"],
  "data structures": ["data structures", "data structure"],
  "restful apis": ["restful apis", "rest apis", "rest"],
  "git": ["git"],
  "docker": ["docker"],
  "kubernetes": ["kubernetes"],
  "aws": ["aws", "amazon web services"],
  "azure": ["azure", "microsoft azure"],
  "continuous integration": ["continuous integration", "ci"],
  "continuous deployment": ["continuous deployment", "cd"],
  "microservices": ["microservices", "micro-service", "microservices architecture"],
  "linux": ["linux"],
  "networking": ["networking"],
  "security": ["security", "cybersecurity"],
  "machine learning": ["machine learning", "ml"],
  "data analysis": ["data analysis", "data analytics"],
  "typescript": ["typescript", "ts"],
  "vue.js": ["vue.js", "vuejs", "vue"],
  "angular": ["angular", "angularjs"],
  "swift": ["swift"],
  "kotlin": ["kotlin"],
  "ruby": ["ruby"],
  "ruby on rails": ["ruby on rails", "rails"],
  "php": ["php"],
  "laravel": ["laravel"],
  "django": ["django"],
  "flask": ["flask"],
  "spring": ["spring", "spring boot"],
  "go": ["go", "golang"],
  "scala": ["scala"],
  "haskell": ["haskell"],
  "elixir": ["elixir"],
  "shell scripting": ["shell scripting", "bash", "sh"],
  "powershell": ["powershell"],
  "ansible": ["ansible"],
  "terraform": ["terraform"],
  "jenkins": ["jenkins"],
  "circleci": ["circleci"],
  "travisci": ["travisci"],
  "splunk": ["splunk"],
  "elk stack": ["elk stack", "elasticsearch", "logstash", "kibana"],
  "grafana": ["grafana"],
  "prometheus": ["prometheus"],
  "puppet": ["puppet"],
  "chef": ["chef"],
  "r": ["r"],
  "sas": ["sas"],
  "tableau": ["tableau"],
  "power bi": ["power bi", "powerbi"],
  "bigquery": ["bigquery"],
  "hadoop": ["hadoop"],
  "spark": ["spark"],
  "pandas": ["pandas"],
  "numpy": ["numpy"],
  "scikit-learn": ["scikit-learn", "sklearn"],
  "tensorflow": ["tensorflow"],
  "pytorch": ["pytorch"],
  "matlab": ["matlab"],
  "opencv": ["opencv"],
  "airflow": ["airflow"],
  "kafka": ["kafka"],
  "rabbitmq": ["rabbitmq"],
  "grpc": ["grpc"],
  "protobuf": ["protobuf"],
  "blockchain": ["blockchain"],
  "ethereum": ["ethereum"],
  "solidity": ["solidity"],
  "truffle": ["truffle"],
  "web3.js": ["web3.js", "web3"],
  "three.js": ["three.js", "threejs"],
  "unity": ["unity"],
  "unreal engine": ["unreal engine", "unreal"],
  "godot": ["godot"],
  "blender": ["blender"],
  "3ds max": ["3ds max", "3dsmax"],
  "maya": ["maya"],
  "cinema 4d": ["cinema 4d", "cinema4d"],
  "photoshop": ["photoshop"],
  "illustrator": ["illustrator"],
  "xd": ["xd", "adobe xd"],
  "figma": ["figma"],
  "sketch": ["sketch"],
  "invision": ["invision"],
  "zeplin": ["zeplin"],
  "mongodb": ["mongodb"],
  "postgresql": ["postgresql", "postgres"],
  "mysql": ["mysql"],
  "sqlite": ["sqlite"],
  "redis": ["redis"],
  "cassandra": ["cassandra"],
  "couchdb": ["couchdb"],
  "dynamodb": ["dynamodb"],
  "realm": ["realm"],
  "firebase": ["firebase"],
  "heroku": ["heroku"],
  "netlify": ["netlify"],
  "vercel": ["vercel"],
  "digitalocean": ["digitalocean"],
  "linode": ["linode"],
  "openstack": ["openstack"],
  "vmware": ["vmware"],
  "hyper-v": ["hyper-v"],
  "virtualbox": ["virtualbox"],
  "vagrant": ["vagrant"],
  "salesforce": ["salesforce"],
  "sap": ["sap"],
  "oracle": ["oracle"],
  "workday": ["workday"],
  "servicenow": ["servicenow"],
  "jira": ["jira"],
  "confluence": ["confluence"],
  "microsoft teams": ["microsoft teams", "teams"],
  "slack": ["slack"],
  "zoom": ["zoom"],
  "google meet": ["google meet", "meet"],
  "webex": ["webex"],
  "trello": ["trello"],
  "asana": ["asana"],
  "notion": ["notion"],
  "monday.com": ["monday.com", "monday"],
  "basecamp": ["basecamp"]
};

const SkillsPage = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSkillSelection = (selectedOption) => {
    setSelectedSkill(selectedOption);
    console.log('Selected Skill:', selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedSkill) {
      console.log('Submitting Skill:', selectedSkill);

      try {
        setIsLoading(true);
        const response = await axios.post('https://3.109.184.229/api/v1/getQuestions', {
          skill: selectedSkill.value,
        });

        navigate('/questions', { state: { questions: response.data.questions, skill: selectedSkill.value } });
      } catch (error) {
        console.error('Error getting questions:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No skill selected');
    }
  };

  const skillOptions = Object.keys(predefinedSkills).map((key) => ({
    value: key,
    label: key,
  }));

  return (
    <div>
      {isLoading && (
        <div style={styles.backdropStyle}>
          <div style={styles.spinnerStyle}></div>
        </div>
      )}
      <div style={styles.container}>
      <img src='/interQ.png' ></img>
        <div style={styles.box}>
          <h2 style={styles.header}>Select Skill to Generate Questions</h2>
          <Select
            options={skillOptions}
            onChange={handleSkillSelection}
            placeholder="Select a skill..."
            styles={customStyles}
          />
          <div style={styles.buttonContainer}> 
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={styles.goBackButton}>
              Go Back
            </button>
          </Link> 
          {selectedSkill && (
            <button onClick={handleSubmit} style={styles.submitButton}>
              Submit Skill
            </button>
          )}
        </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: '300px',
    margin: '20px 0',
    borderColor: '#007BFF',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#0056b3',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
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

export default SkillsPage;
