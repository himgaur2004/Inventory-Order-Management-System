# StockFlow — Inventory & Order Management

A full-stack inventory and order management system. Manage products, customers, and orders with real-time stock tracking.

**Stack:** React · FastAPI · PostgreSQL · Docker

---

## Getting Started

```bash
cp .env.example .env
# Edit .env and set your database credentials

docker compose up --build
```

- **Frontend:** http://localhost:3000  
- **Backend API:** http://localhost:8000  
- **Swagger docs:** http://localhost:8000/docs  

---

## Local Development

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Run tests
pytest tests/ -v

# Start dev server
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |
| `POSTGRES_HOST` | `db` inside Docker, `localhost` for local dev |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed frontend URLs |
| `VITE_API_URL` | Backend API URL (used at build time) |

---

## Deployment

### Backend → Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect the repo — Render will pick up `render.yaml` automatically
4. Set `ALLOWED_ORIGINS` to your Vercel frontend URL in the Render dashboard

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → Add New Project → Import from GitHub
2. Set the **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/products` | List all products |
| POST | `/products` | Create a product |
| PUT | `/products/{id}` | Update a product |
| DELETE | `/products/{id}` | Delete a product |
| GET | `/customers` | List all customers |
| POST | `/customers` | Create a customer |
| PUT | `/customers/{id}` | Update a customer |
| DELETE | `/customers/{id}` | Delete a customer |
| GET | `/orders` | List all orders |
| POST | `/orders` | Create an order (deducts stock) |
| DELETE | `/orders/{id}` | Cancel an order (restores stock) |
| GET | `/health` | Health check |

---

## Database Migrations

Alembic is configured and the initial migration is ready.

```bash
cd backend

# Apply migrations
alembic upgrade head

# Generate a migration after model changes
alembic revision --autogenerate -m "your description"
```
