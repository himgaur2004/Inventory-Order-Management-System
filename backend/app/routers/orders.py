from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order_service import create_order, delete_order

router = APIRouter(prefix='/orders', tags=['Orders'])

@router.get('/', response_model=list[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@router.get('/{order_id}', response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail='Order not found')
    return order

@router.post('/', response_model=OrderResponse, status_code=201)
def place_order(data: OrderCreate, db: Session = Depends(get_db)):
    return create_order(db, data)

@router.delete('/{order_id}', status_code=204)
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    delete_order(db, order_id)
