from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import products, customers, orders
import app.database as db_module
import os


@asynccontextmanager
async def lifespan(app: FastAPI):
    db_module.Base.metadata.create_all(bind=db_module.engine)
    yield


app = FastAPI(
    title="Inventory & Order Management API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
