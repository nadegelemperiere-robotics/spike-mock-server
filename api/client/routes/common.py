"""######################################################################
#                 Api declaration and generic functions                 #
######################################################################"""

# System includes
from logging import getLogger

# Flask includes
from flask import Blueprint, render_template, send_file, abort, request
from jinja2 import TemplateNotFound
from flask_restx  import Api

log = getLogger("common")
blueprint = Blueprint('/', __name__, url_prefix='/', static_folder='../../../build/static', template_folder='../../../build')
api = Api(title='client', description='client route access', doc='/doc')

def initialize() :
    api.init_app(blueprint)

@blueprint.route('/')
def client():
    """ Returns client static files. """
    return render_template('index.html')

@blueprint.route('/logo192.png')
@blueprint.route('/logo512.png')
@blueprint.route('/favicon.ico')
def show_logo():
    try:
        log.debug('Retrieving media /%s',request.path[1:])
        return send_file('build/' + request.path[1:])
    except FileNotFoundError:
        abort(404)

@blueprint.route('/<file>')
def show(file):
    try:
        log.debug('Retrieving template %s', file)
        return render_template(f'{file}')
    except TemplateNotFound:
        abort(404)

@blueprint.route("/static/<name>/<file>.map")
def show_map(name,file):
    log.debug('Retrieving map static/%s/%s.map', name,file)
    return send_file('build/static/' + name + '/' + file + '.map')

@blueprint.route('/static/<name>/<file>')
def show_static(name,file):
    try:
        log.debug('Retrieving template static/%s/%s', name, file)
        return render_template(f'static/{name}/{file}')
    except TemplateNotFound:
        abort(404)

@blueprint.route('/static/media/<file>')
def show_media(file):
    log.debug('Retrieving media static/media/%s', file)
    return send_file('build/static/media/' + file)
