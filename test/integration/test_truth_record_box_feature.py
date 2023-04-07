""" Integration test for more complex scenarii using truth, boxes, features and record """

# System includes
from  logging import getLogger
from  requests import post, get, delete

log = getLogger('root')

# Global variables for test
directory1 = ""
record1 = ""
record2 = ""
label1 = ""
feature1 = ""
feature2 = ""
feature3 = ""
truth1 = ""

# Disable error on lines too long & fixture seen as not used and redefined
#pylint: disable=C0301, W0621, W0613, W0603

def test_truth_record_box_feature_scenario_initialization(urlopt):
    """ Initialize data for truth/record/box/feature integration test """

    global  directory1, record1, record2, label1, feature1, feature2, feature3, truth1

    # ===============================================================================================================
    # Create valid records and features
    # -> Shall succeed

    log.info('Truth record box feature initialization')

    response = post('http://' + urlopt + '/eaas-archiver/v1/labels', json={'name':'test-label-10'})
    assert response.status_code == 201
    label1 = response.json()['id']
    print(label1)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-10', 'type':'integer', 'dynamics':'static'})
    assert response.status_code == 201
    feature1 = response.json()['id']
    print(feature1)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-20', 'type':'double', 'dynamics':'dynamic'})
    assert response.status_code == 201
    feature2 = response.json()['id']
    print(feature2)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-30', 'type':'enum', 'dynamics':'dynamic', 'values':['v1', 'v2', 'v3']})
    assert response.status_code == 201
    feature3 = response.json()['id']
    print(feature3)

    # ===============================================================================================================

    # ===============================================================================================================
    # Create valid records and directories
    # -> Shall succeed

    log.info('Directory record initialization')

    response = post('http://' + urlopt + '/eaas-archiver/v1/directories', json={'name':'test-directory-10'})
    assert response.status_code == 201
    directory1 = response.json()['id']
    print(directory1)

    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory1+'/records', json={'name' : 'test-record-10', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path1/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record1 = response.json()['id']

    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory1+'/records', json={'name' : 'test-record-20', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record2 = response.json()['id']

    # ===============================================================================================================

def test_truth_record_box_feature_scenario_directory_record_scenario_relationships(urlopt):
    """ Test relationships consistency scenario """

    global  directory1, record1, record2, label1, feature1, feature2, feature3, truth1

    # ===============================================================================================================
    # Create a new ground truth from existing records and features in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/truths', json={'author' : 'test-author-1', 'label' : label1, 'record' : record1, 'features':[{'value':'0', 'type':feature1}], 'boxes' : [{'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'0', 'type':feature2}, {'value':'v1', 'type':feature3}]}, {'xtl':0, 'ytl':0, 'xbr':0, 'ybr':0, 'frame':0, 'occluded':False, 'outside': False, 'features':[{'value':'1.0', 'type':feature2}, {'value':'v2', 'type':feature3}]}]})
    assert response.status_code == 201
    assert len(response.json()['boxes']) == 2
    assert len(response.json()['boxes'][0]['features']) == 2
    assert len(response.json()['boxes'][1]['features']) == 2
    assert len(response.json()['features']) == 1
    truth1 = response.json()['id']
    # ===============================================================================================================

def test_truth_record_box_feature_scenario_robustness(urlopt):
    """ Test robustness scenario """

    global  directory1, record1, record2, label1, feature1, feature2, feature3, truth1
    log.info('Truth record box feature robustness')

    # ===============================================================================================================
    # Test deleting an existing associated static feature => Should be removed from associated truth
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/features/'+feature1)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/truths/'+truth1)
    assert response.status_code == 200
    assert not response.json()['features']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test deleting an existing associated dynamic feature => Should be removed from associated truth
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/features/'+feature2)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/truths/'+truth1)
    assert response.status_code == 200
    assert len(response.json()['boxes'][0]['features']) == 1
    assert len(response.json()['boxes'][1]['features']) == 1
    # ===============================================================================================================


    # ===============================================================================================================
    # Test deleting an existing associated record => Should remove associated truths
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/records/'+record1)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/truths/'+truth1)
    assert response.status_code == 404
    # ===============================================================================================================





#pylint: enable=C0301, W0621, W0613, W0603
