'''class for users'''
import datetime
import json
import jwt
from src.data.logger import get_logger

_log = get_logger(__name__)
_secret_key = '10101567unique'

class User():
    '''parent class for all users'''
    def __init__(self, db_id='', username='', password=''):
        self._id = db_id
        self.username = username
        self.password = password
    def to_dict(self):
        '''returns a dict representation of the object'''
        return self.__dict__
    def encode_auth_token(self):
        ''' Generate an authentication token for this user '''
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': self._id
            }
            _log.debug("payload set")
            return jwt.encode(payload, _secret_key, algorithm='HS256')
        except Exception as e:
            _log.exception('Encode failed.')
            return e
    @classmethod
    def from_dict(cls, dictionary):
        '''function to turn a dict into a valid user object'''
        user = User()
        user.__dict__.update(dictionary)
        return user

class Voter(User):
    def __init__(self, db_id='', username='', password='', usertype=''):
        super().__init__(db_id, username, password)
        self.accuracy = 1

class UserEncoder(json.JSONEncoder):
    ''' Allows us to serialize our objects as JSON '''
    def default(self, o):
        return o.to_dict()
