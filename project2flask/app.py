from flask import Flask, request, make_response, jsonify
import werkzeug
import project2flask.data.mongo as db


app = Flask(__name__)

@app.route('/users', methods=['POST'])
def login():
    '''handles requests to login and sets the cookies'''
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = db.login(username, password)
        if user:
            # Generate our token
            auth_token = user.encode_auth_token()
            response = make_response(jsonify(user))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        return {}, 400
    else:
        return {}, 501
