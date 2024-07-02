import os
from sqlalchemy import create_engine
from llama_index.core import SQLDatabase
from llama_index.core.query_engine import NLSQLTableQueryEngine
from dotenv import load_dotenv
load_dotenv()

DB_URI = os.getenv('DB_URI')
TABLE_NAME = os.getenv("TABLE_NAME")
engine = create_engine(DB_URI)

sql_database = SQLDatabase(engine, include_tables=[TABLE_NAME])
query_engine = NLSQLTableQueryEngine(sql_database, verbose=True)

def run_query(nl_query: str):
    response = query_engine.query(nl_query)
    query_response = {
        'response': response.response,
        'metadata': response.metadata
    }
    return query_response