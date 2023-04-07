""" Integration test for more complex scenarii using directory and record """

# System includes
from  logging import getLogger
from  requests import post, get, delete

log = getLogger('root')

# Global variables for test
label1 = ""
label2 = ""
feature1 = ""
feature2 = ""
feature3 = ""

# Disable error on lines too long & fixture seen as not used and redefined
#pylint: disable=C0301, W0621, W0613, W0603

def test_label_feature_scenario_initialization(urlopt):
    """ Initialize data for label/feature integration test """

    global  label1, label2, feature1, feature2, feature3

    # ===============================================================================================================
    # Create valid labels and features
    # -> Shall succeed

    log.info('Label feature initialization')

    response = post('http://' + urlopt + '/eaas-archiver/v1/labels', json={'name':'test-label-1'})
    assert response.status_code == 201
    label1 = response.json()['id']
    print(label1)

    response = post('http://' + urlopt + '/eaas-archiver/v1/labels', json={'name':'test-label-2'})
    assert response.status_code == 201
    label2 = response.json()['id']
    print(label2)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-1', 'type':'integer', 'dynamics':'static'})
    assert response.status_code == 201
    feature1 = response.json()['id']
    print(feature1)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-2', 'type':'double', 'dynamics':'dynamic'})
    assert response.status_code == 201
    feature2 = response.json()['id']
    print(feature2)

    response = post('http://' + urlopt + '/eaas-archiver/v1/features', json={'name':'test-feature-3', 'type':'boolean', 'dynamics':'dynamic'})
    assert response.status_code == 201
    feature3 = response.json()['id']
    print(feature3)

    # ===============================================================================================================

def test_label_feature_scenario_relationships(urlopt):
    """ Test relationships consistency scenario """

    global  label1, label2, feature1, feature2, feature3
    log.info('Label feature relationship')

    # ===============================================================================================================
    # Create a new relation between existing feature and existing label in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/labels/'+label1+'/features/rel/'+feature1)
    assert response.status_code == 201
    assert response.json()['feature'] == feature1
    assert response.json()['label'] == label1
    # ===============================================================================================================

    # ===============================================================================================================
    # Create a new relation between existing feature and existing label in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/labels/'+label1+'/features/rel/'+feature2)
    assert response.status_code == 201
    assert response.json()['feature'] == feature2
    assert response.json()['label'] == label1
    # ===============================================================================================================

    # ===============================================================================================================
    # Create a new relation between existing feature and existing label in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/labels/'+label2+'/features/rel/'+feature2)
    assert response.status_code == 201
    assert response.json()['feature'] == feature2
    assert response.json()['label'] == label2
    # ===============================================================================================================

    # ===============================================================================================================
    # Create a new relation between existing feature and existing label in database
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/labels/'+label2+'/features/rel/'+feature3)
    assert response.status_code == 201
    assert response.json()['feature'] == feature3
    assert response.json()['label'] == label2
    # ===============================================================================================================

    # ===============================================================================================================
    # Check labels retrieval
    # -> Shall succeed
    # -> Each shall have 2 features
    response = get('http://' + urlopt + '/eaas-archiver/v1/labels/'+label2)
    check = {'test-feature-2' : False, 'test-feature-3' : False}
    assert response.status_code == 200
    assert len(response.json()['features']) == 2
    for d in response.json()['features']:
        check[d['name']] = True
    assert check['test-feature-2']
    assert check['test-feature-3']
    # ===============================================================================================================

    # ===============================================================================================================
    # Check labels retrieval
    # -> Shall succeed
    # -> Each shall have 2 features
    response = get('http://' + urlopt + '/eaas-archiver/v1/labels/'+label1)
    check = {'test-feature-1' : False, 'test-feature-2' : False}
    assert response.status_code == 200
    assert len(response.json()['features']) == 2
    for d in response.json()['features']:
        check[d['name']] = True
    assert check['test-feature-1']
    assert check['test-feature-2']
    # ===============================================================================================================


def test_label_feature_scenario_robustness(urlopt):
    """ Test robustness scenario """

    global  label1, label2, feature1, feature2, feature3
    log.info('Label feature robustness')

    # ===============================================================================================================
    # Test deleting an existing associated feature => Should be removed from associated label
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/features/'+feature3)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/labels/'+label2)
    check = {'test-feature-2' : False}
    assert response.status_code == 200
    assert len(response.json()['features']) == 1
    for d in response.json()['features']:
        check[d['name']] = True
    assert check['test-feature-2']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test deleting a relation that let a feature unassociated => Should not remove the feature
    # -> Shall succeed
    response = delete('http://' + urlopt + '/eaas-archiver/v1/labels/'+label1+'/features/rel/'+feature1)
    assert response.status_code == 204
    response = get('http://' + urlopt + '/eaas-archiver/v1/features')
    check = {'test-feature-1' : False, 'test-feature-2' : False}
    assert response.status_code == 200
    assert len(response.json()) == 2
    for d in response.json():
        check[d['name']] = True
    assert check['test-feature-1']
    assert check['test-feature-2']
    # ===============================================================================================================

    # ===============================================================================================================
    # Test adding a new feature through label in database => Should increase the number of features
    # -> Shall succeed
    response = post('http://' + urlopt + '/eaas-archiver/v1/labels/'+label1+'/features', json={'name':'test-feature-4', 'type':'integer', 'dynamics':'static'})
    assert response.status_code == 201
    response = get('http://' + urlopt + '/eaas-archiver/v1/features')
    check = {'test-feature-1' : False, 'test-feature-2' : False, 'test-feature-4' : False}
    assert response.status_code == 200
    assert len(response.json()) == 3
    for d in response.json():
        check[d['name']] = True
    assert check['test-feature-1']
    assert check['test-feature-2']
    assert check['test-feature-4']
    # ===============================================================================================================

#pylint: enable=C0301, W0621, W0613, W0603
