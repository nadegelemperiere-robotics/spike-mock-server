""" Unit tests for feature route """

# System includes
from  sys import path
from  datetime import datetime
from  re import compile as re_compile
from  logging import getLogger, WARNING, CRITICAL, INFO
from  os.path import dirname, realpath
path.append(dirname(realpath(__file__)) + '/../../project/')

# Pytest includes
from  pytest import fixture

# Project includes
from    server import Server
from    database.common import db
log = getLogger('root')

server = Server()

# Disable error on lines too long & fixture seen as not used and redefined
#pylint: disable=C0301, W0621, W0613
@fixture(scope='module')
def create():
    """ App & database initialization at the beginning of module """

    getLogger('api.v1.controllers.label').setLevel(WARNING)
    getLogger('api.v1.controllers.feature').setLevel(WARNING)
    getLogger('api.v1.routes.common').setLevel(WARNING)
    getLogger('root').setLevel(INFO)

    print(' ')
    log.info('Creating application')
    server.configure('sqlite:///db.sqlite', '8888', 'localhost', True)
    server.initialize()
    server.push_context()

    log.info('Reinitializing database')
    db.create_all()

    yield create
    print(' ')
    log.info('Destroying database')
    db.drop_all()

@fixture
def app():
    """ app fixture for pytest-flask client fixture """
    return server.app

def test_create_feature(create, client):
    """ Test feature creation """

    log.info('Tests feature creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Create valid feature without date
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-1', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-1'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert delta.total_seconds() < 5
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid feature with create date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been set
    # -> Updated date shall be equal to created date
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-2', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3'], 'created': '2019-02-05T21:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-2'
    assert response.json['type'] == 'enum'
    assert response.json['dynamics'] == 'static'
    assert len(response.json['values']) == 3
    assert response.json['values'][0] == 'v1'
    assert response.json['values'][1] == 'v2'
    assert response.json['values'][2] == 'v3'
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid feature with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-3', 'type' : 'integer', 'dynamics' : 'static', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-3'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid enumerated feature with creation date and update date
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-4', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-4'
    assert response.json['type'] == 'enum'
    assert response.json['dynamics'] == 'static'
    assert len(response.json['values']) == 3
    assert response.json['values'][0] == 'v1'
    assert response.json['values'][1] == 'v2'
    assert response.json['values'][2] == 'v3'
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================


    # ===============================================================================================================
    # Create feature with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-5', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create feature with invalid type
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-5', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'bla', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create feature with invalid dynamics
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-5', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'bla'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create enumerated feature with no value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-5', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create non enumerated feature with values
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/features', json={'name':'test-feature-5', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_get_features(client):
    """ Test features retrieval """

    log.info('Tests all features retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Get all features
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No features
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/features', follow_redirects=True)
    check = {'test-feature-1' : False, 'test-feature-2' : False, 'test-feature-3' : False, 'test-feature-4' : False}
    assert response.status_code == 200
    assert len(response.json) == 4
    for d in response.json:
        check[d['name']] = True
        assert uuid_pattern.match(d['id']) is not None
        try:
            datetime.strptime(d['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
            assert True
        except ValueError:
            assert False
        try:
            datetime.strptime(d['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
            assert True
        except ValueError:
            assert False
    assert check['test-feature-1']
    assert check['test-feature-2']
    assert check['test-feature-3']
    assert check['test-feature-4']
    # ===============================================================================================================


def test_update_feature(create, client):
    """ Test feature update """

    log.info('Tests feature update')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-1'}, follow_redirects=True)
    label = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label+'/features', json={'name':'test-feature-5', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    feature1 = response.json['id']
    createdref = response.json['created']
    response = client.post('/eaas-archiver/v1/labels/'+label+'/features', json={'name':'test-feature-6', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)

    # ===============================================================================================================
    # Update valid feature without date
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-7', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 200
    assert response.json['name'] == 'test-feature-7'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert delta.total_seconds() < 5
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid feature with update date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been set
    updatedref = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-5', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3'], 'updated': updatedref}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-feature-5'
    assert response.json['type'] == 'enum'
    assert response.json['dynamics'] == 'static'
    assert len(response.json['values']) == 3
    assert response.json['values'][0] == 'v1'
    assert response.json['values'][1] == 'v2'
    assert response.json['values'][2] == 'v3'
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert updatedref == response.json['updated']
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid feature with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-7', 'type' : 'integer', 'dynamics' : 'static', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-feature-7'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Update feature with non existing id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', json={'name':'test-feature-8', 'type' : 'integer', 'dynamics' : 'static', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update feature with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-8', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update feature with invalid type
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-8', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'bla', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update feature with invalid dynamics
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-8', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'bla'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update enumerated feature with no value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-8', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update non enumerated feature with values
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/features/'+feature1, json={'name':'test-feature-8', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_get_feature(client):
    """ Test label feature retrieval """

    log.info('Tests feature retrieval')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    label = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/labels/'+label+'/features', follow_redirects=True)
    feature = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/features/'+feature, follow_redirects=True)

    # ===============================================================================================================
    # Get a single feature
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No features
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/features/'+feature, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-feature-7'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    try:
        datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
        assert True
    except ValueError:
        assert False
    try:
        datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
        assert True
    except ValueError:
        assert False
    # ===============================================================================================================


    # ===============================================================================================================
    # Get a single directory with invalid identifier
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.get('/eaas-archiver/v1/features/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_delete_feature(client):
    """ Test feature deletion """

    log.info('Tests feature deletion')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    label = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/labels/'+label+'/features', follow_redirects=True)
    feature = response.json[0]['id']

    # ===============================================================================================================
    # Delete valid feature
    # -> Shall succeed and return 204
    response = client.delete('/eaas-archiver/v1/features/'+feature, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing feature
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/features/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

#pylint: enable=C0301, W0621, W0613
