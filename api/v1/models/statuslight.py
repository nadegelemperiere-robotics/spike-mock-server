"""######################################################################
#                        Record REST API data model                     #
######################################################################"""

# System includes
from sys import path
from json import loads
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../')

# Flask includes
from flask_restx import fields

# Project includes
from v1.routes.common import api

statuslight = api.model('StatusLight', {
    'color': fields.String(required=True, description='Light color'),
    'on': fields.Boolean(readOnly=True, description='Button pressed status')
})

def marshall_statuslight(obj):
    """ Transform statuslight into REST api record model """

    result = {}

    result['color'] = obj['color']
    result['on'] = obj['status']

    return result
