''' Module for testing the accuracy of a set across all users'''
# External Imports
import unittest
from unittest.mock import patch
# Internal Imports
from src.users.model import User
from src.statistics.operations import calculate_set_accuracy, set_accuracy_helper
from src.data.logger import get_logger
import src.data.mongo
from src.sets.model import Set


_log = get_logger(__name__)

class TestSetAccuracy(unittest.TestCase):
    ''' Class for testing the fn that calculates accuracy of a set across a list of users '''
    def test_calc_acc(self):
        ''' Tests the fn calculate_set_accuracy'''
        user_1 = User(1, 'test', 'test', 'voter')
        user_2 = User(2, 'test', 'test', 'voter')
        user_3 = User(3, 'test', 'test', 'voter')
        user_4 = User(4, 'test', 'test', 'voter')
        user_1.voted_sets = [1,1,2,3,2,1,3]
        user_1.votes =      [0,1,1,1,1,0,1]
        user_2.voted_sets = [1,1,2,3]
        user_2.votes =      [0,0,1,1]
        user_3.voted_sets = [1]
        user_3.votes =      [1]
        user_4.voted_sets = [1,1,1]
        user_4.votes =      [1,0,0]
        user_list = [user_1, user_2, user_3, user_4]
        ret_accuracy = calculate_set_accuracy(user_list, 1)
        expected_accuracy = (2/4)
        self.assertEqual(ret_accuracy, expected_accuracy)
    @patch('src.data.mongo._db.get_users_by_set')
    @patch('src.statistics.operations.calculate_set_accuracy')
    def test_acc_helper(self, mock_calc, mock_db):
        ''' tests the accuracy helper'''
        set1 = Set(1, 1, 'test 1', ['test', 'test2'], ['test', 'test2'])
        set2 = Set(2, 2, 'test 1', ['test', 'test2'], ['test', 'test2'])
        set_list = [set1, set2]
        user_1 = User(1, 'test', 'test', 'voter')
        user_2 = User(2, 'test', 'test', 'voter')
        user_3 = User(3, 'test', 'test', 'voter')
        user_4 = User(4, 'test', 'test', 'voter')
        user_list = [user_1, user_2, user_3, user_4]
        mock_db.return_value = user_list
        mock_calc.return_value = .67
        ret_list = set_accuracy_helper(set_list)
        _log.debug(mock_db)
        _log.debug(mock_calc)
        self.assertEqual(ret_list[0].accuracy, .67)
        self.assertEqual(ret_list[1].accuracy, .67)

if __name__ == '__main__':
    unittest.main()
