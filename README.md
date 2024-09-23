# Sistema de Montagem de PC

Sistema desenvolvido para a disciplina de Padrões de Projetos de Software Orientado a Objetos no IFPE.

Este projeto tem como objetivo fornecer uma plataforma para a montagem de computadores personalizados, permitindo aos usuários selecionar e combinar diferentes componentes de hardware, como CPU, GPU, memória, armazenamento, entre outros. O sistema utiliza diversos padrões de projeto para garantir flexibilidade, extensibilidade e manutenção do código, incluindo os padrões Strategy, Decorator, e Adapter.

Funcionalidades principais:
- Seleção de componentes de hardware (State e Adapter)
- Aplicação de cupons de desconto (Strategy e Factory)
- Cálculo do preço total do sistema
- Interface amigável para visualização e montagem do PC

Tecnologias usadas:
- Vue 3
- Vuetify 3
- Typescript

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto em sua máquina local:

### Pré-requisitos

- Baixar e instalar o [Node e NPM](https://nodejs.org/pt)

### Passo a Passo

1. **Clone o repositório**
   
   ```bash
   git clone https://github.com/seu-usuario/sistema-de-montagem-de-pc.git
   ```

2. **Instale as dependências**
   
   ```bash
   npm install
   ```

3. **Rodar o projeto**

    ```bash
    npm run dev
    ```

4. **Acesse a aplicação**
    
    Abra seu navegador e acesse `http://localhost:3000` para ver a aplicação em execução.