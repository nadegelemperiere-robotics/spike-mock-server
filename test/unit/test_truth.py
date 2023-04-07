""" Unit tests for truth route """

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

    getLogger('api.v1.controllers.truth').setLevel(WARNING)
    getLogger('api.v1.controllers.directory').setLevel(WARNING)
    getLogger('api.v1.controllers.record').setLevel(WARNING)
    getLogger('api.v1.controllers.label').setLevel(WARNING)
    getLogger('api.v1.controllers.feature').setLevel(WARNING)
    getLogger('api.v1.routes.common').setLevel(WARNING)
    getLogger('root').setLevel(INFO)


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

def test_create_truth(create, client):
    """ Tests truth creation """

    log.info('Tests truth creation')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.post('/eaas-archiver/v1/directories', json={'name':'test-directory-1'}, follow_redirects=True)
    directory1 = response.json['id']
    response = client.post('/eaas-archiver/v1/directories/'+directory1+'/records', json={'name':'test-record-1', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    record1 = response.json['id']
    response = client.post('/eaas-archiver/v1/directories/'+directory1+'/records', json={'name':'test-record-2', 'conversion-status' : 'done', 'video-type' : 'frames', 'conversion-percentage' : 100, 'message' : 'Conversion is over', 'segments-length' : [100, 10000], 'frames-height' : 1080, 'frames-path' : 'test-path/', 'frames-width' : 1920, 'frames-number' : 1302}, follow_redirects=True)
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-1'}, follow_redirects=True)
    label1 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels', json={'name':'test-label-2'}, follow_redirects=True)
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-1', 'type' : 'integer', 'dynamics' : 'static'}, follow_redirects=True)
    feature1 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-2', 'type' : 'double', 'dynamics' : 'static'}, follow_redirects=True)
    feature2 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-3', 'type' : 'boolean', 'dynamics' : 'static'}, follow_redirects=True)
    feature3 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-4', 'type' : 'string', 'dynamics' : 'static'}, follow_redirects=True)
    feature4 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-5', 'type' : 'enum', 'dynamics' : 'static', 'values':['v1', 'v2', 'v3']}, follow_redirects=True)
    feature5 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-6', 'type' : 'integer', 'dynamics' : 'dynamic'}, follow_redirects=True)
    feature6 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-7', 'type' : 'double', 'dynamics' : 'dynamic'}, follow_redirects=True)
    feature7 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-8', 'type' : 'boolean', 'dynamics' : 'dynamic'}, follow_redirects=True)
    feature8 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-9', 'type' : 'string', 'dynamics' : 'dynamic'}, follow_redirects=True)
    feature9 = response.json['id']
    response = client.post('/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-10', 'type' : 'enum', 'values':['v1', 'v2', 'v3'], 'dynamics' : 'dynamic'}, follow_redirects=True)
    feature10 = response.json['id']

    # ===============================================================================================================
    # Create valid truth without date
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-1', 'label':label1, 'record' : record1}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-1'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid truth with creation date only
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been automatically set to created
    response = client.post('/eaas-archiver/v1/truths', json={'created': '2019-02-05T21:16:01.322000Z', 'author':'test-author-2', 'label':label1, 'record' : record1}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-2'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid truth with creation date and update date
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.post('/eaas-archiver/v1/truths', json={'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z', 'author':'test-author-3', 'label':label1, 'record' : record1}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-3'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid truth with boxes
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-4', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False}]}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-4'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert len(response.json['boxes']) == 2
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert delta.total_seconds() < 5
    assert response.json['updated'] == response.json['created']
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid truth with static features
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-5', 'label':label1, 'record':record1, 'features':[{'value':'0', 'type':feature1}, {'value':'0.0', 'type':feature2}, {'value':'True', 'type':feature3}, {'value':'string', 'type':feature4}, {'value':'v1', 'type':feature5}]}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-5'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert len(response.json['features']) == 5
    assert response.json['features'][0]['value'] == '0'
    assert response.json['features'][0]['type'] == feature1
    assert response.json['features'][1]['value'] == '0.0'
    assert response.json['features'][1]['type'] == feature2
    assert response.json['features'][2]['value'] == 'True'
    assert response.json['features'][2]['type'] == feature3
    assert response.json['features'][3]['value'] == 'string'
    assert response.json['features'][3]['type'] == feature4
    assert response.json['features'][4]['value'] == 'v1'
    assert response.json['features'][4]['type'] == feature5
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert datetime.utcnow() != datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid truth with boxes and dynamic feature
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 201
    assert response.json['author'] == 'test-author-6'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert len(response.json['boxes']) == 2
    assert len(response.json['boxes'][0]['features']) == 3
    assert len(response.json['boxes'][1]['features']) == 2
    assert response.json['boxes'][0]['xtl'] == 0
    assert response.json['boxes'][0]['ytl'] == 0
    assert response.json['boxes'][0]['xbr'] == 0
    assert response.json['boxes'][0]['ybr'] == 0
    assert response.json['boxes'][0]['frame'] == 0
    assert not response.json['boxes'][0]['occluded']
    assert not response.json['boxes'][0]['outside']
    assert response.json['boxes'][0]['features'][0]['value'] == '0'
    assert response.json['boxes'][0]['features'][0]['type'] == feature6
    assert response.json['boxes'][0]['features'][1]['value'] == '0.0'
    assert response.json['boxes'][0]['features'][1]['type'] == feature7
    assert response.json['boxes'][0]['features'][2]['value'] == 'True'
    assert response.json['boxes'][0]['features'][2]['type'] == feature8
    assert response.json['boxes'][1]['features'][0]['value'] == 'string'
    assert response.json['boxes'][1]['features'][0]['type'] == feature9
    assert response.json['boxes'][1]['features'][1]['value'] == 'v1'
    assert response.json['boxes'][1]['features'][1]['type'] == feature10
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert datetime.utcnow() != datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')# ===============================================================================================================

    # ===============================================================================================================
    # Create truth with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with unknown label id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with unknown record id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with unknown box feature id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with unknown truth feature id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'features':[{'value':'0', 'type':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with static feature in boxes
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature1}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with dynamic feature in truth
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'features':[{'value':'0', 'type':feature6}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with static feature in ground truth boxes
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature1}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with enumerated type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'v4', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with integer type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0.34', 'type':feature6}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with double type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'v4', 'type':feature7}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Create truth with boolean type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.post('/eaas-archiver/v1/truths', json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'bla', 'type':feature8}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================


def test_get_truths(client):
    """ Test all truths retrieval """

    log.info('Tests all truths retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    label = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    directory = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories/'+directory+'/records', follow_redirects=True)
    record = response.json[0]['id']

    # ===============================================================================================================
    # Get all truths
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/truths', follow_redirects=True)
    check = {'test-author-1' : False, 'test-author-2' : False, 'test-author-3' : False, 'test-author-4' : False, 'test-author-5' : False, 'test-author-6' : False}
    assert response.status_code == 200
    assert len(response.json) == 6
    for d in response.json:
        check[d['author']] = True
        assert d['label'] == label
        assert d['record'] == record
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
    assert check['test-author-1']
    assert check['test-author-2']
    assert check['test-author-3']
    assert check['test-author-4']
    assert check['test-author-5']
    assert check['test-author-6']
    # ===============================================================================================================

def test_get_truth(client):
    """ Test truth retrieval """

    log.info('Tests truth retrieval')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/truths', follow_redirects=True)
    idref = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    label = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    directory = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories/'+directory+'/records', follow_redirects=True)
    record = response.json[0]['id']

    # ===============================================================================================================
    # Get a single truth
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> No records
    # -> Created date shall have correct format
    # -> Updated date shall have correct format
    response = client.get('/eaas-archiver/v1/truths/'+idref, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-1'
    assert response.json['label'] == label
    assert response.json['record'] == record
    assert not response.json['features']
    assert not response.json['boxes']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert datetime.utcnow() != datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    # ===============================================================================================================


    # ===============================================================================================================
    # Get a single truth with invalid identifier
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.get('/eaas-archiver/v1/truths/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================



def test_update_truth(client):
    """ Test truth update """

    log.info('Tests truth update')
    uuid_pattern = re_compile(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}')
    response = client.get('/eaas-archiver/v1/truths', follow_redirects=True)
    idref = response.json[0]['id']
    createdref = response.json[0]['created']
    response = client.get('/eaas-archiver/v1/labels', follow_redirects=True)
    label1 = response.json[0]['id']
    label2 = response.json[1]['id']
    response = client.get('/eaas-archiver/v1/directories', follow_redirects=True)
    directory = response.json[0]['id']
    response = client.get('/eaas-archiver/v1/directories/'+directory+'/records', follow_redirects=True)
    record1 = response.json[0]['id']
    record2 = response.json[1]['id']
    response = client.get('/eaas-archiver/v1/features', follow_redirects=True)
    feature1 = response.json[0]['id']
    feature2 = response.json[1]['id']
    feature3 = response.json[2]['id']
    feature4 = response.json[3]['id']
    feature5 = response.json[4]['id']
    feature6 = response.json[5]['id']
    feature7 = response.json[6]['id']
    feature8 = response.json[7]['id']
    feature9 = response.json[8]['id']
    feature10 = response.json[9]['id']

    # ===============================================================================================================
    # Update valid truth without date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-1', 'label':label1, 'record':record1}, follow_redirects=True)
    delta = datetime.utcnow() - datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-1'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert delta.total_seconds() < 5

    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid truth with update date only
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been kept
    # -> Updated date shall have been set
    updatedref = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author': 'test-author-2', 'label':label1, 'record':record1, 'updated': updatedref}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-2'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert uuid_pattern.match(response.json['id']) is not None
    assert createdref == response.json['created']
    assert updatedref == response.json['updated']
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid truth with creation date and update date
    # -> Shall succeed
    # -> Name shall match
    # -> Id shall have uuid format
    # -> Created date shall have been copied
    # -> Updated date shall have been copied
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-1', 'label':label1, 'record':record1, 'created': '2019-02-05T21:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-1'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert uuid_pattern.match(response.json['id']) is not None
    assert response.json['created'] == '2019-02-05T21:16:01.322000Z'
    assert response.json['updated'] == '2019-02-05T22:16:01.322000Z'
    # ===============================================================================================================

    # ===============================================================================================================
    # Update valid truth with boxes and feature
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label2, 'record':record2, 'features':[{'value':'0', 'type':feature1}, {'value':'0.0', 'type':feature2}, {'value':'True', 'type':feature3}, {'value':'string', 'type':feature4}, {'value':'v1', 'type':feature5}], 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-6'
    assert response.json['label'] == label2
    assert response.json['record'] == record2
    assert len(response.json['boxes']) == 2
    assert len(response.json['boxes'][0]['features']) == 3
    assert len(response.json['boxes'][1]['features']) == 2
    assert response.json['boxes'][0]['xtl'] == 0
    assert response.json['boxes'][0]['ytl'] == 0
    assert response.json['boxes'][0]['xbr'] == 0
    assert response.json['boxes'][0]['ybr'] == 0
    assert response.json['boxes'][0]['frame'] == 0
    assert not response.json['boxes'][0]['occluded']
    assert not response.json['boxes'][0]['outside']
    assert response.json['boxes'][0]['features'][0]['value'] == '0'
    assert response.json['boxes'][0]['features'][0]['type'] == feature6
    assert response.json['boxes'][0]['features'][1]['value'] == '0.0'
    assert response.json['boxes'][0]['features'][1]['type'] == feature7
    assert response.json['boxes'][0]['features'][2]['value'] == 'True'
    assert response.json['boxes'][0]['features'][2]['type'] == feature8
    assert response.json['boxes'][1]['features'][0]['value'] == 'string'
    assert response.json['boxes'][1]['features'][0]['type'] == feature9
    assert response.json['boxes'][1]['features'][1]['value'] == 'v1'
    assert response.json['boxes'][1]['features'][1]['type'] == feature10
    assert len(response.json['features']) == 5
    assert response.json['features'][0]['value'] == '0'
    assert response.json['features'][0]['type'] == feature1
    assert response.json['features'][1]['value'] == '0.0'
    assert response.json['features'][1]['type'] == feature2
    assert response.json['features'][2]['value'] == 'True'
    assert response.json['features'][2]['type'] == feature3
    assert response.json['features'][3]['value'] == 'string'
    assert response.json['features'][3]['type'] == feature4
    assert response.json['features'][4]['value'] == 'v1'
    assert response.json['features'][4]['type'] == feature5
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert datetime.utcnow() != datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')# ===============================================================================================================

    # ===============================================================================================================
    # Update valid truth with nothing
    # -> Shall succeed
    # -> Data shall match
    # -> Id shall have uuid format
    # -> Created date shall have been automatically set to now
    # -> Updated date shall have been automatically set to now
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-5', 'label':label1, 'record':record1}, follow_redirects=True)
    assert response.status_code == 200
    assert response.json['author'] == 'test-author-5'
    assert response.json['label'] == label1
    assert response.json['record'] == record1
    assert not response.json['boxes']
    assert not response.json['features']
    assert uuid_pattern.match(response.json['id']) is not None
    assert datetime.utcnow() != datetime.strptime(response.json['created'], '%Y-%m-%dT%H:%M:%S.%fZ')
    assert datetime.utcnow() != datetime.strptime(response.json['updated'], '%Y-%m-%dT%H:%M:%S.%fZ')# ===============================================================================================================

    # ===============================================================================================================
    # Update truth with non existing id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', json={'author':'test-author-6', 'label':label1, 'record':record1}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with updated date older than created date
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record':record1, 'created': '2019-02-05T23:16:01.322000Z', 'updated': '2019-02-05T22:16:01.322000Z'}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with unknown label id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with unknown record id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature6}, {'value':'0.0', 'type':feature7}, {'value':'True', 'type':feature8}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'string', 'type':feature9}, {'value':'v1', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with unknown box feature id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'}]}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with unknown truth feature id
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'features':[{'value':'0', 'type':'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'}]}, follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with static feature in boxes
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature1}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with dynamic feature in truth
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'features':[{'value':'0', 'type':feature6}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with static feature in ground truth boxes
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature1}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with enumerated type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'v4', 'type':feature10}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with integer type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0.34', 'type':feature6}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with double type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'v4', 'type':feature7}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

    # ===============================================================================================================
    # Update truth with boolean type with invalid value
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.put('/eaas-archiver/v1/truths/'+idref, json={'author':'test-author-6', 'label':label1, 'record' : record1, 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'bla', 'type':feature8}]}]}, follow_redirects=True)
    assert response.status_code == 400
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

def test_delete_truth(client):
    """ Test truth deletion """

    log.info('Tests truth deletion')
    response = client.get('/eaas-archiver/v1/truths', follow_redirects=True)
    idref = response.json[0]['id']

    # ===============================================================================================================
    # Delete valid truth
    # -> Shall succeed and return 204
    response = client.delete('/eaas-archiver/v1/truths/'+idref, follow_redirects=True)
    assert response.status_code == 204
    # ===============================================================================================================

    # ===============================================================================================================
    # Delete non existing truth
    # -> Shall fail
    getLogger('api.v1.routes.common').setLevel(CRITICAL)
    response = client.delete('/eaas-archiver/v1/truths/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', follow_redirects=True)
    assert response.status_code == 404
    getLogger('api.v1.routes.common').setLevel(WARNING)
    # ===============================================================================================================

#pylint: enable=C0301, W0621, W0613
