'''Top level module for the project 2 Truth Sets web app'''
# External Imports
from flask import Flask, request, make_response, jsonify, render_template
# Internal Imports
from src.data.logger import get_logger
from src.sets.model import SetEncoder
from src.sets.handler import set_page
import werkzeug

_log = get_logger(__name__)

app = Flask(__name__)
app.json_encoder = SetEncoder
app.register_blueprint(set_page)

@app.route('/')
def test_html():
    return app.send_static_file('home.html'), 200