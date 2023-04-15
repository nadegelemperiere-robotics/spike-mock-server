"""######################################################################
#                       Directory REST API data model                   #
######################################################################"""

# System includes
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../')

# Flask includes
from flask_restx import fields

# Project includes
from api.v1.routes.common import api

code = api.model('Code', {
    'code': fields.String(required=True, description='Code content')
})

console = api.model('Console', {
    'console': fields.String(required=True, description='Console content')
})


def marshall_console(text):
    """ Transform console into REST api component model """

    result = {}

    result['console'] = text

    return result
