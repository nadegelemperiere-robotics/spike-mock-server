"""######################################################################
#                 Api declaration and generic functions                 #
######################################################################"""

# System includes
from logging import getLogger

# Flask includes
from flask import Blueprint, render_template, send_file, abort, request
from jinja2 import TemplateNotFound
from flask_restx  import Api

log = getLogger("spike-mock-server.client.common")
blueprint = Blueprint('/', __name__, url_prefix='/', static_folder='../../../build/static',
                      template_folder='../../../build')
api = Api(title='client', description='client route access', doc='/doc')


def initialize() :
    """ blueprint initialization function"""
    api.init_app(blueprint)

@blueprint.route('/')
@blueprint.route('/home')
@blueprint.route('/settings')
def client():
    """ Returns client static files. """
    return render_template('index.html')

@blueprint.route('/<file>.png')
def show_mat(file):
    """ Specific route to retrieve logo and favicon media """
    try:
        log.debug('Retrieving media /%s',file + '.png')
        return send_file('build/' + file + '.png')
    except FileNotFoundError:
        abort(404)

@blueprint.route('/favicon.ico')
@blueprint.route('/robot.ldr')
@blueprint.route('/abaqus.xlsx')
def show_logo():
    """ Specific route to retrieve logo and favicon media """
    try:
        log.debug('Retrieving media /%s',request.path[1:])
        return send_file('build/' + request.path[1:])
    except FileNotFoundError:
        abort(404)
# pylint: enable=R1710

# pylint: disable=R1710
@blueprint.route('/<file>')
def show(file):
    """ Specific route to retrieve root template files """
    try:
        log.debug('Retrieving template %s', file)
        return render_template(f'{file}')
    except TemplateNotFound:
        abort(404)
# pylint: enable=R1710

@blueprint.route("/static/<name>/<file>.map")
def show_map(name,file):
    """ Specific route to retrieve map files """
    log.debug('Retrieving map static/%s/%s.map', name,file)
    return send_file('build/static/' + name + '/' + file + '.map')

# pylint: disable=R1710
@blueprint.route('/static/<name>/<file>')
def show_static(name,file):
    """ Specific route to retrieve non map static files """
    try:
        log.debug('Retrieving template static/%s/%s', name, file)
        return render_template(f'static/{name}/{file}')
    except TemplateNotFound:
        abort(404)
# pylint: enable=R1710

@blueprint.route('/static/media/<file>')
def show_media(file):
    """ Specific route to retrieve media files """
    log.debug('Retrieving media static/media/%s', file)
    return send_file('build/static/media/' + file)
