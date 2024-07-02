from sqlalchemy import create_engine, Column, Integer, String, Enum, Float, Table, MetaData, CheckConstraint

# Create an engine that connects to a PostgreSQL database
engine = create_engine('postgresql+psycopg2://sigsegv:vgesgis@localhost/fy24_applications_db')

# Define metadata to hold table definitions
metadata = MetaData()

# Define the table schema
fy24_applications = Table(
    'fy24_applications', metadata,
    Column('application_number', Integer, primary_key=True),
    Column('name', String, nullable=False),
    Column('gender', Enum('Male', 'Female', name='gender_enum'), nullable=False),
    
    # Round 1 columns
    Column('round_1_technical_skill', Integer, CheckConstraint('round_1_technical_skill >= 0 AND round_1_technical_skill <= 10')),
    Column('round_1_communication', Integer, CheckConstraint('round_1_communication >= 0 AND round_1_communication <= 10')),
    Column('round_1_open_to_learn', Integer, CheckConstraint('round_1_open_to_learn >= 0 AND round_1_open_to_learn <= 10')),
    Column('round_1_team_work', Integer, CheckConstraint('round_1_team_work >= 0 AND round_1_team_work <= 10')),
    Column('round_1_combined_score', Integer, CheckConstraint('round_1_combined_score >= 0 AND round_1_combined_score <= 100')),
    Column('round_1_status', Enum('select', 'reject', name='status_enum')),

    # Round 2 columns
    Column('round_2_technical_skill', Integer, CheckConstraint('round_2_technical_skill >= 0 AND round_2_technical_skill <= 10')),
    Column('round_2_communication', Integer, CheckConstraint('round_2_communication >= 0 AND round_2_communication <= 10')),
    Column('round_2_open_to_learn', Integer, CheckConstraint('round_2_open_to_learn >= 0 AND round_2_open_to_learn <= 10')),
    Column('round_2_team_work', Integer, CheckConstraint('round_2_team_work >= 0 AND round_2_team_work <= 10')),
    Column('round_2_combined_score', Integer, CheckConstraint('round_2_combined_score >= 0 AND round_2_combined_score <= 100')),
    Column('round_2_status', Enum('select', 'reject', name='status_enum')),

    # Round 3 columns
    Column('round_3_technical_skill', Integer, CheckConstraint('round_3_technical_skill >= 0 AND round_3_technical_skill <= 10')),
    Column('round_3_communication', Integer, CheckConstraint('round_3_communication >= 0 AND round_3_communication <= 10')),
    Column('round_3_open_to_learn', Integer, CheckConstraint('round_3_open_to_learn >= 0 AND round_3_open_to_learn <= 10')),
    Column('round_3_team_work', Integer, CheckConstraint('round_3_team_work >= 0 AND round_3_team_work <= 10')),
    Column('round_3_combined_score', Integer, CheckConstraint('round_3_combined_score >= 0 AND round_3_combined_score <= 100')),
    Column('round_3_status', Enum('select', 'reject', name='status_enum')),

    # Onboarding status column
    Column('onboarding_status', Enum('reject', 'waiting', 'rolled', name='onboarding_status_enum'))
)

# Create the table in the database
metadata.create_all(engine)
