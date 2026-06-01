from pydantic import BaseModel, field_validator
from decimal import Decimal
from datetime import datetime
from .product import ProductResponse
from .customer import CustomerResponse

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

    @field_validator('quantity')
    @classmethod
    def quantity_positive(cls, v: int) -> int:
        if v <= 0:
            raise ValueError('Item quantity must be greater than 0')
        return v

class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemCreate]

    @field_validator('customer_id')
    @classmethod
    def customer_id_positive(cls, v: int) -> int:
        if v <= 0:
            raise ValueError('Invalid customer ID')
        return v

    @field_validator('items')
    @classmethod
    def items_not_empty(cls, v: list) -> list:
        if not v or len(v) == 0:
            raise ValueError('Order must contain at least one item')
        return v

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: Decimal
    product: ProductResponse
    model_config = {'from_attributes': True}

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: Decimal
    created_at: datetime
    customer: CustomerResponse
    items: list[OrderItemResponse]
    model_config = {'from_attributes': True}
