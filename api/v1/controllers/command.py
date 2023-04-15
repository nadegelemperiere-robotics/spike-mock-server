"""######################################################################
#                       Directory computing module                      #
######################################################################"""

# System includes
from sys import path
from logging import getLogger
from threading import Thread
from os.path import dirname, realpath
from traceback import format_exc
path.append(dirname(realpath(__file__)) + '/../../../')

# Project includes
from v1.models.command import marshall_console
from spike.scenario.scenario import Scenario

log = getLogger("command")

class CommandController :

    s_thread = None
    s_status = ""
    s_scenario = Scenario()

    def process_code(code):
        """ Process spike code on simulator """

        parameters=[]
        parameters.append(code)
        parameters = tuple(parameters)

        CommandController.s_thread = Thread(target=CommandController.__thread_function, args=(parameters))
        CommandController.s_thread.start()

    def stop_code() :

        if CommandController.s_thread is not None :
            CommandController.s_thread.stop()

    def get_status() :

        return marshall_console(CommandController.s_status)

    def press_button(side) :
        CommandController.s_scenario.push_button(side)

    def release_button(side) :
        CommandController.s_scenario.release_button(side)

    def __thread_function(python_code):
            try :
                CommandController.s_status = ""
                CommandController.s_scenario.start()
                exec(str(python_code))

            except :
                CommandController.s_status = format_exc()

            CommandController.s_scenario.stop()
            CommandController.s_scenario.reinitialize()