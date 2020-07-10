''' Testing suite for the Set class '''
# External Imports
import unittest
from unittest.mock import patch
import werkzeug
import flask
# Internal Imports
import src.app as app
from src.users.model import User
import src.data.mongo
from src.data.logger import get_logger

_log = get_logger(__name__)

class AppRoutesTestSuite(unittest.TestCase):
    ''' Testing suite for the routes defined in app.py '''
    def setUp(self):
        ''' Gets a version of the app for recieving its responses'''
        AppRoutesTestSuite.server = werkzeug.test.Client(app.app, werkzeug.wrappers.BaseResponse)
    def test_home_route(self):
        ''' tests the response for a get request to '/' '''
        resp = AppRoutesTestSuite.server.get('/')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data, b'Hello World')
    def test_logout(self):
        ''' Tests a delete request to /users. This is a logout request '''
        resp = AppRoutesTestSuite.server.delete('/users')
        cookie_data = resp.headers['Set-Cookie'].split(';')
        self.assertEqual(cookie_data[0].split('=')[1], '')
        self.assertEqual(cookie_data[1].split('=')[1], '/')
        self.assertEqual(resp.status_code, 204)
    def test_check_login(self):
        ''' Tests a get request to /users. This checks to see if a user is logged in '''
        headers = werkzeug.datastructures.Headers()
        headers.add('authorization', 'TEST VALUE')
        builder = werkzeug.test.EnvironBuilder(path='/users',method='GET', headers=headers)
        with patch('src.data.mongo._db.get_user_by_id') as mock_db:
            with patch.object(src.users.model, 'User') as mock_user:
                mock_user.decode_auth_token.return_value = -1
                mock_db.return_value = 'TEST USER'
                resp = AppRoutesTestSuite.server.get(builder.get_environ())
                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.data, b'TEST USER')

if __name__ == '__main__':
    unittest.main()