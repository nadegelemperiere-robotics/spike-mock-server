"""######################################################################
#                  directory REST API definition module                 #
######################################################################"""

# System includes
from logging import getLogger
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../')

# Flask includes
from flask import make_response, request
from flask_restx  import Resource

# Project includes
from v1.controllers.robot import get_all_components, get_hub, get_position, get_mat
from v1.models.component import component
from v1.models.hub import hub
from v1.models.mat import position
from v1.routes.common import api

ns = api.namespace('robot', description='Operations related to robot status retrieval')

@ns.route('/component')
class ComponentCollection(Resource):
    """ /components route definition class """

    s_log = getLogger("spike-mock-server.v1.robot")

    @api.marshal_list_with(component)
    def get(self):
        """ Returns list of directories. """
        component_status = get_all_components()
        return component_status


@ns.route('/hub')
class HubCollection(Resource):
    """ /hub route definition class """

    s_log = getLogger("spike-mock-server.v1.robot")

    @api.marshal_with(hub)
    def get(self):
        """ Returns list of directories. """
        hub_status = get_hub()
        return hub_status

@ns.route('/position')
class PositionCollection(Resource):
    """ /position route definition class """

    s_log = getLogger("spike-mock-server.v1.robot")

    @api.marshal_with(position)
    def get(self):
        """ Returns list of directories. """
        self.s_log.debug('Retrieving robot position on mat')
        position_status = get_position()
        return position_status

@ns.route('/image')
class ImageCollection(Resource):
    """ /image route definition class """

    def get(self):
        """ Get mat image"""
        self.s_log.debug('Retrieving mat image with robot')
        image_binary = get_mat()
        response = make_response(image_binary)
        response.headers.set('Content-Type', 'image/png')
        return response


