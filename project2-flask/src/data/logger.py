<<<<<<< HEAD
'''modularization of logging'''
from os import path
import logging
import logging.config

log_config_path = path.join(path.dirname(path.abspath(__file__)), "log.conf")
logging.config.fileConfig(log_config_path)

def get_logger(nom):
    '''returns a logger'''
    return logging.getLogger(nom)
=======
import logging
import logging.config
from os import path

log_file_path = path.join(path.dirname(path.abspath(__file__)), 'log.conf')
print(path.dirname(path.abspath(__file__)))
logging.config.fileConfig(log_file_path)
#logging.info('this is the root logger')
def get_logger(nom):
    '''returns a logger for the module that called the function'''
    return logging.getLogger(nom)
>>>>>>> 26c263bb7e8415b82ee8ce593490ac1c1b9f563f
