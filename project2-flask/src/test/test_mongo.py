''' Testing suite for the mongo database '''
# External Imports
import unittest
from unittest.mock import patch
# Internal Imports
from src.sets.model import Set
from src.users.model import User
import src.data.mongo
from src.data.logger import get_logger

_log = get_logger(__name__)

class DBTestSuite(unittest.TestCase):
    ''' Testing Suite Class for MongoDB '''
    @patch('src.data.mongo._db.users.find_one')
    @patch('src.users.model.User.from_dict')
    def test_login(self, mock_user, mock_db):
        ''' Tests the login fn '''
        mock_db.return_value = {'test':'dict'}
        given_user = User()
        mock_user.return_value = given_user
        user = src.data.mongo.login('username', 'password')
        self.assertEqual(user, given_user)
    @patch.object(src.data.mongo, '_db')
    def test_register(self, mock_db):
        ''' Tests the registration in Mongo '''
        mock_db.counter.find_one_and_update.return_value = {'count': -1}
        username = 'TEST USERNAME'
        password = 'TEST PASSWORD'
        role = 'TEST ROLE'
        age = 65
        user = User(-1, username, password, role, age)
        mock_db.users.insert_one.return_value = user
        mock_db.users.find_one.return_value = user.to_dict()
        ret_user = src.data.mongo.register(username, password, role, age)
        _log.debug(ret_user)
        self.assertEqual(ret_user.username, user.username)
    @patch.object(src.data.mongo, '_db')
    def test_user_by_id(self, mock_db):
        ''' Tests get user by id '''
        user = User(-1, 'TEST', 'TEST', 'VOTER', -1)
        mock_db.users.find_one.return_value = user.to_dict()
        ret_user = src.data.mongo.get_user_by_id(-1)
        self.assertEqual(user.username, ret_user.username)

if __name__ == '__main__':
    unittest.main()