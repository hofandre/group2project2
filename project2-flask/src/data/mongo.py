''' Modularization of Mongo Data Access. Currently functions and a global variable'''
# External Imports
import pymongo
import os
# from decouple import config

# Internal Imports
from src.sets.model import Set
from src.decks.model import Deck, DeckEncoder
from src.data.logger import get_logger
from src.users.model import User

_log = get_logger(__name__)

try:
    _db = pymongo.MongoClient(os.environ.get('MONGO_DATABASE')).project2
    # _db = pymongo.MongoClient(config('MONGO_DATABASE')).project2
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

def register(username: str, password: str, role: str, age: int):
    ''' Creates a new user.'''
    _id = _db.counter.find_one_and_update({'_id': 'USER_COUNT'},
                                          {'$inc': {'count': 1}},
                                          return_document=pymongo.ReturnDocument.AFTER)['count']
    _log.debug(_id)
    query = {"_id": _id, "username": username, "password": password, "role": role}
    user = User(_id, username, password, role, int(age))
    _log.debug(query)
    try:
        _db.users.insert_one(user.to_dict())
    except pymongo.errors.DuplicateKeyError:
        _log.info('Duplicate key error detected in the database for username %s', username)
        return 'Duplicate Username Error'
    except pymongo.errors.PyMongoError:
        _log.exception('register has failed in the db')
        return None
    return User.from_dict(_db.users.find_one({'_id': _id}))

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

def submit_set(query: dict):
    new_set = None
    _id = _db.counter.find_one_and_update({'_id': 'SET_COUNT'},
                                         {'$inc': {'count': 1}},
                                         return_document=pymongo.ReturnDocument.AFTER)['count']
    query["_id"] = _id
    _log.debug(query)
    try:
        _db.potential_sets.insert_one(query)
        new_set = Set.from_dict(_db.potential_sets.find_one({"_id": _id}))
    except pymongo.errors.PyMongoError:
        _log.exception('set_set has failed in the database')
    return new_set

def get_pending_sets():
    ''' Gets all the pending sets from the collections'''
    try:
        set_list = _db.potential_sets.find()
    except pymongo.errors.PyMongoError:
        _log.exception('get_pending_sets has failed in the database')
    return [Set.from_dict(each_set) for each_set in set_list]

def get_set_by_id(_id: int):
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
    return [Set.from_dict(each_set) for each_set in set_list] if set_list else None

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
        _db.users.update_one(query, {'$push': {'votes': 1}})
    else:
        _db.users.update_one(query, {'$push': {'votes': 0}})
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
    return accuracy

def append_comment_to_set(username: str, set_id: int, comment: str):
    '''appends a comment to the comment array on a set'''
    _log.debug('going to add comment to database')
    query = {'_id': set_id}
    given_set = get_set_by_id(set_id)
    given_set = given_set.to_dict()
    comments = given_set['comments']
    _db.sets.update_one(query, {'$push': {'comments': {'set_id': set_id,
                                                       'comment_id': len(comments),
                                                       'user': username, 'comment': comment}}})

def _get_set_id():
    '''Retrieves the next id in the database and increments it.'''
    return _db.counter.find_one_and_update({'_id': 'SET_COUNT'},
                                            {'$inc': {'count': 1}},
                                            return_document=pymongo.ReturnDocument.AFTER)['count']
                                            
def get_user_by_username(username: str):
    '''Returns a user by their id'''
    user = {}
    db_user = _db.users.find_one({'username': username})
    if db_user :
        user = User.from_dict(db_user)
    return user

def update_usertype(_id: int, usertype: str):
    '''finds and updates a user's usertype'''
    return _db.users.find_one_and_update({"_id":_id}, {"$set" : {"usertype":usertype}})

def get_users():
    try:
        user_list = _db.users.find()
    except pymongo.errors.PyMongoError:
        _log.exception('get_users has failed in the database')
    return [User.from_dict(user) for user in user_list]

def get_users_by_set(setid):
    ''' Returns a list of all users that have voted on a particular set'''
    query = {'voted_sets': setid}
    user_list = None
    try:
        user_list = _db.users.find(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_users_by_set has failed on set_id %d', setid)
    return [User.from_dict(user) for user in user_list] if user_list else None

def delete_user_by_id(_id: int):
    query = {"_id":_id}
    _db.users.find_one_and_delete(query)
    return _db.users.find_one(query)
    
def delete_set_by_id(set_id):
    ''' Deletes the set with the given set_id'''
    query = {'_id': set_id}
    try:
        result = _db.sets.delete_one(query)
    except pymongo.errors.PyMongoError:
        _log.exception('delete_set_by_id has failed to delete set with id %d', set_id)
    return result.deleted_count == 1

def find_deck_id():
    for i in range(100000):
        if not _db.decks.find_one({"_id":i}):
            return i
    return None

def add_deck(db_id:int, title: str, set_list: list):
    if not _db.decks.find_one({"_id": db_id}):
        _db.decks.insert_one(Deck(db_id, title, set_list).to_dict())
        return Deck(db_id, title, set_list).to_dict()
    else:
        return {}

def get_deck_by_id(db_id: int):
    ''' Gets the deck by its id'''
    query = {'_id': db_id}
    deck = None
    try:
        deck = _db.decks.find_one(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_deck_by_id has failed on id: %d', db_id)
    return deck if deck else None

def add_pending_set_to_sets(set_id):
    '''queries a set from pending sets and adds it to sets'''
    query = {'_id': set_id}
    new_set = _db.potential_sets.find_one(query)
    _log.debug(new_set)
    _db.sets.insert_one(new_set)

def delete_pending_set(set_id):
    '''deletes a pending set'''
    query = {'_id': set_id}
    _db.potential_sets.delete_one(query)
    
def get_users_by_usertype(usertype):
    ''' Retrieves all users of a given usertype'''
    query = {'usertype': usertype}
    user_list = None
    try:
        user_list = _db.users.find(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_user_by_usertype failed on usertype %s', usertype)
    return [User.from_dict(user) for user in user_list] if user_list else None

def get_users_by_age_range(start_age, end_age):
    ''' Retrieves all users within the age range given. Start inclusive, End exclusive '''
    query = {'$and': [{ 'age': {'$gte': start_age}}, {'age': {'$lt': end_age}}]}
    user_list = []
    try:
        user_list = _db.users.find(query)
    except pymongo.errors.PyMongoError:
        _log.exception('get_users_by_age_range has failed on range %d to %d', start_age, end_age)
    return [User.from_dict(user) for user in user_list] if user_list else None
    
def delete_comment(set_id: int, comment_id: int):
    _log.debug('Mongo :Deleting comment')
    id_query = {"_id":set_id}
    retrieved_set = _db.sets.find_one(id_query)
    comments = retrieved_set['comments']
    comment = comments[comment_id]
    comments.remove(comment)
    index = 0
    for comment in comments:
        comment['comment_id'] = index
        index = index + 1
    return comments

def update_comments(set_id, comments):
    _db.sets.find_one_and_update({"_id":set_id}, {"$set" : {"comments": comments}})
