import os
from fastapi import APIRouter, UploadFile, Request
from ..resume_parser import resume_parser
from ..filteredskills import get_matched_skills, predefined_skills
from .questionGenService import get_questions
from .queryService import run_query
from pydantic import BaseModel
router = APIRouter(prefix="/api/v1")

class SkillBody(BaseModel):
    skill: str

class QueryBody(BaseModel):
    query: str

@router.get("/getSkills")
async def getSkillsCheck():
    return {'message': 'Get Skills Route Working!'}

@router.post("/getSkills/")
async def getSkills(file: UploadFile):
    print(f'File {file.filename} Uploaded')
    file_location = f"files/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    resumeData = resume_parser.ResumeParser(file_location).get_extracted_data()

    resume_skills = resumeData.get('skills', [])
    candidateName = resumeData.get('name', 'Candidate')

    matched_skills = get_matched_skills(resume_skills)
    os.remove(file_location)
    return {"matched_skills": matched_skills, "candidate_name": candidateName}

@router.get("/getQuestions")
async def getQuestionsCheck():
    return {'message': 'Get Questions Route Working!'}

@router.post("/getQuestions")
async def getSkills(skillBody: SkillBody):
    skill = skillBody.skill
    questionArray = await get_questions(skill)
    return {'questions': questionArray}

@router.get("/runQuery")
async def runQueryCheck():
    return {'message': 'Run Query Route Working!'}

@router.post("/runQuery")
async def runQuery(queryBody: QueryBody):
    query = queryBody.query
    queryResult = run_query(query)
    return queryResult