'''Top level module for the project 2 Truth Sets web app'''
# External Imports
from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS

# Internal Imports
from src.data.logger import get_logger
from src.sets.model import SetEncoder
from src.sets.handler import set_page
from src.users.model import User
import src.data.mongo as db
import werkzeug

_log = get_logger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.json_encoder = SetEncoder
app.register_blueprint(set_page)

@app.route('/')
def test_html():
    return 'Hello World', 200

@app.route('/users/<username>', methods=['POST'])
def login(username):
    '''handles requests to login and sets the cookies'''
    _log.debug("%s is logging in", username)
    if request.method == "POST":
        _log.debug(request.get_json())
        _log.debug(request.path)
        password = request.get_json()["password"]
        user = db.login(username, password)
        if user:
            # Generate our token
            user_dict = user.to_dict()
            auth_token = user.encode_auth_token()
            response = make_response(jsonify(user_dict))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        return {}, 400
    else:
        return {}, 501

@app.route("/users", methods=['DELETE', "GET"])
def logout():
    if request.method == "DELETE":
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204
    elif request.method == 'GET':
        auth_token = request.cookies.get('authorization')
        if auth_token:
            _log.debug(auth_token)
            _log.debug(User.decode_auth_token(auth_token))
            return jsonify(db.get_user_by_id(User.decode_auth_token(auth_token))), 200
        else:
            return {}, 401

@app.route("/users/<username>/usertype", methods=["POST"])
def update_usertype(username):
    if request.method == "POST":
        _log.debug("Updating user:%s usertype", username)
        user = db.get_user_by_username(username)
        if user:
            auth_token = request.cookies.get("authorization")
            #sender = db.get_user_by_id(User.decode_auth_token(auth_token))
            _log.debug(user._id)
            _log.debug(request.get_json())
            sender = db.get_user_by_username("admin")
            if sender and sender.usertype == "admin":
                db.update_usertype(user._id, request.get_json()["usertype"])
                return "Usertype updated", 200
            return "Only an Admin can edit usertype", 401
        return {}, 400
    return {}, 501