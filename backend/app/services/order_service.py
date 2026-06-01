from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.customer import Customer
from app.schemas.order import OrderCreate
from decimal import Decimal

def create_order(db: Session, order_data: OrderCreate) -> Order:
    customer = db.get(Customer, order_data.customer_id)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Customer {order_data.customer_id} not found'
        )

    product_map = {}
    for item in order_data.items:
        product = db.get(Product, item.product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f'Product {item.product_id} not found'
            )
        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f'Insufficient stock for {product.name}. '
                    f'Requested: {item.quantity}, Available: {product.quantity}'
                )
            )
        product_map[item.product_id] = product

    # 3. Create the order
    order = Order(customer_id=order_data.customer_id, total_amount=Decimal('0'))
    db.add(order)
    db.flush()

    # 4. Create order items, deduct stock, calculate total
    total = Decimal('0')
    for item_data in order_data.items:
        product = product_map[item_data.product_id]
        unit_price = product.price

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item_data.quantity,
            unit_price=unit_price,
        )
        db.add(order_item)

        # Deduct stock
        product.quantity -= item_data.quantity
        total += unit_price * item_data.quantity

    # 5. Set calculated total
    order.total_amount = total
    db.commit()
    db.refresh(order)
    return order

def delete_order(db: Session, order_id: int) -> None:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail='Order not found')

    # Restore stock for each item
    for item in order.items:
        product = db.get(Product, item.product_id)
        if product:
            product.quantity += item.quantity

    db.delete(order)
    db.commit()
