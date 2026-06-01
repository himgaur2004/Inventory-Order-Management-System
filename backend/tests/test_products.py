def test_create_product_success(client):
    response = client.post('/products', json={
        'name': 'Test Widget',
        'sku': 'TW-001',
        'price': '19.99',
        'quantity': 50
    })
    assert response.status_code == 201
    data = response.json()
    assert data['sku'] == 'TW-001'
    assert data['id'] is not None

def test_create_product_duplicate_sku(client):
    client.post('/products', json={
        'name': 'Widget A', 'sku': 'DUPE-001', 'price': '10.00', 'quantity': 5
    })
    response = client.post('/products', json={
        'name': 'Widget B', 'sku': 'DUPE-001', 'price': '20.00', 'quantity': 5
    })
    assert response.status_code == 409

def test_get_product_not_found(client):
    response = client.get('/products/99999')
    assert response.status_code == 404

def test_update_product(client):
    r = client.post('/products', json={
        'name': 'Old Name', 'sku': 'UPD-001', 'price': '5.00', 'quantity': 10
    })
    product_id = r.json()['id']
    response = client.put(f'/products/{product_id}', json={'name': 'New Name'})
    assert response.status_code == 200
    assert response.json()['name'] == 'New Name'

def test_delete_product(client):
    r = client.post('/products', json={
        'name': 'To Delete', 'sku': 'DEL-001', 'price': '5.00', 'quantity': 1
    })
    product_id = r.json()['id']
    assert client.delete(f'/products/{product_id}').status_code == 204
    assert client.get(f'/products/{product_id}').status_code == 404
