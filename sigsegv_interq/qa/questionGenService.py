import pandas as pd
# from ..config.logger import logger
import random
from llama_index.core.evaluation import DatasetGenerator, RelevancyEvaluator
from llama_index.readers.file import PyMuPDFReader

async def get_questions(skill):
    filePath = get_file_path(skill)
    if filePath == None:
        return ["Skill yet to be added. Keep an eye out!"]
    loader = PyMuPDFReader()
    documents = loader.load(file_path=filePath)
    data_generator = DatasetGenerator.from_documents(documents)
    eval_questions = await data_generator.agenerate_questions_from_nodes()

    print(type(eval_questions))
    # return eval_questions
    return get_new_questions(eval_questions)

def get_file_path(skill: str) -> str:
    if skill=='python':
        return "./skill_files/python-pages.pdf"
    elif skill=='cpp':
        return "./skill_files/cpp-pages.pdf"
    elif skill=='java':
        return "./skill_files/java-pages.pdf"
    else:
        return None

def get_new_questions(ques_list):
    new_ques_list = random.sample(ques_list,10)
    return new_ques_list

