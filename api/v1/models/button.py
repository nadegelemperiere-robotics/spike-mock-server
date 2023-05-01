"""######################################################################
#                        Record REST API data model                     #
######################################################################"""

# System includes
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../')

# Flask includes
from flask_restx import fields

# Project includes
from v1.routes.common import api

button = api.model('Button', {
    'side': fields.String(required=True, description='Button side'),
    'pressed': fields.Boolean(readOnly=True, description='Button pressed status')
})

def marshall_button(side, obj):
    """ Transform button into REST api record model """

    result = {}

    result['side'] = str(side)
    result['pressed'] = obj

    return result
