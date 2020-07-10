'''simple class to hold ids of Sets to be served together'''
from src.sets.model import Set
import json
class Deck:
    def __init__(self, _id=-1, title="Unnamed Deck", set_ids=[]):
        self._id = _id
        self.title = title
        self.set_ids = set_ids
    def add_set(self, set_id):
        self.set_ids.append(set_id)
    def to_dict(self):
        return self.__dict__
    @classmethod
    def from_dict(cls, dictionary):
        return Deck().__dict__.update(dictionary)


class DeckEncoder(json.JSONEncoder):
    ''' Allows us to serialize our objects as JSON '''
    def default(self, o):
        return o.to_dict()
