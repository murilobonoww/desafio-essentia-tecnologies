# TaskMaster 🚀

Gerencie suas tarefas com simplicidade e estilo. Um app de lista de tarefas moderno, com autenticação, filtros por status e prioridade, busca, data de vencimento e criação de tarefas intuitiva.

## Funcionalidades Principais

- Autenticação (login / registro)
- Criação, edição e exclusão de tarefas
- Filtros por status (pendente / concluída) e prioridade (baixa, média, alta, urgente)
- Busca em tempo real por título
- Data de vencimento com datepicker
- Navbar condicional (somente aparece quando logado)
- Interface limpa e responsiva com gradientes e ícones Lucide

## Tecnologias Utilizadas

- **Frontend**: Angular 21+ (standalone components)
- **Estilização**: CSS puro + Angular Material
- **Ícones**: Lucide Icons
- **Autenticação**: HttpOnly cookies + JWT
- **Gerenciamento de estado**: Signals + serviços
- **Backend** Node.js com Express e TypeScript

## Pré-requisitos

- Node.js ≥ 18.0
- npm ≥ 9.0 (ou yarn / pnpm)
- Git
- Docker

## Como Rodar o Projeto (Passo a Passo)

### 1. Clone o repositório

git clone https://github.com/murilobonoww/desafio-essentia-tecnologies.git

### 2. Instale as dependências

npm install

### No backend, crie um arquivo .env na raíz do projeto com estas variáveis:

DATABASE_URL="mysql://root:root@localhost:3307/techx"
JWT_SECRET= (gere um segredo forte e único para seu ambiente)

### Abra uma janela do terminal, vá nesta mesma pasta do backend e rode:

docker compose up -d

#Este comando irá rodar o banco de dados no docker

### Inicie os servidores frontend e backend com este comando em ambos:
npm run dev

### O projeto está rodando 🎉 Agora basta apenas abrir o navegador e colar esta url: http://localhost:4200/.

### Criado por: Murilo Bonow
### E-mail: murilobonow07@gmail.com
### Whatsapp: (48) 99225-4888
