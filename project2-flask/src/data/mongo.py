''' Modularization of Mongo Data Access. Currently functions and a global variable'''
# External Imports
import pymongo
import os
from decouple import config

# Internal Imports
from src.sets.model import Set
from src.data.logger import get_logger
from src.users.model import User

_log = get_logger(__name__)


try:
    #_db = pymongo.MongoClient(os.environ.get('MONGO_DATABASE')).project2
    _db = pymongo.MongoClient(config('MONGO_DATABASE')).project2
except pymongo.errors.PyMongoError:
    _log.exception('Mongo connection has failed')
    raise

def login(username: str, password: str):
    '''checks the given username/password combination against the database.
    returns the username for now. Will discus and return either the user id or username'''
    # query = {"username": username, "password": password}
    response = _db.users.find_one({"username":"username"})
    if response:
         return User.from_dict(response)
    return None

def get_user_by_id(db_id: int):
    '''Returns a user by their id'''
    return User.from_dict(_db.users.find_one({'_id': db_id}))

def get_sets():
    ''' Gets all the sets from the collections'''
    try:
        set_list = _db.sets.find()
    except pymongo.errors.PyMongoError:
        _log.exception('get_sets has failed in the database')
    return [Set.from_dict(each_set) for each_set in set_list]

def get_set_by_id(_id):
    ''' Gets the set with the given id '''
    query = {'_id': _id}
    try:
        retrieved_set = _db.sets.find_one(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_sets has failed in the database')
    return Set.from_dict(retrieved_set) if retrieved_set else None

def get_sets_by_keyword(keyword):
    ''' Gets all sets with the given keyword '''
    query = {'keywords': keyword.lower()}
    set_list = None
    try:
        set_list = _db.sets.find(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_sets_by_keyword has failed in the database for keyword %s', keyword)
    return [Set.from_dict(each_set) for each_set in set_list]

def _get_set_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'SET_COUNT'},
                                            {'$inc': {'count': 1}},
                                            return_document=pymongo.ReturnDocument.AFTER)['count']
