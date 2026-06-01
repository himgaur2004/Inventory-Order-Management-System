from pydantic import BaseModel, EmailStr, field_validator
import re

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError('Name cannot be empty or whitespace only')
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        return v.strip()

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: str | None) -> str | None:
        if v is None or v == '':
            return v
        if not v.strip():
            raise ValueError('Phone cannot be whitespace only')
        # Allow only digits, spaces, hyphens, parentheses, and plus signs
        if not re.match(r'^[0-9+\-\s()]+$', v):
            raise ValueError('Phone must contain only numbers and valid phone characters')
        if len(v.strip()) < 10:
            raise ValueError('Phone must be at least 10 characters')
        return v.strip()

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None

class CustomerResponse(CustomerBase):
    id: int
    model_config = {'from_attributes': True}
