from fastapi import FastAPI
from database import init_db, add_transaction, get_transactions, remove_transaction
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date


# Inicializa o banco de dados
init_db()

# Inicia a API
app = FastAPI()

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem (substitua por ["http://localhost:3000"] para mais segurança)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionCreate(BaseModel):
    type: str  # "receita" ou "despesa"
    description: str
    amount: float
    date: date

class TransactionResponse(TransactionCreate):
    id: int

@app.post("/transactions/", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate):
    add_transaction(transaction.type, transaction.description, transaction.amount, str(transaction.date))
    
    transactions = get_transactions()
    last_transaction = transactions[-1] if transactions else None
    
    return {
        "id": last_transaction[0],
        "type": last_transaction[1],
        "description": last_transaction[2],
        "amount": last_transaction[3],
        "date": last_transaction[4]
    }

@app.get("/transactions/", response_model=List[TransactionResponse])
def list_transactions():
    transactions = get_transactions()
    
    return [
        {"id": t[0], "type": t[1], "description": t[2], "amount": t[3], "date": t[4]}
        for t in transactions
    ]
from fastapi import HTTPException

@app.delete("/transactions/{transaction_id}/")
def delete_transaction(transaction_id: int):
    """Deleta uma transação pelo ID"""
    success = remove_transaction(transaction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Transação não encontrada")
    return {"message": "Transação excluída com sucesso"}
