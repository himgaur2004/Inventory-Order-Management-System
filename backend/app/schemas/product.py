from pydantic import BaseModel, field_validator
from decimal import Decimal

class ProductBase(BaseModel):
    name: str
    sku: str
    price: Decimal
    quantity: int = 0

    @field_validator('name')
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError('Product name cannot be empty or whitespace only')
        if len(v.strip()) < 2:
            raise ValueError('Product name must be at least 2 characters')
        return v.strip()

    @field_validator('sku')
    @classmethod
    def sku_uppercase(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError('SKU cannot be empty or whitespace only')
        if len(v.strip()) < 1:
            raise ValueError('SKU must not be empty')
        return v.strip().upper()

    @field_validator('price')
    @classmethod
    def price_positive(cls, v: Decimal) -> Decimal:
        if v <= 0:
            raise ValueError('Price must be greater than 0')
        return v

    @field_validator('quantity')
    @classmethod
    def quantity_non_negative(cls, v: int) -> int:
        if v < 0:
            raise ValueError('Quantity cannot be negative')
        return v

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    price: Decimal | None = None
    quantity: int | None = None

class ProductResponse(ProductBase):
    id: int
    model_config = {'from_attributes': True}
