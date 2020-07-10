''' Handler for the Set operations in the application '''
# Built-in Imports
import os
from os import path, getcwd
import sys
import ntpath
import base64
from PIL import Image
# External Imports
from flask import Flask, jsonify, Blueprint, request
# Internal Imports
from src.sets.model import Set
import src.data.mongo as db
from src.data.logger import get_logger


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
                return jsonify(set_list), 200
            else:
                return jsonify('Bad Request'), 400
        else:
            return jsonify(db.get_sets()), 200

@set_page.route('/sets/<int:setid>', methods=['GET'])
def set_by_id(setid):
    # GET METHOD:
    given_set = db.get_set_by_id(setid)
    if given_set:
        return jsonify(given_set), 200
    else:
        return jsonify('Bad Request'), 400

@set_page.route('/sets/<int:setid>/<username>', methods=['POST'])
def update_user_accuracy(setid, username):
    _log.debug(request.get_json())
    verification = db.check_answer(setid, request.get_json()['vote'])
    #returns accuracy
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
        query = {'correct_option': correct_option, 'title': title,
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
        im = None
        path = '../../project2react/src/img/' + ntpath.basename(request.content_type)
        with open(path, 'wb+') as f:
            im = f.write(request.data)
        return jsonify('Good Request'), 201
    else:
        return jsonify('Bad Request'), 400
