from flask import Flask, request, make_response, jsonify
import werkzeug
import src.data.mongo as db
from src.data.logger import get_logger
from src.users.model import User, UserEncoder

app = Flask(__name__)
_log = get_logger(__name__)


@app.route('/users', methods=['POST'])
def login():
    '''handles requests to login and sets the cookies'''
    if request.method == "POST":
        _log.debug(request.form)
        username = request.form["username"]
        password = request.form["password"]
        user = db.login(username, password)
        if user:
            # Generate our token
            user_dict = user.to_dict()
            del user_dict['password']
            auth_token = user.encode_auth_token()
            response = make_response(jsonify(user_dict))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        return {}, 400
    else:
        return {}, 501
