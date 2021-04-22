
class Config:
    ENV: str
    SERVER_HOST: str
    SERVER_PORT: str
    SERVER_DB_NAME: str
    SERVER_URI: str

class DevelopmentConfig(Config):
    ENV = 'dev'
    DB_NAME = "dev-plant_db"
    DB_URI = f"{DB_NAME}.sqlite3"

class ProductionConfig(Config):
    ENV = 'prod'
    DB_NAME = "prod-plant_db"
    DB_URI = f"{DB_NAME}.sqlite3"

class LocalConfig(Config):
    ENV = 'local'
    DB_NAME = 'local-plant_db'
    DB_FOLDER = 'db'
    DB_URI = f'{DB_FOLDER}/{DB_NAME}.sqlite3'

env_config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'local': LocalConfig,
}
