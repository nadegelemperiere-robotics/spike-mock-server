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
from v1.models.command      import code, console, configuration
from v1.controllers.command import CommandController

log = getLogger("spike-mock-server.v1.command")

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
        cod = request.json['code']
        CommandController.process_code(str(cod))

@ns.route('/stop')
class StopCollection(Resource):
    """ /stop route definition class """

    @api.response(201, 'Robot successfully stopped.')
    @api.expect(code)
    @api.marshal_with(code)
    def post(self):
        """ Stopping code execution """
        log.info('Stopping code')

@ns.route('/configure')
class ConfigureCollection(Resource):
    """ /configure route definition class """

    @api.response(201, 'Configuration successfully changed.')
    @api.expect(configuration)
    @api.marshal_with(configuration)
    def post(self):
        """ Stopping code execution """
        log.info('Configuring scenario')
        CommandController.process_configuration(
            request.json['time'],request.json['dynamics'],request.json['mat'],request.json['robot'])

    @api.marshal_with(configuration)
    def get(self):
        """ Retrieving error stack. """
        log.debug('Retrieving current configuration')
        current_configuration = CommandController.get_configuration()
        return current_configuration

@ns.route('/console')
class ConsoleCollection(Resource):
    """ /console route definition class """

    @api.marshal_with(console)
    def get(self):
        """ Retrieving error stack. """
        log.debug('Retrieving console errors')
        error_stack = CommandController.get_status()
        return error_stack

@ns.route('/button/push/<string:side>')
class ButtonPushCollection(Resource):
    """ /button/push route definition class """

    @api.response(201, 'Button successfully pressed.')
    def post(self, side):
        """ Press button on a side. """
        log.info('Pushing button %s',side)
        CommandController.press_button(side)

@ns.route('/button/release/<string:side>')
class ButtonReleaseCollection(Resource):
    """ /button/release route definition class """

    @api.response(201, 'Button successfully released.')
    def post(self, side):
        """ Release button on a side. """
        log.info('Releasing button %s',side)
        CommandController.release_button(side)
