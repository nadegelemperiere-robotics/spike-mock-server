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
from api.v1.routes.common import api

pose = api.model('Pose', {
    'tx': fields.Float(readOnly=True, description='The component north position in NED coordinates'),
    'ty': fields.Float(readOnly=True, description='The component east position in NED coordinates'),
    'tz': fields.Float(readOnly=True, description='The component down position in NED coordinates'),
    'rx': fields.Float(readOnly=True, description='The component rotation around the north direction'),
    'ry': fields.Float(readOnly=True, description='The component rotation around the east direction'),
    'rz': fields.Float(readOnly=True, description='The component rotation around the down direction'),
})

def marshall_pose(obj):
    """ Transform database feature into REST api feature model """

    result = {}

    result['tx'] = str(obj.translation().X())
    result['ty'] = str(obj.translation().Y())
    result['tz'] = str(obj.translation().Z())
    result['rx'] = str(obj.rotation().X())
    result['ry'] = str(obj.rotation().Y())
    result['rz'] = str(obj.rotation().Z())

    return result

    return result
