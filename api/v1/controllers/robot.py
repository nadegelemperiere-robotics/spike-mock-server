"""######################################################################
#                       Directory computing module                      #
######################################################################"""

# System includes
from sys import path
from logging import getLogger
from io import BytesIO
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../../')

# spike-mock includes
from spike.scenario.scenario import Scenario


# Project includes
from v1.models.component     import marshall_component
from v1.models.hub           import marshall_hub
from v1.models.mat           import marshall_position

log = getLogger("spike-mock-server.v1.robot")

def get_all_components():
    """
    Return all components

    :return: json formatted components list
    :rtype:  list
    """

    result = []
    # Get scenario singleton
    scenario = Scenario()

    status = scenario.status()

    for cmpport in status['parts'].values() :
        for cmps in cmpport.values() :
            for cmp in cmps :
                temp = marshall_component(cmp)
                result.append(temp)

    return result

def get_hub():
    """
    Return hub status

    :return: Hub components status
    :rtype:  dict
    """

    # Get scenario singleton
    scenario = Scenario()

    status = scenario.status()
    result = marshall_hub(status['hub'])

    return result

def get_mat():
    """
    Return mat image

    :return: RGBA PNG pixel buffer
    :rtype:  bytes buffer
    """

    result = []
    # Get scenario singleton
    scenario = Scenario()

    image = scenario.mat()

    buffered = BytesIO()
    image.convert('RGBA').save(buffered, format="PNG")
    result = buffered.getvalue()

    return result

def get_position() :
    """
    Return robot position on mat

    :return: robot coordinates in NED + corners coordinates on mat
    :rtype:  dict
    """

    result = {}
    # Get scenario singleton
    scenario = Scenario()
    result = scenario.coordinates()
    result = marshall_position(result)

    return result
