""" Integration test for more complex scenarii using directory and record """

# System includes
from  logging import getLogger
from  requests import post, get, delete

log = getLogger('root')

# Global variables for test
directory1 = ""
directory2 = ""
record1 = ""
record2 = ""
record3 = ""
record4 = ""

# Disable error on lines too long & fixture seen as not used and redefined
#pylint: disable=C0301, W0621, W0613, W0603

def test_directory_record_scenario_initialization(urlopt):
    """ Initialize data for directory/record integration test """

    global  directory1, directory2, record1, record2, record3, record4

    # ===============================================================================================================
    # Create valid directories and records
    # -> Shall succeed

    log.info('Directory record initialization')

    response = post('http://' + urlopt + '/eaas-archiver/v1/directories', json={'name':'test-directory-1'})
    assert response.status_code == 201
    directory1 = response.json()['id']

    response = post('http://' + urlopt + '/eaas-archiver/v1/directories', json={'name':'test-directory-2'})
    assert response.status_code == 201
    directory2 = response.json()['id']

    # ===============================================================================================================

def test_directory_record_scenario_relationships(urlopt):
    """ Test relationships consistency scenario """

    global  directory1, directory2, record1, record2, record3, record4
    log.info('Directory record relationship')

    # ===============================================================================================================
    # Test posting a new record for directory in database => Should succeed
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory1+'/records', json={'name' : 'test-record-1', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record1 = response.json()['id']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test posting a new record for directory in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory1+'/records', json={'name' : 'test-record-2', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record2 = response.json()['id']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test posting a new record for directory in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory2+'/records', json={'name' : 'test-record-3', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record3 = response.json()['id']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test posting a new record for directory in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory2+'/records', json={'name' : 'test-record-4', 'conversion-status' : 'failed', 'video-type' : 'frames', 'conversion-percentage' : 50, 'message' : 'Conversion failed', 'segments-length' : [200, 20000], 'frames-height' : 1000, 'frames-path' : 'test-path2/', 'frames-width' : 1200, 'frames-number' : 500})
    assert response.status_code == 201
    record4 = response.json()['id']
    # ===============================================================================================================


def test_directory_record_scenario_robustness(urlopt):
    """ Test robustness scenario """

    global  directory1, directory2, record1, record2, record3, record4
    log.info('Directory record robustness')

    # ===============================================================================================================
    # Test deleting an existing associated record => Should be removed from associated directory
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/records/'+record3)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/directories/'+directory2)
    check = {'test-record-4' : False}
    assert response.status_code == 200
    assert len(response.json()['records']) == 1
    for d in response.json()['records']:
        check[d['name']] = True
    assert check['test-record-4']
    # ===============================================================================================================

#pylint: enable=C0301, W0621, W0613, W0603
