# InterQ - A Generative AI based Interview Assitance
## Problem Statement: 
### Employment
The objective of this project is to streamline the interviewing process and facilitate the tracking of each candidate's performance across multiple interview rounds. Discussions with several interviewers at Cisco have highlighted two main challenges:
- Identifying fresh questions for each interview
- Separately tracking individual skill levels and current hiring status

### Solution Approach
The application aims to provide GenAI text-based assiatance for various stages of Hiring. The applications implements the following features:
- Scan Resume to Get Skills
- Get Generated Questions for Skills
- Query Database using Natural Language


# Backend Server - 

## Installation and Settings
Base requirements to run the InterQ Application is:
```shell
git clone https://github-hyc.scm.engit.cisco.com/vindas/sigsegv-interQ
```

### Change Enviroment (Optional)
Perform this step for a keeping the packages separated from the globally installed packages.

Install virtualenv if you haven't already: 
```shell
pip install virtualenv
```

Create a virtual environment: 
```shell
virtualenv <env_name>
```

Activate the virtual environment:

On Windows: 
```shell
<env_name>\Scripts\activate
```
On Unix/macOS: 
```shell
source <env_name>/bin/activate
```

### Install python
Install Python>=3.10 (if you do not have it already). Ideally through a python version manager like pyenv. Earlier python versions are not supported.
osx/linux: pyenv
windows: pyenv-win

### Install Poetry: A package manangement tool for python
```shell
pip install poetry
```

### Install dependencies
```shell
poetry install 
```

### Installing Spacy and NLTK Dependencies
```shell
python -m spacy download en_core_web_sm
python -m nltk.downloader words stopwords
```

### Installing PostgreSQL and Setting up DB Server
```shell
cd setup
sudo ./setup_postgres.sh
```


## Starting Server and Making Queries
### Run the app
```shell
poetry run python main.py
```

### Get Skills
The API Endpoint for Getting Skills from Resume is:
```shell 
http://127.0.0.1:5050/api/v1/getSkills
```
Send a POST Request with body as a Resume File

### Get Questions
The API Endpoint for Getting Skills from Resume is:
```shell 
http://127.0.0.1:5050/api/v1/getQuestions
```
Send a POST Request with the following JSON Body:
```shell
{
  'skill':'<yourSkill>'
}
```

### Run Natural Language Query
The API Endpoint that receives query in Natural Language, Converts into a Valid SQL Syntax, Runs over the DB and returns the result again in the Natural Language
```shell 
http://127.0.0.1:5050/api/v1/runQuery
```
Send a POST Request with the following JSON Body:
```shell
{
  'query':'<yourQuery>'
}
```

## Troubleshooting
### I am not able to Clone the Repository
Ensure that you have access to the repository. If yes, make sure you have authorised your system using git token or credentials.

### I have an older version of python, what to do?
You can use pyenv to switch between different version of python.
Alternatively, you can use Anaconda to create a complete different enviroment. It ensures that you have some basic essential packages pre-installed.

# Frontend Server - 

## Installation
For setting up the React Frontend, follow the steps:
```shell
cd interQ-frontend
```

### Install Required Packages
```shell
npm i
```

## Starting Server
### Running the frontend application
```shell
npm run dev
```

The application can be accessed on the link below:
```shell
http://localhost:5173/
```
