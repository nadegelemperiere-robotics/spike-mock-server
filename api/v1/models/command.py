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
from v1.routes.common import api
from v1.models.mat    import point

code = api.model('Code', {
    'code': fields.String(required=True, description='Code content')
})

console = api.model('Console', {
    'console': fields.String(required=True, description='Console content')
})

time = api.model('Time', {
    'mode' : fields.String(required=True, description='Scenario mode'),
    'period': fields.Integer(required=False, description='Scenario simulation period'),
})

coordinates = api.model('Coordinates', {
    'north':  fields.Integer(required=True,  description='North starting coordinate in cm'),
    'east':   fields.Integer(required=True,  description='East starting coordinate in cm'),
    'yaw':    fields.Integer(required=True,  description='Yaw starting coordinate in degrees')
})

dynamics = api.model('Dynamics', {
    'coordinates' : fields.Nested(coordinates)
})

design = api.model('Design', {
    'ldu':      fields.Float(required=True, description='Mat image path'),
    'content':  fields.String(required=True, description='Mat image path')
})

abaqus = api.model('Abaqus', {
    'content':  fields.String(required=True, description='Mat image path')
})

component = api.model('Compo', {
    'type': fields.String(required=True, description='Component type'),
    'port': fields.String(required=True, description='Component port'),
    'id': fields.String(required=True, description='Component port'),
    'index': fields.Integer(required=True, description='Component port'),
    'spin': fields.Integer(required=False, description='Component port'),
})

robot = api.model('Robot', {
    'design' : fields.Nested(design, required = True),
    'abaqus' : fields.Nested(abaqus, required=True),
    'components': fields.List(fields.Nested(component), required = True)
})

origin = api.model('Origin', {
    'x': fields.Integer(readOnly=True, description='The x position'),
    'y': fields.Integer(readOnly=True, description='The y position')
})

mat = api.model('Mat', {
    'image':  fields.String(required=True, description='Mat image path'),
    'scale':  fields.Float(required=True, description='Mat image scale'),
    'origin' : fields.Nested(origin, required = True)
})

configuration = {
    'time' :     fields.Nested(time, required = True),
    'dynamics' : fields.Nested(dynamics, required = True),
    'robot' :    fields.Nested(robot, required = False),
    'mat' :      fields.Nested(mat, required = False)
}

def marshall_console(text):
    """ Transform console into REST api component model

    :return: Code execution error stack
    :rtype:  dict
    """

    result = {}

    result['console'] = text

    return result
