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

@set_page.route('/sets/<int:setid>', methods=['GET', 'DELETE'])
def set_by_id(setid):
    # GET METHOD:
    if request.method == 'GET':
        given_set = db.get_set_by_id(setid)
        if given_set:
            given_set = stats.set_accuracy_helper([given_set])[0]
            return jsonify(given_set), 200
        else:
            return jsonify('Bad Request'), 400
    elif request.method == 'DELETE':
        # Get the user credentials from the request body:
        auth_token = request.cookies.get('authorization')
        user = db.get_user_by_id(User.decode_auth_token(auth_token))
        if not user.usertype == 'admin':
            return jsonify('Forbidden'), 403
        success = db.delete_set_by_id(setid)
        if success:
            return jsonify('No Content'), 204
        else:
            return jsonify('Bad Request'), 400
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
def get_comments_by_set(setid):
    given_set = db.get_set_by_id(setid)
    given_set = given_set.to_dict()
    comments = given_set['comments']
    return jsonify(comments), 200

@set_page.route('/sets/pending', methods=['GET'])
def get_pending_sets():
    set_list = db.get_pending_sets()
    set_list = [each_set.to_dict() for each_set in set_list]
    return jsonify(set_list), 200
