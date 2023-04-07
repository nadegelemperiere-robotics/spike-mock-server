""" Unit tests for label route """

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

def test_create_label(create, client):
    """ Tests label creation """
    log.info('Tests label creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Create valid label without date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-1'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['name'] == 'test-label-1'
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid label with creation date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been automatically set to created
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-2', 'created': '2019-02-05T21:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-label-2'
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid label with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-label-3'
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Create label with existing name
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 409
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create label with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-4', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_get_labels(client):
    """ Test label retrieval """

    log.info('Tests all labels retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Get all labels
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No features
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    check = {'test-label-1' : False, 'test-label-2' : False, 'test-label-3' : False}
    assert response.status_code == 200
    assert len(response.json) == 3
    for d in response.json:
        check[d['name']] = True
        assert uuid_pattern.match(d['id']) is not None
        assert not d['features']
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
    assert check['test-label-1']
    assert check['test-label-2']
    assert check['test-label-3']
    # ===============================================================================================================

def test_get_label(client):
    """ Test label retrieval """

    log.info('Tests label retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Get a single label
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No features
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/labels/'+idref, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-label-1'
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
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
    # Get a single label with invalid identifier
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.get('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_update_label(client):
    """ Test label update """

    log.info('Tests label update')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    idref = response.json[0]['id']
    createdref = response.json[0]['created']

    # ===============================================================================================================
    # Update valid label without date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/labels/'+idref, json={'name':'test-label-4'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 200
    assert response.json['name'] == 'test-label-4'
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert delta.total_seconds() < 5
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid label with update date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been set
    updatedref = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    response = client.put('/eaas-archiver/v1/labels/'+idref, json={'name': 'test-label-5', 'updated': updatedref}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-label-5'
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert updatedref == response.json['updated']
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid label with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.put('/eaas-archiver/v1/labels/'+idref, json={'name':'test-label-1', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-label-1'
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Update label with non existing id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', json={'name':'test-label-6'}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update label with existing name
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/labels/'+idref, json={'name':'test-label-2'}, follow_redirects=True)
    assert response.status_code == 409
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update label with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/labels/'+idref, json={'name':'test-label-6', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_delete_label(client):
    """ Test label deletion """

    log.info('Tests label deletion')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Delete valid label
    # -> Shall succeed and return 204
    response = client.delete('/eaas-archiver/v1/labels/'+idref, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_create_feature(client):
    """ Test label feature creation """

    log.info('Tests feature creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Create valid feature without date
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-1'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid feature with creation date only
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been automatically set to created
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-2', 'created': '2019-02-05T21:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-feature-2'
    assert response.json['type'] == 'integer'
    assert response.json['dynamics'] == 'static'
    assert not response.json['values']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid feature with creation date and update date
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
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
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-4', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
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
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create feature with invalid label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create feature with invalid type
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'bla', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create feature with invalid dynamics
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'bla'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create enumerated feature with no value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'enum', 'dynamics' : 'static'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create non enumerated feature with values
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+idref+'/features', json={'name':'test-feature-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'type' : 'integer', 'dynamics' : 'static', 'values' : ['v1', 'v2', 'v3']}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_get_feature(client):
    """ Test label feature retrieval """

    log.info('Tests feature retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Test retrieving all features for existing label
    # -> Shall succeed
    # -> 4 features
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/labels/'+idref+'/features', follow_redirects=True)
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


    # ===============================================================================================================
    # Test retrieving all features for non existing label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.get('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/features', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_check_label_feature_association(client):
    """ Test label feature association exists """

    log.info('Tests label feature association check')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    id1 = response.json[0]['id']
    id2 = response.json[1]['id']
    idf = response.json[0]['features'][0]['id']

    # ===============================================================================================================
    # Check existing association
    # -> Shall succeed
    response = client.head('/eaas-archiver/v1/labels/'+id1+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 200

    # ===============================================================================================================
    # Check non existing association
    # -> Shall not succeed
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.head('/eaas-archiver/v1/labels/'+id2+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Check association with non existing feature
    # -> Shall not succeed
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.head('/eaas-archiver/v1/labels/'+id1+'/features/rel/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Check association with non existing label
    # -> Shall not succeed
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.head('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_create_label_feature_association(client):
    """ Test label feature association creation """

    log.info('Tests label feature association creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    id1 = response.json[0]['id']
    id2 = response.json[1]['id']
    idf = response.json[0]['features'][0]['id']

    # ===============================================================================================================
    # Create new association with existing feature
    # -> Shall succeed
    response = client.post('/eaas-archiver/v1/labels/'+id2+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 201
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['feature'] == idf
    assert response.json['label'] == id2
    # ===============================================================================================================

    # ===============================================================================================================
    # Create existing association with existing feature
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+id1+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create association with non existing feature
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/'+id1+'/features/rel/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create existing association with non existing label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_delete_label_feature_association(client):
    """ Test label feature association deletion """

    log.info('Tests label feature association deletion')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    id1 = response.json[0]['id']
    id2 = response.json[1]['id']
    idf = response.json[0]['features'][0]['id']

    # ===============================================================================================================
    # Delete association with existing feature
    # -> Shall succeed
    response = client.delete('/eaas-archiver/v1/labels/'+id2+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing association with existing feature and existing label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/labels/'+id2+'/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete association with non existing feature
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/labels/'+id1+'/features/rel/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete existing association with non existing label
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/labels/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/features/rel/'+idf, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

#pylint: enable=C0301, W0621, W0613
