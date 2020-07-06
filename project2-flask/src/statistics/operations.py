''' Module for statistical operations on sets'''
# External Imports
# Internal Imports
from src.users.model import User

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
    return float(correct_votes/total_votes)