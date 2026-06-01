def test_create_customer_success(client):
    response = client.post('/customers', json={
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'phone': '5551234567'
    })
    assert response.status_code == 201
    assert response.json()['email'] == 'jane@example.com'

def test_duplicate_email_rejected(client):
    client.post('/customers', json={
        'name': 'User A', 'email': 'dup@test.com', 'phone': '5551111111'
    })
    response = client.post('/customers', json={
        'name': 'User B', 'email': 'dup@test.com', 'phone': '5552222222'
    })
    assert response.status_code == 409

def test_delete_customer(client):
    r = client.post('/customers', json={
        'name': 'Delete Me', 'email': 'del@test.com', 'phone': '5550000000'
    })
    cid = r.json()['id']
    assert client.delete(f'/customers/{cid}').status_code == 204
    assert client.get(f'/customers/{cid}').status_code == 404
