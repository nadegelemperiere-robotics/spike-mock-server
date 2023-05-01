# -------------------------------------------------------
# Copyright (c) [2022] Nadege LEMPERIERE
# All rights reserved
# -------------------------------------------------------
""" spike mock web client """
# -------------------------------------------------------
# Nadège LEMPERIERE, @26 march 2022
# Latest revision: 26 march 2022
# -------------------------------------------------------

# System includes
from logging import config, getLogger
from os import path

# Click includes
from click import option, group

# Flask includes
from flask import Flask

# Spike mock includes
from spike.scenario.scenario import Scenario

# Waitress includes
from waitress import serve

# Local includes
from client.routes.common   import initialize as initialize_client, blueprint as blueprintclient
from v1.routes.common       import api as apiv1, initialize as initialize_v1
from v1.routes.common       import blueprint as blueprintv1
from v1.routes.robot        import ns as robot_namespace
from v1.routes.command      import ns as command_namespace
from v1.controllers.command import CommandController

logg_conf_path = path.normpath(path.join(path.dirname(__file__), '../conf/logging.conf'))

class Server:
    """ Class for flask application """

    def __init__(self):
        """ Constructor for server """
        self.__app    = Flask('spikeapp')
        self.__logger = getLogger('spike-mock-server.app')

    def __del__(self):
        """ Destructor for server """
        CommandController.finalize()

    def configure(self, api_port, api_host='localhost', is_test=False):
        """ App option definition function """

        self.__logger.info('Configuring application')
        self.__app.config['SERVER_NAME'] = api_host + ':' + api_port
        self.__app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list'
        self.__app.config['RESTX_VALIDATE'] = True
        self.__app.config['RESTXS_MASK_SWAGGER'] = False
        self.__app.config['ERROR_404_HELP'] = False
        if is_test:
            self.__app.config['TESTING'] = True

        CommandController.initialize()

    def initialize(self):
        """ Api version association function """
        self.__logger.info('Initializing application')

        initialize_client()
        initialize_v1()

        self.__app.register_blueprint(blueprintclient)
        self.__app.register_blueprint(blueprintv1)
        apiv1.add_namespace(robot_namespace)
        apiv1.add_namespace(command_namespace)

    def start(self, port):
        """ Server starting function """

        # Starting simulator
        CommandController.start()

        # Serve client
        self.__logger.info('Starting server at http://%s/', self.__app.config['SERVER_NAME'])
        serve(self.__app, listen='*:' + port, threads=10)


@group()
def main():
    """ Main click group """
#pylint: disable=W0107
    pass
#pylint: enable=W0107

@main.command()
@option('--port', default='8888')
@option('--host', default='0.0.0.0')
@option('--debug', default=False, is_flag=True)
def run(port, host, debug):
    """ Application run function """

    server = Server()
    server.configure(port, host, debug)
    server.initialize()
    server.start(port)

if __name__ == "__main__":
    config.fileConfig(logg_conf_path)
    main()
