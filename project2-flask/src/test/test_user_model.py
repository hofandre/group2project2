'''module to test the user class'''
import unittest
import json
import jwt
from src.users.model import User, UserEncoder
from src.data.logger import get_logger

_log = get_logger(__name__)

class UserTests(unittest.TestCase):
    '''tests for the user class'''
    user = None
    @classmethod
    def setUpClass(cls):
        '''set up for all tests'''
        _log.debug("Running Unit Test Suite for User Class")
    @classmethod
    def tearDownClass(cls):
        '''tear down at end of all tests'''
        _log.debug("Finished with User Class Tests")
    def setUp(self):
        '''set up for an individual test'''
        UserTests.user = User(1, "username", "password")
    def tearDown(self):
        '''Tear down an individual test'''
        UserTests.user = None
    def test_from_dict(self):
        '''tests the from_dict class method'''
        _log.debug("Testing User.from_dict()")
        dictionary = UserTests.user.__dict__
        self.assertIsInstance(User.from_dict(dictionary), User,
                              "Should return a User")      
    def test_to_dict(self):
        '''tests the to_dict funtion'''
        _log.debug("Testing User.to_dict()")
        ret_val = UserTests.user.to_dict()
        self.assertIsInstance(ret_val, dict, "Should return a dict")
    def test_encoder(self):
        '''tests that the json encoder returns a dict'''
        _log.debug("Testing User JSON Encoder Class")
        self.assertIsInstance(json.dumps(UserTests.user, cls=UserEncoder), str,
                              "Should encode to a str")
if __name__ == "__main__":
    unittest.main()