def create_product(client, name, sku, price, qty):
    r = client.post('/products', json={
        'name': name, 'sku': sku, 'price': str(price), 'quantity': qty
    })
    return r.json()['id']

def create_customer(client):
    r = client.post('/customers', json={
        'name': 'Test User', 'email': 'test@test.com', 'phone': '1234567890'
    })
    return r.json()['id']

def test_create_order_success(client):
    prod_id = create_product(client, 'Desk', 'DSK-001', '150.00', 20)
    cust_id = create_customer(client)
    response = client.post('/orders', json={
        'customer_id': cust_id,
        'items': [{'product_id': prod_id, 'quantity': 3}]
    })
    assert response.status_code == 201
    data = response.json()
    assert float(data['total_amount']) == 450.00

def test_order_reduces_stock(client):
    prod_id = create_product(client, 'Chair', 'CHR-001', '80.00', 10)
    cust_id = create_customer(client)
    client.post('/orders', json={
        'customer_id': cust_id,
        'items': [{'product_id': prod_id, 'quantity': 4}]
    })
    product = client.get(f'/products/{prod_id}').json()
    assert product['quantity'] == 6

def test_order_insufficient_stock(client):
    prod_id = create_product(client, 'Lamp', 'LMP-001', '30.00', 2)
    cust_id = create_customer(client)
    response = client.post('/orders', json={
        'customer_id': cust_id,
        'items': [{'product_id': prod_id, 'quantity': 10}]
    })
    assert response.status_code == 400

def test_cancel_order_restores_stock(client):
    prod_id = create_product(client, 'Keyboard', 'KB-001', '60.00', 8)
    cust_id = create_customer(client)
    order = client.post('/orders', json={
        'customer_id': cust_id,
        'items': [{'product_id': prod_id, 'quantity': 3}]
    }).json()
    assert client.delete(f'/orders/{order["id"]}').status_code == 204
    product = client.get(f'/products/{prod_id}').json()
    assert product['quantity'] == 8
