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

hub = api.model('Hub', {
    'lightmatrix': fields.List(fields.List(fields.Boolean, required=False, description='Hub status light status')),
    'buttons': fields.List(fields.Nested(button, required=False, description='Hub buttons status')),
    'statuslight': fields.Nested(statuslight, required=False, description='Hub statuslight status'),
    'speaker': fields.Nested(speaker, required=False, description='Hub speaker status'),
})

def marshall_hub(obj):
    """ Transform hub into REST api component model """

    result = {}

    if 'lightmatrix' in obj :
        result['lightmatrix'] = []
        for i_line in range(0,5) :
            result['lightmatrix'].append([])
            for i_column in range(0,5) :
                result['lightmatrix'][i_line].append(obj['lightmatrix'][i_line * 5 + i_column])

    if 'buttons' in obj :
        result['buttons'] = []
        for side, button in obj['buttons'] :
            result['buttons'].append(marshall_button(side, button))

    if 'speaker' in obj :
        result['speaker'] = marshall_speaker(obj['speaker'])

    if 'statuslight' in obj :
        result['statuslight'] = marshall_statuslight(obj['statuslight'])

    return result
