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
from api.v1.models.pose import pose, marshall_pose

component = api.model('Component', {
    'type': fields.String(required=True, description='Component type'),
    'port': fields.String(required=True, description='Component port'),
    'pose': fields.Nested(pose, required=True, description='Component position and orientation'),
    'red': fields.Integer(required=False, description='Color sensor red value'),
    'green': fields.Integer(required=False, description='Color sensor green value'),
    'blue': fields.Integer(required=False, description='Color sensor blue value'),
    'speed': fields.Float(required=False, description='Motor angular speed'),
    'degrees': fields.Float(required=False, description='Motor degrees'),
})

def marshall_component(obj):
    """ Transform components into REST api component model """

    result = {}
    result['type'] = str(obj['type'])
    result['pose'] = marshall_pose(obj['pose'])
    result['port'] = str(obj['port'])
    if 'blue' in obj : result['blue'] = obj['blue']
    if 'green' in obj : result['green'] = obj['green']
    if 'red' in obj : result['red'] = obj['red']
    if 'speed' in obj : result['speed'] = obj['speed']
    if 'degrees' in obj : result['degrees'] = obj['degrees']

    return result
