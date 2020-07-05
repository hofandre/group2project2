''' Testing suite for the Set class '''
# External Imports
import unittest
from unittest.mock import patch
import flask
# Internal Imports
import src.data.mongo as db
from src.sets.handler import set_collection
from src.sets.model import Set

class KeywordDBTestSuite (unittest.TestCase):
    ''' Testing suite for the database with set keywords'''
    @patch('src.data.mongo._db.sets')
    def test_get_by_collection(self, mock_db):
        ''' Tests to make sure the database properly sends the correct keyword in all lower case'''
        _set = Set(-2, 1, 'TEST TITLE', ['PATH 1', 'PATH 2'])
        _set.add_keyword('test')
        mock_db.find.return_value = None
        set_list = db.get_sets_by_keyword('test')
        mock_db.find.assert_called_with({'keywords': 'test'})
        self.assertEqual(set_list, None)


if __name__ == '__main__':
    unittest.main()