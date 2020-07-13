''' Handler for the Set operations in the application '''
# Built-in Imports
import os
from os import path, getcwd
import sys
import ntpath
import base64
# External Imports
from flask import Flask, jsonify, Blueprint, request
# Internal Imports
from src.sets.model import Set
from src.users.model import User
import src.statistics.operations as stats
import src.data.mongo as db
from src.data.logger import get_logger


_log = get_logger(__name__)

set_page = Blueprint('set_page', __name__, static_folder='../static')

@set_page.route('/sets', methods=['GET', 'POST'])
def set_collection():
    # GET METHOD:
    if request.method == 'GET':
        if request.args:
            set_list = None
            if request.args.get('keyword'):
                keyword = request.args.get('keyword')
                set_list = db.get_sets_by_keyword(keyword)
            elif request.args.get('deck'):
                deck_id = int(request.args.get('deck'))
                _log.debug('Deck ID: %d', deck_id)
                deck = None
                deck = db.get_deck_by_id(deck_id)
                if deck:
                    set_id_list = deck['set_ids']
                    if set_id_list:
                        set_list = []
                        for _id in set_id_list:
                            set_list.append(db.get_set_by_id(int(_id)))
            if set_list:
                set_list = stats.set_accuracy_helper(set_list)
                return jsonify(set_list), 200
            else:
                return jsonify('Bad Request'), 400
        else:
            set_list = stats.set_accuracy_helper(db.get_sets())
            return jsonify(set_list), 200
    elif request.method == 'POST':
        _log.debug(request.get_json())
        db.add_pending_set_to_sets(int(request.get_json()['set_id']))
        _log.debug('made it to here')
        return jsonify('set moved to sets'), 201

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

@set_page.route('/potential_sets', methods=['POST'])
def upload_set():
    if request.method == 'POST':
        correct_option = request.get_json()['correct_option']
        title = request.get_json()['title']
        file_name_one = ntpath.basename(request.get_json()['file_name_one'])
        file_name_two = ntpath.basename(request.get_json()['file_name_two'])
        alt_text_one = request.get_json()['alt_text_one']
        alt_text_two = request.get_json()['alt_text_two']
        keyword_list = request.get_json()['keywords']
        paths = [file_name_one, file_name_two]
        keywords = keyword_list.split()
        alt_texts = [alt_text_one, alt_text_two]
        query = {'correct_option': int(correct_option), 'title': title,
                 'paths': paths, 'keywords': keywords, 'alt_texts': alt_texts,
                 'comments': [], 'deck_tags': []}
        new_set = db.submit_set(query)
        return jsonify(new_set), 201
    else:
        return jsonify('Bad Request'), 400

@set_page.route('/images', methods=['PUT'])
def upload_image():
    if request.method == 'PUT':
        _log.debug(ntpath.basename(request.content_type))
        path = '../../project2react/src/img/' + ntpath.basename(request.content_type)
        with open(path, 'wb+') as f:
            im = f.write(request.data)
        return jsonify('Good Request'), 201
    else:
        return jsonify('Bad Request'), 400
        
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
    
@set_page.route('/sets/<int:set_id>/<int:comment_id>', methods=['DELETE'])
def delete_a_comment(set_id, comment_id):
    _log.debug('Handler: deleting comment')
    _log.debug(request.get_json())
    comments = db.delete_comment(set_id, comment_id)#deletes one comment
    db.update_comments(set_id, comments)
    #return jsonify(comments), 200 #returns all coments in a set once a comment is deleted
    return jsonify(comments), 200

@set_page.route('/sets/pending', methods=['GET', 'DELETE'])
def retrieve_pending_sets():
    set_list = db.get_pending_sets()
    set_list = [each_set.to_dict() for each_set in set_list]
    return jsonify(set_list), 200

@set_page.route('/sets/pending/<int:setid>', methods=['DELETE'])
def delete_pending_set(setid):
    db.delete_pending_set(setid)
    return jsonify('deleted the set'), 200
