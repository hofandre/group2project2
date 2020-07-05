''' Testing suite for the Set class '''
# External Imports
import unittest

# Internal Imports
from src.sets.model import Set, SetEncoder

class SetTestSuite(unittest.TestCase):
    ''' Testing Suite for the Set class'''
    def setUp(self):
        ''' Create a new set for testing '''
        SetTestSuite.set = Set(-2, 1, 'TEST TITLE', ['PATH 1', 'PATH 2'])
    def tearDown(self):
        ''' Removes the set from the Test Suite '''
        SetTestSuite.set = None
    def test_get_id(self):
        ''' Tests the _id getter '''
        self.assertEqual(-2, SetTestSuite.set.get_id())
    def test_set_id(self):
        ''' Tests the _id setter '''
        SetTestSuite.set.set_id(-4)
        self.assertEqual(SetTestSuite.set._id, -4)
    def test_get_correct(self):
        ''' Tests the correct_option getter '''
        self.assertEqual(SetTestSuite.set.get_correct(), 1)
    def test_set_correct(self):
        ''' Tests the correct_option setter '''
        SetTestSuite.set.set_correct(3)
        self.assertEqual(SetTestSuite.set.correct_option, 3)
    def test_get_title(self):
        ''' Tests the title getter '''
        self.assertEqual(SetTestSuite.set.get_title(), 'TEST TITLE')
    def test_set_title(self):
        ''' Test the title setter '''
        SetTestSuite.set.set_title('NEW TITLE')
        self.assertEqual(SetTestSuite.set.title, 'NEW TITLE')
    def test_get_path(self):
        ''' Tests the path getter '''
        self.assertEqual(SetTestSuite.set.paths[0], 'PATH 1')
        self.assertEqual(SetTestSuite.set.paths[1], 'PATH 2')
    def test_set_path(self):
        ''' Tests the path setter '''
        SetTestSuite.set.set_paths(['NEW PATH 1', 'NEW PATH 2'])
        self.assertEqual(SetTestSuite.set.paths[0], 'NEW PATH 1')
        self.assertEqual(SetTestSuite.set.paths[1], 'NEW PATH 2')
    def test_add_deck(self):
        ''' Tests the add_deck_tags method'''
        SetTestSuite.set.add_deck_tag('TAG 1')
        self.assertEqual(SetTestSuite.set.deck_tags, ['TAG 1'])
    def test_get_deck(self):
        ''' Tests get_deck_tags methods '''
        SetTestSuite.set.deck_tags.append('NEW TAG')
        self.assertEqual(SetTestSuite.set.get_deck_tags(), ['NEW TAG'])
    def test_add_keywords(self):
        ''' Tests add_keyword method '''
        SetTestSuite.set.add_keyword('KEYWORD 1')
        self.assertEqual(SetTestSuite.set.keywords[0], 'keyword 1')
    def test_get_keywords(self):
        ''' Tests get_keyword method '''
        SetTestSuite.set.keywords.append('KEYWORD 2')
        self.assertEqual(SetTestSuite.set.get_keywords(), ['keyword 2'])
    def test_to_dict(self):
        ''' Tests the to_dict function '''
        set_dict = SetTestSuite.set.to_dict()
        self.assertEqual(set_dict['_id'], SetTestSuite.set._id)
        self.assertEqual(set_dict['correct_option'], SetTestSuite.set.correct_option)
        self.assertEqual(set_dict['title'], SetTestSuite.set.title)
        self.assertEqual(set_dict['paths'], SetTestSuite.set.paths)
    def test_from_dict(self):
        ''' Tests the from_dict method '''
        input_dict = {'_id': -2, 'correct_option': 1, 'title': 'TEST TITLE 3', 'paths': ['ONE',
                      'TWO'], 'deck_tags': ['deck2', 'deck5'], 'keywords': ['autumn']}
        new_set = Set.from_dict(input_dict)
        self.assertEqual(new_set.correct_option, 1)
        self.assertEqual(new_set.title, 'TEST TITLE 3')
        self.assertEqual(new_set.paths, ['ONE', 'TWO'])
        self.assertEqual(new_set.deck_tags, ['deck2', 'deck5'])
        self.assertEqual(new_set.keywords, ['autumn'])
        self.assertEqual(new_set._id, -2)

class SetEncoderTestSuite(unittest.TestCase):
    ''' Test Suite for the SetEncoder class'''
    def setUp(self):
        ''' Creates a instance of the SetEncoder class '''
        SetEncoderTestSuite.encoder = SetEncoder()
    def tearDown(self):
        ''' Deletes the instance of the SetEncoder '''
        SetEncoderTestSuite.encoder = None
    def test_encoder(self):
        ''' Tests the encoder '''
        new_set = Set(-2, 1, 'TEST TITLE', ['PATH 1', 'PATH 2'])
        encoded_set = SetEncoderTestSuite.encoder.default(new_set)
        self.assertEqual(encoded_set['_id'], -2)
        self.assertEqual(encoded_set['correct_option'], 1)
        self.assertEqual(encoded_set['title'], 'TEST TITLE')
        self.assertEqual(encoded_set['paths'], ['PATH 1', 'PATH 2'])

if __name__ == '__main__':
    unittest.main()
