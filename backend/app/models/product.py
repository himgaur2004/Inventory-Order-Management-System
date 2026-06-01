from sqlalchemy import Column, Integer, String, Numeric, CheckConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True, nullable=False, index=True)
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False, default=0)

    __table_args__ = (
        CheckConstraint('quantity >= 0', name='quantity_non_negative'),
        CheckConstraint('price > 0', name='price_positive'),
    )

    order_items = relationship('OrderItem', back_populates='product')
