''' Handler for the Set operations in the application '''
# External Imports
from flask import Flask, jsonify, Blueprint, request
# Internal Imports
from src.sets.model import Set
from src.users.model import User
import src.statistics.operations as stats
import src.data.mongo as db
from src.data.logger import get_logger
from os import path

_log = get_logger(__name__)

stat_page = Blueprint('stat_page', __name__, static_folder='../static')

@stat_page.route('/stats/aggregate', methods=['GET'])
def get_aggregate_stats():
    ''' Gets all aggregate user stats at the given state in the database '''
    ''' Current stats: 1. Global accuracy across all users across all user types
                       2. Global accuracy across all voters
                       3. Global accuracy across all moderators'''
    # Get accuracy for all users
    user_list = db.get_users()
    user_acc = stats.aggregate_user_accuracy(user_list)
    
    # Get accuracy for all voters
    user_list = db.get_users_by_usertype('voter')
    voter_acc = stats.aggregate_user_accuracy(user_list)
    
    # Get accuracy for all moderators
    user_list = db.get_users_by_usertype('moderator')
    moderator_acc = stats.aggregate_user_accuracy(user_list)
    
    # Get accuracy for users with age between 13 and 17
    user_list = db.get_users_by_age_range(13,18)
    teen_acc = stats.aggregate_user_accuracy(user_list)
    
    # Get accuracy for young adults (18-34)
    user_list = db.get_users_by_age_range(18,35)
    adult_acc = stats.aggregate_user_accuracy(user_list)

    # Get accuracy for adults aged 35 - 55
    user_list = db.get_users_by_age_range(35, 56)
    middle_acc = stats.aggregate_user_accuracy(user_list)

    # Get accuracy for adults aged 56+
    user_list = db.get_users_by_age_range(56, 1000)
    elder_acc = stats.aggregate_user_accuracy(user_list)
    response = {'user_accuracy': user_acc,
                'voter_accuracy': voter_acc,
                'moderator_accuracy': moderator_acc,
                'teen_accuracy': teen_acc,
                'adult_accuracy': adult_acc,
                'middle_aged_accuracy': middle_acc,
                'elder_accuracy': elder_acc}
    return jsonify(response), 200
    