''' Module for statistical operations on sets'''
# External Imports
# Internal Imports
from src.users.model import User
import src.data.mongo as db

def calculate_set_accuracy(user_list, set_id):
    ''' Calculates the acccuracy of a set across the given user_list'''
    total_votes = 0
    correct_votes = 0
    for user in user_list:
        for i, _set in enumerate(user.voted_sets):
            if _set == set_id:
                total_votes += 1
                if user.votes[i]:
                    correct_votes += 1
                break
    return float(correct_votes/total_votes)

def set_accuracy_helper(set_list):
    ''' Helper fn that calculates the accuracy for each set in a list '''
    user_list = []
    new_sets = []
    for i, _set in enumerate(set_list):
        user_list = db.get_users_by_set(_set._id)
        _set.accuracy = calculate_set_accuracy(user_list, _set._id)
        new_sets.append(_set)
    return new_sets
                    