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
from v1.routes.common       import api
from v1.models.button       import button, marshall_button
from v1.models.speaker      import speaker, marshall_speaker
from v1.models.statuslight  import statuslight, marshall_statuslight

point = api.model('Point', {
    'x': fields.Float(readOnly=True, description='The x position'),
    'y': fields.Float(readOnly=True, description='The y position'),
})

center = api.model('Center', {
    'north':  fields.Float(required=True,  description='North starting coordinate in cm'),
    'east':   fields.Float(required=True,  description='East starting coordinate in cm'),
    'yaw':    fields.Float(required=True,  description='Yaw starting coordinate in degrees')
})

position = api.model('Position', {
    'frontleft'   : fields.Nested(point,required=True, description='Robot front left corner position on mat'),
    'frontright'  : fields.Nested(point,required=True, description='Robot front right corner position on mat'),
    'backleft'    : fields.Nested(point,required=True, description='Robot back left corner position on mat'),
    'backright'   : fields.Nested(point,required=True, description='Robot back right corner position on mat'),
    'center'      : fields.Nested(center,required=True, description='Robot center position in NED'),
})

def marshall_position(obj):
    """ Transform robot position on mat into REST api component model """

    result = {}

    if 'front-left' in obj : result['frontleft']  = obj['front-left']
    else : result['frontleft'] = {'x' : -1, 'y' : -1}

    if 'front-right' in obj : result['frontright']  = obj['front-right']
    else : result['frontright'] = {'x' : -1, 'y' : -1}

    if 'back-left' in obj : result['backleft']  = obj['back-left']
    else : result['backleft'] = {'x' : -1, 'y' : -1}

    if 'back-right' in obj : result['backright']  = obj['back-right']
    else : result['backright'] = {'x' : -1, 'y' : -1}

    if 'center' in obj : result['center'] = obj['center']
    else               : result['center'] = { 'north' : -100, 'east' : -100, 'yaw' : 0}

    return result
