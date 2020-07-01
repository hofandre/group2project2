'''will handle all data access and modification'''

import os
import pymongo
from src.data.logger import get_logger
from src.users.model import User

_log = get_logger(__name__)

try:
    #TODO: CAN YOU CHANGE THIS SO THAT IT WORKS ON DIFFERENT COMPUTERS
    _db = pymongo.MongoClient(os.environ.get("MONGO_URI")).project2
    DB_ACCESS = True
    _log.info("Successfully connected to MongoDB")
except Exception:
    _log.error("Could not connect to MongoDB")
    #TODO: what level of logging should this be?
    DB_ACCESS = False

def login(username: str, password: str):
    '''checks the given username/password combination against the database.
    returns the username for now. Will discus and return either the user id or username'''
    query = {"username": username, "password": password}
    response = _db.users.find_one(query)
    if response:
        return User.from_dict(response)
    return None

