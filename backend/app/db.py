import os
from .config import env_config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

env = ['production_api', 'dev']
env_variables = 'local'

for e in env:
    env_key = os.getenv(e)
    if env_key:
        env_variables = env_key
        break;

config = env_config[env_variables]
print(config.ENV)
engine = create_engine(f'sqlite:///{config.DB_URI}', connect_args={'check_same_thread': False})
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_title():
    api_name = 'PLANT-API'
    return f'{api_name}-{config.ENV}' if config.ENV != 'prod' else api_name
