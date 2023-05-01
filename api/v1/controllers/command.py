"""######################################################################
#                       Directory computing module                      #
######################################################################"""

# System includes
from sys import path
from logging import getLogger
from threading import Thread
from os.path import dirname, realpath, basename
from traceback import format_exc
from uuid import uuid4
from base64 import b64decode
path.append(dirname(realpath(__file__)) + '/../../../')

# Project includes
from v1.models.command import marshall_console
from spike.scenario.scenario import Scenario

log = getLogger("spike-mock-server.v1.command")

class CommandController :
    """ Class controlling command rest API functions and their associated shared variables"""

    s_thread = None
    s_status = ""
    s_scenario = Scenario()
    s_scenario_file = ""
    s_logging_conf = ""
    s_robot_file = ""
    s_is_processing = False
    s_states = []

    @staticmethod
    def initialize() :
        """
        Initialize controller from scenario file path

        :param scenario:
        """
        CommandController.s_scenario.configure_from_values(
            {'mode' : 'realtime'},
            {'north' : 0, 'east' : 0, 'yaw' : 0})
        CommandController.s_is_processing = False

    def start() :
        """ Finalize scenario """
        CommandController.s_scenario.start()

    def finalize() :
        """ Finalize scenario """
        CommandController.s_scenario.stop()
        CommandController.s_scenario.reinitialize()

    @staticmethod
    def process_code(code):
        """ Process spike code on simulator """

        parameters=[]
        parameters.append(code)
        parameters = tuple(parameters)

        if not CommandController.s_is_processing :
            CommandController.s_is_processing = True
            CommandController.s_thread = Thread(
                target=CommandController.__thread_function, args=(parameters))
            CommandController.s_thread.start()
            if CommandController.s_scenario.configuration()['time']['mode'] == 'controlled' :
                while CommandController.s_is_processing :
                    CommandController.s_scenario.step()
                    CommandController.s_states.append(CommandController.s_scenario.status())

        else :
            CommandController.s_status = "Processing is still on"

    @staticmethod
    def process_configuration(time, dynamics, mat, robot):
        """ Process spike code on simulator """

        time_conf = time
        if time_conf['mode'] == 'realtime' : del time_conf['period']

        coordinates_conf = dynamics['coordinates']

        ground_conf = mat
        ground_conf['image'] = '/server/build/' + ground_conf['image']

        model_conf = robot
        mfilename = '/tmp/' + str(uuid4()) + '.ldr'
        afilename = '/tmp/' + str(uuid4()) + '.xlsx'
        with open(mfilename,'w', encoding='UTF-8') as file :
            file.write(model_conf['design']['content'])
            file.close()
        with open(afilename,'wb') as file :
            file.write(b64decode(model_conf['abaqus']['content']))
            file.close()

        model_conf['design']['filename'] = mfilename
        model_conf['abaqus'] = afilename
        del model_conf['design']['content']

        CommandController.s_scenario.stop()
        CommandController.s_scenario.reinitialize()
        CommandController.s_scenario.configure_from_values(
            time_conf, coordinates_conf, ground_conf, model_conf)
        CommandController.s_scenario.restart()
        CommandController.s_scenario.start()

    @staticmethod
    def get_configuration() :
        result = CommandController.s_scenario.configuration()
        print(str(result))
        if 'ground' in result :
            result['mat'] = result['ground']
            del result['ground']
        if 'robot' in result :
            if 'abaqus' in result['robot'] :
                result['robot']['abaqus'] = basename(result['robot']['abaqus'])
        return result

    @staticmethod
    def stop_code() :
        """ Stop code execution """
        if CommandController.s_thread is not None :
            CommandController.s_scenario.stop()
            CommandController.s_scenario.start()

    @staticmethod
    def get_status() :
        """ Code error return function

        :return: last code execution error stack
        :rtype:  dict
        """
        return marshall_console(CommandController.s_status)

    @staticmethod
    def press_button(side) :
        """
        Emulate button pressing

        :param side: Side pressed
        :type side:  string
        """
        CommandController.s_scenario.push_button(side)

    @staticmethod
    def release_button(side) :
        """ Emulate button releasing

        :param side: Side released
        :type side:  string
        """
        CommandController.s_scenario.release_button(side)

# pylint: disable=W0702
    @staticmethod
    def __thread_function(python_code):
        """ Function to execute spike code in another thread """
        try :
            CommandController.s_status = ""
            exec(str(python_code)) # pylint: disable=exec-used
            log.info('execution ended')
        except :
            CommandController.s_status = format_exc()
        log.info('stopping')
        CommandController.s_scenario.stop()
        log.info('reinitializing')
        CommandController.s_scenario.reinitialize()
        CommandController.s_is_processing = False
        log.info('restarting')
        CommandController.s_scenario.start()
# pylint: enable=W0702
