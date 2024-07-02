import random
import logging
from sqlalchemy import create_engine, Table, MetaData, insert, select
from sqlalchemy.exc import SQLAlchemyError

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

engine = create_engine('postgresql+psycopg2://sigsegv:vgesgis@localhost/fy24_applications_db')

metadata = MetaData()

try:
    fy24_applications = Table('fy24_applications', metadata, autoload_with=engine)
    logger.info("Table reflection successful.")
except SQLAlchemyError as e:
    logger.error("Error reflecting table: %s", e)
    raise

def generate_dummy_data():
    names = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna', 'Ishaan', 'Shaurya']
    surnames = ['Patel', 'Shah', 'Singh', 'Kumar', 'Joshi', 'Mehta', 'Chauhan', 'Gupta', 'Desai', 'Sharma']
    genders = ['Male', 'Female']
    status = ['select', 'reject']
    onboarding_status = ['reject', 'waiting', 'rolled']

    dummy_data = []
    for i in range(100): 
        name = f"{random.choice(names)} {random.choice(surnames)}"
        gender = random.choice(genders)
        
        round_1_technical_skill = round(random.uniform(0, 10), 2)
        round_1_communication = round(random.uniform(0, 10), 2)
        round_1_open_to_learn = round(random.uniform(0, 10), 2)
        round_1_team_work = round(random.uniform(0, 10), 2)
        round_1_combined_score = round(random.uniform(0, 100), 2)
        round_1_status = random.choice(status)
        
        round_2_technical_skill = round(random.uniform(0, 10), 2)
        round_2_communication = round(random.uniform(0, 10), 2)
        round_2_open_to_learn = round(random.uniform(0, 10), 2)
        round_2_team_work = round(random.uniform(0, 10), 2)
        round_2_combined_score = round(random.uniform(0, 100), 2)
        round_2_status = random.choice(status)
        
        round_3_technical_skill = round(random.uniform(0, 10), 2)
        round_3_communication = round(random.uniform(0, 10), 2)
        round_3_open_to_learn = round(random.uniform(0, 10), 2)
        round_3_team_work = round(random.uniform(0, 10), 2)
        round_3_combined_score = round(random.uniform(0, 100), 2)
        round_3_status = random.choice(status)
        
        onboarding_status_value = random.choice(onboarding_status)
        
        dummy_data.append({
            'name': name,
            'gender': gender,
            'round_1_technical_skill': round_1_technical_skill,
            'round_1_communication': round_1_communication,
            'round_1_open_to_learn': round_1_open_to_learn,
            'round_1_team_work': round_1_team_work,
            'round_1_combined_score': round_1_combined_score,
            'round_1_status': round_1_status,
            'round_2_technical_skill': round_2_technical_skill,
            'round_2_communication': round_2_communication,
            'round_2_open_to_learn': round_2_open_to_learn,
            'round_2_team_work': round_2_team_work,
            'round_2_combined_score': round_2_combined_score,
            'round_2_status': round_2_status,
            'round_3_technical_skill': round_3_technical_skill,
            'round_3_communication': round_3_communication,
            'round_3_open_to_learn': round_3_open_to_learn,
            'round_3_team_work': round_3_team_work,
            'round_3_combined_score': round_3_combined_score,
            'round_3_status': round_3_status,
            'onboarding_status': onboarding_status_value
        })
    
    return dummy_data

def insert_dummy_data():
    dummy_data = generate_dummy_data()

    with engine.connect() as connection:
        transaction = connection.begin()
        try:
            for data in dummy_data:
                stmt = insert(fy24_applications).values(data).returning(fy24_applications.c.application_number)
                result = connection.execute(stmt)
                inserted_primary_key = result.scalar() 
                logger.info(f"Inserted row with application_number: {inserted_primary_key}")
            transaction.commit() 
        except SQLAlchemyError as e:
            logger.error("Error inserting data: %s", e)
            transaction.rollback() 
            raise

insert_dummy_data()

with engine.connect() as connection:
    result = connection.execute(select([fy24_applications]))
    for row in result:
        print(row)
