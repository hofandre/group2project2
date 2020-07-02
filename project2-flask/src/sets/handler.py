''' Handler for the Set operations in the application '''
# External Imports
from flask import Flask, jsonify, Blueprint, request
# Internal Imports
from src.sets.model import Set
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