"""######################################################################
#                       Directory computing module                      #
######################################################################"""

# System includes
from sys import path
from json import dumps
from logging import getLogger
from datetime import datetime
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../../')

# Project includes
from v1.models.component import marshall_component
from v1.models.hub       import marshall_hub
from spike.scenario.scenario import Scenario

log = getLogger("robot")

def get_all_components():
    """ Return all components """

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
    """ Return hub status """

    # Get scenario singleton
    scenario = Scenario()

    status = scenario.status()
    result = marshall_hub(status['hub'])

    return result