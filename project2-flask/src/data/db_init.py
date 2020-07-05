''' Initializes the Database. DO NOT USE UNINTENDED. IT DROPS ALL TABLES'''
# External Imports
import pymongo
import os
# import decouple

# Internal Imports
from src.sets.model import Set
from src.users.model import User
from src.data.logger import get_logger

_log = get_logger(__name__)

try:
    _db = pymongo.MongoClient(os.environ.get('MONGO_DATABASE')).project2
except pymongo.errors.PyMongoError:
    _log.exception('Mongo connection has failed')
    raise

def _get_set_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'SET_COUNT'},
                                            {'$inc': {'count': 1}},
                                            return_document=pymongo.ReturnDocument.AFTER)['count']

if __name__ == '__main__':
    _db.sets.drop()
    # _db.users.drop()
    _db.counter.drop()

    _db.counter.insert_one({'_id': 'SET_COUNT', 'count': 0})

    set_list = []
    set_list.append(Set(_get_set_id(), 1, 
    'Which scientist is known for developing the planetary model of the atom?',
    ['bohr.jpg', 'rutherford.jpg']).to_dict())
    _db.sets.insert_one(set_list[0])

    # user_list = []
    # user_list.append(User(_get_set_id(), 'username', 'password', 'voter').to_dict())
    # user_list.append(User(_get_set_id(), 'jotaro', 'star_platinum', 'voter').to_dict())
    # user_list.append(User(_get_set_id(), 'diavolo', 'king_crimson', 'moderator').to_dict())
    # _db.users.insert_many(user_list)
