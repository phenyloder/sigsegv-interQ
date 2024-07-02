// SkillCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  margin: 8px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SkillCard = ({skill, score, onScoreChange, candidateName}) => {
  return (
    <Card>
      {candidateName?
      <h3>
        Candidate's Name: {candidateName}
      </h3>
      : ""}
      <h3>
        Interview Skill: {skill ? skill.toUpperCase() : ""}
      </h3>
      <label>
        Score out of 100:
        <Input type="number" value={score} onChange={(e) => onScoreChange(e.target.value)} max={100} min={0} />
      </label>
      <button className="submit" style={{backgroundColor: 'green'}}>Update Score</button>
    </Card>
  );
};

export default SkillCard;
