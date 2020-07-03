''' Modularization of Mongo Data Access. Currently functions and a global variable'''
# External Imports
import pymongo
import os

# Internal Imports
from src.sets.model import Set
from src.data.logger import get_logger
from src.users.model import User

_log = get_logger(__name__)

try:
    _db = pymongo.MongoClient(os.environ.get('MONGO_DATABASE')).project2
    _log.debug("Connected to DB")
except pymongo.errors.PyMongoError:
    _log.exception('Mongo connection has failed')
    raise

def login(username: str, password: str):
    '''checks the given username/password combination against the database.
    returns the username for now. Will discus and return either the user id or username'''
    # query = {"username": username, "password": password}
    response = _db.users.find_one({'username': username})
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

def get_set_by_id(_id: int):
    ''' Gets the set with the given id '''
    query = {'_id': _id}
    try:
        retrieved_set = _db.sets.find_one(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_sets has failed in the database')
    return Set.from_dict(retrieved_set) if retrieved_set else None

def check_answer(set_id: int, choice: int):
    '''takes the set id and the number of the button pressed on the front-end to query the
       sets collection and verify the answer and then returns a boolean'''
    query = {'_id': set_id}
    img_set = _db.sets.find(query)
    correct_option = []
    for i in img_set:
        correct_option.append(i)
    correct_option = correct_option[0]
    correct_option = correct_option['correct_option']
    if choice == correct_option:
        return True
    else:
        return False

def update_voting_record(username: str, set_id: int, correct: bool):
    '''updates a users voting record by appending the set voted on to an array,
       incrementing a correct counter if they voted correctly, and computing the accuracy'''
    query = {'username': username}
    #adds set_id to the sets a user has voted on
    _db.users.update_one(query, {'$push': {'voted_sets': set_id}})
    #if correct, increments the number of correct votes by one
    if correct:
        _db.users.update_one(query, {'$inc': {'correct_votes': 1}})
    user = _db.users.find(query)
    #obtain the number of sets voted on
    a_dict = []
    for i in user:
        a_dict.append(i)
    a_dict = a_dict[0]
    voted_sets = a_dict['voted_sets']
    votes = len(voted_sets)
    #obtain the number of sets voted on correctly
    correct_votes = a_dict['correct_votes']
    #calculate and set accuracy
    accuracy = correct_votes / votes
    _db.users.update_one(query, {'$set': {'accuracy': accuracy}})

def _get_set_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'SET_COUNT'},
                                            {'$inc': {'count': 1}},
                                            return_document=pymongo.ReturnDocument.AFTER)['count']
                                            