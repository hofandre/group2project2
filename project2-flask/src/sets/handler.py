''' Handler for the Set operations in the application '''
# External Imports
from flask import Flask, jsonify, Blueprint, request
# Internal Imports
from src.sets.model import Set
import src.statistics.operations as stats
import src.data.mongo as db
from src.data.logger import get_logger
from os import path

_log = get_logger(__name__)

set_page = Blueprint('set_page', __name__, static_folder='../static')

@set_page.route('/sets', methods=['GET'])
def set_collection():
    # GET METHOD:
    if request.method == 'GET':
        if request.args:
            set_list = None
            if request.args.get('keyword'):
                keyword = request.args.get('keyword')
                set_list = db.get_sets_by_keyword(keyword)
            if set_list:
                set_list = stats.set_accuracy_helper(set_list)
                return jsonify(set_list), 200
            else: 
                return jsonify('Bad Request'), 400
        else:
            set_list = stats.set_accuracy_helper(db.get_sets())
            return jsonify(set_list), 200

@set_page.route('/sets/<int:setid>', methods=['GET'])
def set_by_id(setid):
    # GET METHOD:
    given_set = db.get_set_by_id(setid)
    if given_set:
        given_set = stats.set_accuracy_helper([given_set])[0]
        return jsonify(given_set), 200
    else:
        return jsonify('Bad Request'), 400

@set_page.route('/sets/<int:setid>/<username>/vote', methods=['POST'])
def update_user_accuracy(setid, username):
    _log.debug(request.get_json())
    verification = db.check_answer(setid, request.get_json()['vote'])
    accuracy = db.update_voting_record(username, setid, verification)
    return jsonify(accuracy), 201
        
@set_page.route('/sets/<int:setid>/<username>/comment', methods=['POST'])
def make_a_comment(setid, username):
    _log.debug(request.get_json())
    db.append_comment_to_set(username, setid, request.get_json()['comment'])
    return jsonify('comment made it to the server'), 201
    
@set_page.route('/sets/<int:setid>/comments', methods=['GET'])
def do_a_thing(setid):
    given_set = db.get_set_by_id(setid)
    given_set = given_set.to_dict()
    _log.debug(given_set)
    comments = given_set['comments']
    _log.debug(comments)
    return jsonify(comments)

# @set_page.route('/sets/<int:setid>/accuracy', methods=['GET'])
# def get_set_accuracy(setid):
#     # Steps:
#     # 1. For each user, check if they have voted on a set/
#     # 2. IF user has voted, how many times, and how many times correctly
#     # 3. Calculate total votes, and total correct votes
#     # 4. Return set accuracy 
#     user_list = db.get_users_by_set(setid)
#     if not user_list:
#         return jsonify('0'), 200
#     else:
#         set_accuracy = stats.calculate_set_accuracy(user_list, setid)
#     results = {'accuracy': round(set_accuracy, 3)}
#     return jsonify(results), 200    
    #returns accuracy
    # accuracy = db.update_voting_record(username, setid, verification)
    # return jsonify(accuracy), 201
        
