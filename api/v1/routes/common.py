"""######################################################################
#                 Api declaration and generic functions                 #
######################################################################"""

# System includes
from logging import getLogger

# Flask includes
from flask import Blueprint
from flask_restx  import Api

log = getLogger("spike-mock-server.v1.common")

blueprint =  Blueprint('v1', __name__, url_prefix='/v1')
api = Api(version='1.0', title='API first version',
          description='REST api for database management - version 1', doc='/doc')

def initialize() :
    """ blueprint initialization function"""
    api.init_app(blueprint)
