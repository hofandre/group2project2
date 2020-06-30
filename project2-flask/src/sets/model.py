''' Modularization of the model for the sets '''
# External Imports
import json
# Internal Imports
from src.data.logger import get_logger

_log = get_logger(__name__)

class Set:
    ''' Class definition for the Set model '''
    def __init__(self, set_id=-1, correct_option=-1, title='', paths=None):
        self._id = set_id
        self.correct_option = correct_option
        self.title = title
        self.paths = paths
        self.deck_tags = []
        self.keywords = []
    def set_id(self, _id):
        ''' Setter for the _id field'''
        self._id = _id
    def get_id(self):
        ''' Getter for the _id field'''
        return self._id
    def set_correct(self, correct_option):
        ''' Setter for the correct_option field '''
        self.correct_option = correct_option
    def get_correct(self):
        ''' Getter for correct_option field '''
        return self.correct_option
    def set_title(self, title):
        ''' Setter for title field'''
        self.title = title
    def get_title(self):
        ''' Getter for title field '''
        return self.title
    def set_paths(self, paths):
        ''' Setter for the paths attribute. Expects a list'''
        self.paths = paths
    def get_paths(self, paths):
        ''' Getter for the paths attribute'''
        return self.paths
    def add_deck_tag(self, tag):
        ''' Adds the given deck tag to the list of tags '''
        self.deck_tags.append(tag)
    def get_deck_tags(self):
        ''' Getter for the list of deck tags'''
        return self.deck_tags
    def add_keyword(self, keyword):
        ''' Adds the given keyword to the list of keywords '''
        self.keywords.append(keyword)
    def get_keywords(self):
        ''' Returns the list of keywords'''
        return self.keywords
    def to_dict(self):
        ''' Returns a dictionary representation of itself'''
        dict_rep = dict(self.__dict__)
        return dict_rep
    @classmethod
    def from_dict(self, input_dict):
        ''' Creates an instance of the set given a dictionary representation of the set'''
        new_set = Set()
        new_set.__dict__.update(input_dict)
        return new_set

class SetEncoder(json.JSONEncoder):
    ''' Serializes the sets into json format'''
    def default(self, o):
        return o.to_dict()