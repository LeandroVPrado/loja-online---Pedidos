# Loja Online - Dashboard

Este projeto é um painel administrativo para uma loja online, desenvolvido com **Vue.js 3** e consumindo a **API da Loja Falsa** ([FakeStoreAPI](https://fakestoreapi.com/)) para gerenciar produtos, carrinhos de compras e usuários. O painel permite a visualização, adição, atualização e exclusão de dados, além de funcionalidades de filtragem e ordenação.

## Funcionalidades do Projeto

### 1. **Consumo de API**

A aplicação interage com a **API da Loja Falsa** para realizar as seguintes operações:

- **/products**: 
  - Exibir todos os produtos.
  - Visualizar detalhes de um produto específico.
  - Filtrar e classificar produtos por preço e classificação.
  - Adicionar, atualizar e remover produtos.

- **/products/categories**: 
  - Listar e filtrar produtos por categoria.

- **/carts**:
  - Listar todos os carrinhos de compras (simulação de pedidos).
  - Visualizar detalhes de um pedido.
  - Filtrar carrinhos por data e/ou usuário.
  - Adicionar, atualizar e remover itens do carrinho.

- **/users**:
  - Listar todos os usuários.
  - Visualizar detalhes de um usuário específico.
  - Adicionar, atualizar e remover usuários.
  - Login (para acessar o painel com as credenciais fornecidas).

### 2. **Recursos do Painel**

- **Visão geral dos indicadores**:
  - Exibe um resumo na tela inicial com:
    - Total de produtos.
    - Número de categorias.
    - Quantidade de pedidos (com base nos carrinhos).
    - Número total de usuários.

- **Gestão de Produtos**:
  - Exibição de uma tabela com os produtos: Nome, Categoria, Preço, Classificação.
  - Filtros por categoria e ordenação por preço ou classificação.
  - Modal para visualizar detalhes de um produto e permitir edição ou exclusão.
  - Adição de novos produtos à loja.

- **Gestão de Carrinhos (Pedidos)**:
  - Tabela de pedidos, incluindo ID do pedido, data, valor total e status.
  - Detalhes do pedido, com lista de produtos e suas quantidades.
  - Edição e atualização de pedidos.

- **Gestão de Usuários**:
  - Tabela de usuários, incluindo nome, e-mail e cidade.
  - Função de pesquisa para encontrar usuários específicos.
  - Adição, edição ou remoção de usuários.

- **Autenticação**:
  - Tela de login para acessar o painel, utilizando o endpoint `/auth/login` da API.
  - Exibição de mensagem de erro caso o login seja inválido.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript para construção da interface do usuário.
- **Vue Router**: Gerenciamento das rotas do painel (produtos, carrinhos, usuários, login).
- **Vuex (ou Composition API)**: Gerenciamento de estado entre os componentes.
- **Axios (ou Fetch)**: Realização das requisições HTTP para consumir a API.
- **Vite**: Ferramenta de build e servidor de desenvolvimento.

## Como Rodar o Projeto

### 1. **Configuração do Projeto**

Clone o repositório:

```sh
git clone <https://github.com/LeandroVPrado/loja-online---Pedidos.git>

Navegue até o diretório do projeto:
cd loja-online

Instale as dependências:
npm install

2. Rodando a Aplicação em Desenvolvimento
Para rodar a aplicação localmente em modo de desenvolvimento:
npm run dev

3. Compilação para Produção
Para compilar o projeto para produção:
npm run build

Como Usar
Após rodar a aplicação, acesse o painel administrativo através da URL indicada no terminal.
Na tela de login, insira as credenciais fornecidas (usuário e senha).

Usuário: johnd
Senha: m38rmF$

Após o login, você terá acesso aos seguintes recursos:
Produtos: Visualizar, adicionar, editar e remover produtos.
Carrinhos: Visualizar, filtrar e editar pedidos.
Usuários: Visualizar, adicionar, editar e remover usuários.

Contribuindo
Sinta-se à vontade para contribuir com este projeto. Para isso, siga os seguintes passos:

Fork o repositório.
Crie uma branch para sua modificação (git checkout -b minha-modificacao).
Realize suas modificações.
Envie um pull request para o repositório principal.


Essa versão do `README.md` inclui:

1. **Descrição completa do projeto**: Explica o que o painel faz e como interage com a API.
2. **Tecnologias utilizadas**: Expõe as ferramentas e bibliotecas que foram usadas.
3. **Passos para rodar o projeto**: Inclui instruções para configuração e execução do projeto.
4. **Como usar o painel**: Descrição das funcionalidades principais do painel de administração.
5. **Instruções para contribuir**: Como outras pessoas podem ajudar no desenvolvimento do projeto.

Esse modelo de `README.md` ajudará a documentar bem o seu projeto para que qualquer pessoa possa entender o que ele faz e como usá-lo.

