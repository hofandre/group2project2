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
    return jsonify(db.get_sets()), 200

@set_page.route('/sets/<int:setid>', methods=['GET'])
def set_by_id(set_id):
    # GET METHOD:
    given_set = db.get_set_by_id(set_id)
    if given_set:
        return jsonify(given_set), 200
    else:
        return jsonify('Bad Request'), 400