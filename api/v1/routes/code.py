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
from api.v1.routes.common import api

log = getLogger(__name__)

ns = api.namespace('code', description='Operations related to code')
