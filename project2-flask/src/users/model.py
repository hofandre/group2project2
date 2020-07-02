'''class for users'''
import datetime
import json
import jwt
from src.data.logger import get_logger

_log = get_logger(__name__)
_secret_key = '10101567unique'

class User():
    '''parent class for all users'''
    def __init__(self, _id="", username="", password="", usertype="voter"):
        self._id = _id
        self.username = username
        self.password = password
        self.usertype = usertype
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
    @staticmethod
    def decode_auth_token(auth_token):
        ''' Decode the auth token to receive the id of user '''
        try:
            payload = jwt.decode(auth_token, _secret_key)
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Token expired. please login again.'
        except jwt.InvalidTokenError:
            return 'Token invalid. Please login.'
    
class Voter(User):
    def __init__(self, db_id='', username='', password='', usertype=''):
        super().__init__(db_id, username, password, usertype)
        self.accuracy = 1

class UserEncoder(json.JSONEncoder):
    ''' Allows us to serialize our objects as JSON '''
    def default(self, o):
        return o.to_dict()
