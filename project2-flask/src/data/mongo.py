''' Modularization of Mongo Data Access. Currently functions and a global variable'''
# External Imports
import pymongo
import os
# import decouple

# Internal Imports
from src.sets.model import Set
from src.data.logger import get_logger

_log = get_logger(__name__)

try:
    _db = pymongo.MongoClient(os.environ.get('MONGO_DATABASE')).project2
    #_db = pymongo.MongoClient(decouple.config('MONGO_DATABASE')).project2
except pymongo.errors.PyMongoError:
    _log.exception('Mongo connection has failed')
    raise

def get_sets():
    ''' Gets all the sets from the collections'''
    try:
        set_list = _db.sets.find()
    except pymongo.errors.PyMongoError:
        _log.exception('get_sets has failed in the database')
    return [Set.from_dict(each_set) for each_set in set_list]
