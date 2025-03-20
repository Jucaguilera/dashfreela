import sqlite3

DB_NAME = "finance.db"

def init_db():
    """Cria o banco de dados e a tabela transactions, caso não exista"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()

def add_transaction(type, description, amount, date):
    """Adiciona uma nova transação ao banco de dados"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO transactions (type, description, amount, date) VALUES (?, ?, ?, ?)",
                   (type, description, amount, date))
    
    conn.commit()
    conn.close()

def get_transactions():
    """Retorna todas as transações do banco de dados"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM transactions ORDER BY date ASC")
    transactions = cursor.fetchall()
    
    conn.close()
    return transactions
def remove_transaction(transaction_id):
    """Remove uma transação do banco de dados pelo ID"""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM transactions WHERE id = ?", (transaction_id,))
    conn.commit()

    rows_affected = cursor.rowcount  # Verifica quantas linhas foram afetadas
    conn.close()

    return rows_affected > 0  # Retorna True se excluiu, False se não encontrou



