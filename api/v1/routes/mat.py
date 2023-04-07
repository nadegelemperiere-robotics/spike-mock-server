"""######################################################################
#                  directory REST API definition module                 #
######################################################################"""

# System includes
from logging import getLogger
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../')

# Flask includes
from flask import make_response
from flask_restx  import Resource

# Project includes
from v1.routes.common import api

# Project includes
from v1.controllers.mat import get_mat
from v1.models.hub import hub
from v1.routes.common import api

log = getLogger("mat")

ns = api.namespace('mat', description='Operations related to mat image retrieval')

@ns.route('/')
class MatCollection(Resource):
    """ / route definition class """

    def get(self):
        """ Get mat image"""
        image_binary = get_mat()
        response = make_response(image_binary)
        response.headers.set('Content-Type', 'image/png')
        return response