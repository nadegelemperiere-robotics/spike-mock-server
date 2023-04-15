"""######################################################################
#                  directory REST API definition module                 #
######################################################################"""

# System includes
from logging import getLogger
from sys import path
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../../')

# Flask includes
from flask import request
from flask_restx  import Resource

# Project includes
from v1.routes.common       import api
from v1.models.command      import code, console
from v1.controllers.command import CommandController

log = getLogger(__name__)

ns = api.namespace('command', description='Operations related to code')

@ns.route('/start')
class StartCollection(Resource):
    """ /start route definition class """

    @api.response(201, 'Robot successfully started.')
    @api.expect(code)
    @api.marshal_with(code)
    def post(self):
        """ Creates a new ground truth . """
        log.info('Posting code')
        code = request.json['code']
        CommandController.process_code(str(code))

@ns.route('/stop')
class StopCollection(Resource):
    """ /stop route definition class """

    @api.response(201, 'Robot successfully stopped.')
    @api.expect(code)
    @api.marshal_with(code)
    def post(self):
        log.info('Stopping code')
        pass

@ns.route('/console')
class ConsoleCollection(Resource):
    """ /console route definition class """

    @api.marshal_with(console)
    def get(self):
        """ Returns list of directories. """
        log.info('Retrieving console errors')
        console = CommandController.get_status()
        return console

@ns.route('/button/push/<string:side>')
class ConsoleCollection(Resource):
    """ /button/push route definition class """

    @api.response(201, 'Button successfully pressed.')
    def post(self, side):
        """ Press button on a side. """
        log.info('Pushing button %s',side)
        console = CommandController.press_button(side)
        return console

@ns.route('/button/release/<string:side>')
class ConsoleCollection(Resource):
    """ /button/release route definition class """

    @api.response(201, 'Button successfully released.')
    def post(self, side):
        """ Press button on a side. """
        log.info('Releasing button %s',side)
        console = CommandController.release_button(side)
        return console