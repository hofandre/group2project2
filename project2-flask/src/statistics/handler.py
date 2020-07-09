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
    user_list = db.get_users()
    _log.debug('# of users: %d', len(user_list))
    user_acc = stats.aggregate_user_accuracy(user_list)
    user_list = db.get_users_by_usertype('voter')
    _log.debug('# of voters: %d', len(user_list))
    voter_acc = stats.aggregate_user_accuracy(user_list)
    user_list = db.get_users_by_usertype('moderator')
    _log.debug('# of moderators: %d', len(user_list))
    moderator_acc = stats.aggregate_user_accuracy(user_list)
    response = {'user_accuracy': user_acc,
                'voter_accuracy': voter_acc,
                'moderator_accuracy': moderator_acc}
    return jsonify(response), 200
    