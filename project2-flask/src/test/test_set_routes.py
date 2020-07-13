''' Testing suite for the Set class '''
# External Imports
import unittest
from unittest.mock import patch
import werkzeug
from flask import Flask, jsonify

# Internal Imports
import src.app as app
from src.users.model import User
from src.sets.model import Set
import src.data.mongo
import src.statistics.operations
from src.data.logger import get_logger

_log = get_logger(__name__)

class SetRouteTestSuite(unittest.TestCase):
    ''' Testing suite for the set routes'''
    def setUp(self):
        ''' Get an instance of the server '''
        SetRouteTestSuite.server = werkzeug.test.Client(app.app, werkzeug.wrappers.BaseResponse)
    def test_get_all_sets(self):
        ''' Tests the route to get all sets'''
        builder = werkzeug.test.EnvironBuilder(path='/sets', method='GET')
        with patch('src.statistics.operations.set_accuracy_helper') as mock_stat:
            with patch('src.data.mongo.get_sets') as mock_db:
                mock_stat.return_value = {'TEST': 'SETS'}
                mock_db.return_value = {'TEST', 'SETS'}
                resp = SetRouteTestSuite.server.open(builder.get_environ())
                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.data, b'{"TEST":"SETS"}\n')
    def test_get_set_by_keyword(self):
        ''' Tests getting sets by a keyword '''
        builder = werkzeug.test.EnvironBuilder(path='/sets?keyword=TEST', method='GET')
        with patch('src.statistics.operations.set_accuracy_helper') as mock_stat:
            with patch('src.data.mongo.get_sets_by_keyword') as mock_db:
                mock_stat.return_value = {'TEST': 'SETS'}
                mock_db.return_value = {'TEST', 'SETS'}
                resp = SetRouteTestSuite.server.open(builder.get_environ())
                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.data, b'{"TEST":"SETS"}\n')
    def test_get_set_by_id(self):
        ''' Test getting a set by id '''
        builder = werkzeug.test.EnvironBuilder(path='/sets/3', method='GET')
        with patch('src.statistics.operations.set_accuracy_helper') as mock_stat:
            with patch('src.data.mongo.get_set_by_id') as mock_db:
                mock_stat.return_value = [{'TEST': 'SETS'}]
                mock_db.return_value = {'TEST', 'SETS'}
                resp = SetRouteTestSuite.server.open(builder.get_environ())
                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.data, b'{"TEST":"SETS"}\n')
    def test_vote(self):
        ''' Tests voting on a set '''
        builder = werkzeug.test.EnvironBuilder(path='/sets/3/TEST/vote', method='POST', json={'vote':'A'})
        with patch('src.data.mongo.check_answer') as mock_check:
            with patch('src.data.mongo.update_voting_record') as mock_update:
                mock_check.return_value = True
                mock_update.return_value = .56
                resp = SetRouteTestSuite.server.open(builder.get_environ())
                self.assertEqual(resp.status_code, 201)
                self.assertEqual(resp.data, b'0.56\n')
    def test_get_comments(self):
        ''' Tests getting all comments'''
        builder = werkzeug.test.EnvironBuilder(path='/sets/3/comments', method='GET')
        with patch('src.data.mongo.get_set_by_id') as mock_db:
            with patch.object(src.sets.model, 'Set') as mock_set:
                mock_db.return_value = mock_set
                mock_set.to_dict.return_value = {'comments': ['TEST', 'TEST 2', 'TEST 3']}
                resp = SetRouteTestSuite.server.open(builder.get_environ())
                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.data, b'["TEST","TEST 2","TEST 3"]\n')


if __name__ == '__main__':
    unittest.main()