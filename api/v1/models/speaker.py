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

speaker = api.model('Speaker', {
    'note': fields.Float(required=True, description='Speaker note'),
    'volume': fields.Integer(readOnly=True, description='Speaker volume'),
    'beeping': fields.Boolean(readOnly=True, description='Speaker on status')
})

def marshall_speaker(obj):
    """ Transform speaker into REST api record model """

    result = {}

    result['note'] = obj['note']
    result['volume'] = obj['volume']
    result['beeping'] = obj['beeping']

    return result
