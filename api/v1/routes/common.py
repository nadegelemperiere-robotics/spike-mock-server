"""######################################################################
#                 Api declaration and generic functions                 #
######################################################################"""

# System includes
from logging import getLogger
from traceback import format_exc

# Flask includes
from flask import Blueprint
from flask_restx  import Api

log = getLogger("common")

blueprint =  Blueprint('v1', __name__, url_prefix='/v1')
api = Api(version='1.0', title='API first version', description='REST api for database management - version 1', doc='/doc')

def initialize() :
    api.init_app(blueprint)