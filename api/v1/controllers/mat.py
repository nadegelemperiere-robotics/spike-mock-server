"""######################################################################
#                       Directory computing module                      #
######################################################################"""

# System includes
from sys import path
from json import dumps
from logging import getLogger
from datetime import datetime
from base64 import b64encode
from io import BytesIO
from os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../../')

# Project includes
from v1.models.component import marshall_component
from v1.models.hub       import marshall_hub
from spike.scenario.scenario import Scenario

log = getLogger("mat")

def get_mat():
    """ Return mat image """

    result = []
    # Get scenario singleton
    scenario = Scenario()

    image = scenario.mat()

    buffered = BytesIO()
    image.convert('RGBA').save(buffered, format="PNG")
    result = buffered.getvalue()

    return result