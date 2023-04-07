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
from v1.routes.common       import api as apiv1, initialize as initialize_v1, blueprint as blueprintv1
from client.routes.common   import initialize as initialize_client, blueprint as blueprintclient
from v1.routes.robot        import ns as robot_namespace
from v1.routes.mat          import ns as mat_namespace


logg_conf_path = path.normpath(path.join(path.dirname(__file__), '../conf/logging.conf'))
robot_conf_path = path.normpath(path.join(path.dirname(__file__), '../conf/robot.json'))
scenario_conf_path = path.normpath(path.join(path.dirname(__file__), '../conf/scenario.json'))
config.fileConfig(logg_conf_path)

class Server:
    """ Class for flask application """

    s_logger = getLogger('mock')

    def __init__(self):
        """ Constructor for server """
        self.__app = Flask('/')
        self.__scenario = Scenario()

    def __del__(self):
        """ Destructor for server """
        self.__scenario.reset()

    def configure(self, api_port, api_host='localhost', is_test=False):
        """ App option definition function """

        self.s_logger.info('Configuring application')
        self.__app.config['SERVER_NAME'] = api_host + ':' + api_port
        self.__app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list'
        self.__app.config['RESTX_VALIDATE'] = True
        self.__app.config['RESTXS_MASK_SWAGGER'] = False
        self.__app.config['ERROR_404_HELP'] = False
        if is_test:
            self.__app.config['TESTING'] = True

        self.__scenario.configure(scenario_conf_path, robot_conf_path, "")

    def initialize(self):
        """ Api version association function """
        self.s_logger.info('Initializing application')

        initialize_client()
        initialize_v1()

        self.__app.register_blueprint(blueprintclient)
        self.__app.register_blueprint(blueprintv1)
        apiv1.add_namespace(robot_namespace)
        apiv1.add_namespace(mat_namespace)

    def start(self, port):
        """ Server starting function """

        # Start spike scenario
        self.__scenario.start()

        # Serve client
        self.s_logger.info('Starting server at http://%s/', self.__app.config['SERVER_NAME'])
        serve(self.__app, listen='*:' + port)


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
    main()
