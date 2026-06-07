# Biblioteca de Jogos

Um projeto simples feito com **Next.js** para listar e organizar uma coleção de jogos. Ele busca os dados de uma API, faz o tratamento das imagens e exibe tudo em uma interface organizada com cards e menu lateral.

## 🛠 O que usei
- **Next.js 15** (App Router)
- **TypeScript**
- **CSS Modules** (CSS puro, sem frameworks pesados)
- **Fetch API** para integração com os dados

## ⚙️ Como rodar na sua máquina

1. Clone o repositório.
2. No terminal, instale os pacotes necessários:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```
4. Abra `http://localhost:3000` no seu navegador.

## 🌐 Como os dados são buscados
Para evitar erros de carregamento e facilitar o controle, criei uma rota interna (`/api`) que funciona como uma ponte para a API real:
`<https://api-projeto-orpin.vercel.app/api>`

**Destaque:** No código, eu verifico se a URL da imagem vinda da API está completa. Se não estiver, o sistema adiciona o link base automaticamente para que nada fique quebrado na tela.

## 📁 Organização das pastas

src/
├── app/
│   ├── api/          # Rota de API para consumo de dados
│   └── layout.tsx    # Layout principal da aplicação
├── components/       # Componentes reutilizáveis
│   ├── cards/        # Grid de jogos e cards (CSS Modules)
│   └── slidebar/     # Menu lateral e navegação (CSS Modules)
└── styles/           # Variáveis globais e temas
```

---
Feito por Marlon.
