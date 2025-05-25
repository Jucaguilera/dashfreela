#  Dashboard Financeiro do Freelancer

Este é um sistema completo para autônomos e freelancers gerenciarem suas finanças, acompanhando receitas, despesas e saldo acumulado ao longo do tempo.

##  Funcionalidades
-  Registro de receitas e despesas com data específica
-  Cálculo automático do saldo acumulado
-  Visualização gráfica do saldo ao longo do tempo (agora exibindo variação **diária**!)
-  Atualização automática ao adicionar ou excluir transações
-  Interface moderna e responsiva
-  Controle do saldo inicial no banco, sem necessidade de exclusão manual de transações anteriores

## 🛠 Tecnologias Utilizadas
- **Frontend:** React + Recharts
- **Backend:** FastAPI
- **Banco de Dados:** SQLite
- **Estilização:** CSS básico e componentes customizados

##  Instalação e Execução

###  Pré-requisitos
- Node.js e npm instalados para o frontend
- Python 3.x instalado para o backend
- (Opcional) Virtualenv ou venv para isolar dependências do backend

###  Passos

1 Clone o repositório:
```bash
git clone https://github.com/Jucaguilera/dashfreela.git
cd dashfreela

2 Configure e rode o backend:

bash
Copiar
Editar
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install fastapi uvicorn
pip install -r requirements.txt  # Se tiver um arquivo requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
3 Configure e rode o frontend:

bash
Copiar
Editar
cd ../frontend
npm install
npm start
4 Acesse a aplicação:

Frontend: http://localhost:3000

Backend (API): http://localhost:8000/docs

🔗 Acesse o Projeto Online
Caso eu disponibilize a hospedagem futuramente, o link será disponibilizado aqui!

👨‍💻 Autor
Desenvolvido por Juca Aguilera como um projeto pessoal para aprimorar habilidades de desenvolvimento Full Stack e ajudar freelancers a controlarem melhor suas finanças.

yaml
Copiar
Editar

