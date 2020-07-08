''' Module for testing the deletion of a set'''
# External Imports
import unittest
from unittest.mock import patch
import pymongo
# Internal Imports
import src.data.mongo
from src.data.logger import get_logger


_log = get_logger(__name__)
class SetDeleteTestSuite(unittest.TestCase):
    ''' Test suite for the set deletion user story '''
    def test_delete_set_mongo(self):
        ''' Tests the mongo fn for deleting a set'''
        with patch.object(src.data.mongo, '_db') as mock_db:
            with patch.object(pymongo.results, 'DeleteResult') as mock_res:
                mock_res.deleted_count = 1
                _log.debug(mock_db)
                mock_db.sets.delete_one.return_value = mock_res
                self.assertTrue(src.data.mongo.delete_set_by_id(3))
                mock_db.sets.delete_one.assert_called_with({'_id': 3})

if __name__ == '__main__':
    unittest.main()