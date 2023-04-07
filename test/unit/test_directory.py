""" Unit tests for directory route """

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

    getLogger('api.v1.controllers.directory').setLevel(WARNING)
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

def test_create_directory(create, client):
    """ Tests directory creation """
    log.info('Tests directory creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Create valid directory without date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-1'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['name'] == 'test-directory-1'
    assert not response.json['records']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid directory with creation date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been automatically set to created
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-2', 'created': '2019-02-05T21:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-directory-2'
    assert not response.json['records']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid directory with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-directory-3'
    assert not response.json['records']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Create directory with existing name
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 409
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create directory with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-4', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_get_directories(client):
    """ Test all directories retrieval """

    log.info('Tests all directories retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')

    # ===============================================================================================================
    # Get all directories
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    check = {'test-directory-1' : False, 'test-directory-2' : False, 'test-directory-3' : False}
    assert response.status_code == 200
    assert len(response.json) == 3
    for d in response.json:
        check[d['name']] = True
        assert uuid_pattern.match(d['id']) is not None
        assert not d['records']
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
    assert check['test-directory-1']
    assert check['test-directory-2']
    assert check['test-directory-3']
    # ===============================================================================================================

def test_get_directory(client):
    """ Test directory retrieval """

    log.info('Tests directory retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Get a single directory
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/directories/'+idref, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-directory-1'
    assert not response.json['records']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    # ===============================================================================================================


    # ===============================================================================================================
    # Get a single directory with invalid identifier
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.get('/eaas-archiver/v1/directories/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================



def test_update_directory(client):
    """ Test directory update """

    log.info('Tests directory update')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    idref = response.json[0]['id']
    createdref = response.json[0]['created']

    # ===============================================================================================================
    # Update valid directory without date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/directories/'+idref, json={'name':'test-directory-4'}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 200
    assert response.json['name'] == 'test-directory-4'
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert delta.total_seconds() < 5
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid directory with update date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been set
    updatedref = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    response = client.put('/eaas-archiver/v1/directories/'+idref, json={'name': 'test-directory-5', 'updated': updatedref}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-directory-5'
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert updatedref == response.json['updated']
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid directory with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.put('/eaas-archiver/v1/directories/'+idref, json={'name':'test-directory-1', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-directory-1'
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Update directory with non existing id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/directories/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', json={'name':'test-directory-6'}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update directory with existing name
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/directories/'+idref, json={'name':'test-directory-2'}, follow_redirects=True)
    assert response.status_code == 409
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update directory with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/directories/'+idref, json={'name':'test-directory-6', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_delete_directory(client):
    """ Test directory deletion """

    log.info('Tests directory deletion')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Delete valid directory
    # -> Shall succeed and return 204
    response = client.delete('/eaas-archiver/v1/directories/'+idref, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing directory
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/directories/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_create_record(client):
    """ Test directory record creation """

    log.info('Tests record creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Create valid record without date
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/directories/'+idref+'/records', json={'name':'test-record-1', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['name'] == 'test-record-1'
    assert response.json['conversion-status'] == 'done'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 100
    assert response.json['message'] == 'Conversion is over'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 100
    assert response.json['segments-length'][1] == 10000
    assert response.json['frames-height'] == 1080
    assert response.json['frames-path'] == 'test-path/'
    assert response.json['frames-width'] == 1920
    assert response.json['frames-number'] == 1302
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid record with creation date only
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been automatically set to created
    response = client.post('/eaas-archiver/v1/directories/'+idref+'/records', json={'name':'test-record-2', 'created': '2019-02-05T21:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-record-2'
    assert response.json['conversion-status'] == 'done'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 100
    assert response.json['message'] == 'Conversion is over'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 100
    assert response.json['segments-length'][1] == 10000
    assert response.json['frames-height'] == 1080
    assert response.json['frames-path'] == 'test-path/'
    assert response.json['frames-width'] == 1920
    assert response.json['frames-number'] == 1302
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid record with creation date and update date
    # -> Shall succeed
    # -> Content shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/directories/'+idref+'/records', json={'name':'test-record-3', 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['name'] == 'test-record-3'
    assert response.json['conversion-status'] == 'done'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 100
    assert response.json['message'] == 'Conversion is over'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 100
    assert response.json['segments-length'][1] == 10000
    assert response.json['frames-height'] == 1080
    assert response.json['frames-path'] == 'test-path/'
    assert response.json['frames-width'] == 1920
    assert response.json['frames-number'] == 1302
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Create record with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/directories/'+idref+'/records', json={'name':'test-record-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create record with invalid video type
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/directories/'+idref+'/records', json={'name':'test-record-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'fram', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_get_record(client):
    """ Test directory record retrieval """

    log.info('Tests record retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/directories/'+idref+'/records', follow_redirects=True)
    check = {'test-record-1' : False, 'test-record-2' : False, 'test-record-3' : False}
    assert response.status_code == 200
    assert len(response.json) == 3
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
    assert check['test-record-1']
    assert check['test-record-2']
    assert check['test-record-3']
    # ===============================================================================================================
#pylint: enable=C0301, W0621, W0613
