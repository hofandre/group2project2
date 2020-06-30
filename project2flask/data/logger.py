'''modularization of logging'''
from os import path
import logging
import logging.config

log_config_path = path.join(path.dirname(path.abspath(__file__)), "log.conf")
logging.config.fileConfig(log_config_path)

def get_logger(nom):
    '''returns a logger'''
    return logging.getLogger(nom)
