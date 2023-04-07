""" Unit tests for record route """

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
    getLogger('api.v1.controllers.record').setLevel(WARNING)
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

def test_update_record(create, client):
    """ Test record update """

    log.info('Tests record creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-1'}, follow_redirects=True)
    directory = response.json['id']
    response = client.post('/eaas-archiver/v1/directories/'+directory+'/records', json={'name':'test-record-1', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    record1 = response.json['id']
    createdref = response.json['created']
    response = client.post('/eaas-archiver/v1/directories/'+directory+'/records', json={'name':'test-record-2', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)

    # ===============================================================================================================
    # Update valid record without date
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/records/'+record1, json={'name':'test-record-3', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 200
    assert response.json['name'] == 'test-record-3'
    assert response.json['conversion-status'] == 'failed'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 50
    assert response.json['message'] == 'Conversion failed'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 200
    assert response.json['segments-length'][1] == 20000
    assert response.json['frames-height'] == 1000
    assert response.json['frames-path'] == 'test-path2/'
    assert response.json['frames-width'] == 1200
    assert response.json['frames-number'] == 500
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
    response = client.put('/eaas-archiver/v1/records/'+record1, json={'name':'test-record-3', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500, 'updated': updatedref}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-record-3'
    assert response.json['conversion-status'] == 'failed'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 50
    assert response.json['message'] == 'Conversion failed'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 200
    assert response.json['segments-length'][1] == 20000
    assert response.json['frames-height'] == 1000
    assert response.json['frames-path'] == 'test-path2/'
    assert response.json['frames-width'] == 1200
    assert response.json['frames-number'] == 500
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
    response = client.put('/eaas-archiver/v1/records/'+record1, json={'name':'test-record-3', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500, 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['name'] == 'test-record-3'
    assert response.json['conversion-status'] == 'failed'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 50
    assert response.json['message'] == 'Conversion failed'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 200
    assert response.json['segments-length'][1] == 20000
    assert response.json['frames-height'] == 1000
    assert response.json['frames-path'] == 'test-path2/'
    assert response.json['frames-width'] == 1200
    assert response.json['frames-number'] == 500
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Update directory with non existing id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/records/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', json={'name':'test-record-3', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500, 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update record with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/records/'+record1, json={'name':'test-record-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update record with invalid video type
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/records/'+record1, json={'name':'test-record-1', 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'conversion-status' : 'done', 'video-type' : 'fram', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_get_record(client):
    """ Test directory record retrieval """

    log.info('Tests record retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    directory = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories/'+directory+'/records', follow_redirects=True)
    record = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/records/'+record, follow_redirects=True)

    # ===============================================================================================================
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/records/'+record, follow_redirects=True)
    assert response.status_code == 200
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['name'] == 'test-record-3'
    assert response.json['conversion-status'] == 'failed'
    assert response.json['video-type'] == 'frames'
    assert response.json['conversion-percentage'] == 50
    assert response.json['message'] == 'Conversion failed'
    assert len(response.json['segments-length']) == 2
    assert response.json['segments-length'][0] == 200
    assert response.json['segments-length'][1] == 20000
    assert response.json['frames-height'] == 1000
    assert response.json['frames-path'] == 'test-path2/'
    assert response.json['frames-width'] == 1200
    assert response.json['frames-number'] == 500
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

def test_delete_record(client):
    """ Test record deletion """

    log.info('Tests directory deletion')
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    directory = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories/'+directory+'/records', follow_redirects=True)
    record = response.json[0]['id']

    # ===============================================================================================================
    # Delete valid directory
    # -> Shall succeed and return 204
    response = client.delete('/eaas-archiver/v1/records/'+record, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing directory
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/records/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


#pylint: enable=C0301, W0621, W0613
