"""######################################################################
#                  directory REST API definition module                 #
######################################################################"""

# System includes
from logging import getLogger
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../')

# Flask includes
from flask import request
from flask_restx  import Resource

# Project includes
from v1.routes.common import api

# Project includes
from v1.controllers.robot import get_all_components, get_hub
from v1.models.component import component
from v1.models.hub import hub
from v1.routes.common import api

log = getLogger("robot")

ns = api.namespace('robot', description='Operations related to robot status retrieval')

@ns.route('/component')
class ComponentCollection(Resource):
    """ /components route definition class """

    @api.marshal_list_with(component)
    def get(self):
        """ Returns list of directories. """
        dirs = get_all_components()
        return dirs


@ns.route('/hub')
class ComponentCollection(Resource):
    """ /hub route definition class """

    @api.marshal_with(hub)
    def get(self):
        """ Returns list of directories. """
        dirs = get_hub()
        return dirs