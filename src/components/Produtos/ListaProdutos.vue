<template>
  <div>
    <!-- Barra de Navegação com botão voltar para Dashboard -->
    <nav>
      <button @click="voltarParaDashboard">Voltar ao Dashboard</button>
    </nav>

    <h1>Lista de Produtos</h1>

    <!-- Filtro de Produtos -->
    <FiltroProdutos :categorias="categorias" @filtrar="aplicarFiltro" @ordenar="aplicarOrdenacao" />
    <!-- Botão Adicionar Produto -->
    <button data-action="adicionar" @click="abrirFormularioAdicionar">Adicionar Produto</button>


    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Classificação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtosFiltrados" :key="produto.id">
          <td>{{ produto.title }}</td>
          <td>{{ produto.category }}</td>
          <td>R$ {{ produto.price.toFixed(2) }}</td>
          <td>{{ produto.rating.rate }} ({{ produto.rating.count }} avaliações)</td>
          <td>
            <button @click="abrirDetalhes(produto)">Ver Detalhes</button>
            <button @click="editarProduto(produto)">Editar</button>
            <button @click="removerProduto(produto.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Detalhes -->
    <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharDetalhes">
      <div class="modal-content">
        <DetalhesProdutos :produto="produtoSelecionado" :onClose="fecharDetalhes" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FiltroProdutos from './FiltroProdutos.vue';
import DetalhesProdutos from './DetalhesProdutos.vue';

export default {
  components: { FiltroProdutos, DetalhesProdutos },
  data() {
    return {
      produtoSelecionado: null,
      categoriaSelecionada: '',
      criterioOrdenacao: 'price-asc',
      produtosFiltrados: [],
      categorias: [],
    };
  },
  computed: {
    ...mapState(['produtos']),
  },
  watch: {
    produtos: {
      immediate: true,
      handler() {
        this.produtosFiltrados = [...this.produtos];
        this.carregarCategorias();
      },
    },
  },
  methods: {
    async removerProduto(produtoId) {
      try {
        await this.$store.dispatch('removerProduto', produtoId);
        alert('Produto removido com sucesso!');
      } catch (error) {
        console.error('Erro ao remover produto:', error);
      }
    },
    aplicarFiltro(categoria) {
      this.categoriaSelecionada = categoria;
      this.aplicarFiltrosEOrdenacao();
    },
    aplicarOrdenacao(criterio) {
      this.criterioOrdenacao = criterio;
      this.aplicarFiltrosEOrdenacao();
    },
    aplicarFiltrosEOrdenacao() {
      let produtos = [...this.produtos];

      if (this.categoriaSelecionada) {
        produtos = produtos.filter((produto) => produto.category === this.categoriaSelecionada);
      }

      if (this.criterioOrdenacao === 'price-asc') {
        produtos.sort((a, b) => a.price - b.price);
      } else if (this.criterioOrdenacao === 'price-desc') {
        produtos.sort((a, b) => b.price - a.price);
      } else if (this.criterioOrdenacao === 'rating-asc') {
        produtos.sort((a, b) => a.rating.rate - b.rating.rate);
      } else if (this.criterioOrdenacao === 'rating-desc') {
        produtos.sort((a, b) => b.rating.rate - a.rating.rate);
      }

      this.produtosFiltrados = produtos;
    },
    carregarCategorias() {
      const categorias = [...new Set(this.produtos.map(produto => produto.category))];
      this.categorias = categorias;
    },
    abrirDetalhes(produto) {
      this.produtoSelecionado = produto;
    },
    fecharDetalhes() {
      this.produtoSelecionado = null;
    },
    voltarParaDashboard() {
      this.$router.push('/dashboard');
    },
    abrirFormularioAdicionar() {
      // Lógica para abrir o formulário de adicionar produto
      // Pode ser um modal ou uma navegação para outra página
      this.$router.push('/dashboard/produtos/novo'); // Exemplo de navegação
    },
    editarProduto(produto) {
      this.$router.push(`/dashboard/produtos/${produto.id}/editar`);
    },
  },
  created() {
    if (this.produtos.length === 0) {
      this.$store.dispatch('fetchProdutos');
    }
  },
};
</script>

<style scoped>
/* Estilos globais para as páginas de lista */

/* Navegação */
nav {
  background-color: #f4f4f4;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

nav button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #0056b3;
}

/* Títulos */
h1,
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

/* Tabelas */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

thead {
  background-color: #f8f9fa;
}

th {
  background-color: #f1f3f5;
  color: #495057;
  font-weight: 600;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
}

tbody tr {
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

td {
  padding: 12px;
  color: #495057;
  font-size: 14px;
}

/* Botões de Ação */
td button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

td button:hover {
  background-color: #0056b3;
}

td button:last-child {
  background-color: #28a745;
}

td button:last-child:hover {
  background-color: #218838;
}

/* Botão Adicionar Usuário */
button[data-action="adicionar"] {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
}

button[data-action="adicionar"]:hover {
  background-color: #218838;
}

/* Modal de Detalhes */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
}

/* Botão Adicionar Produto */
button[data-action="adicionar"] {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
}

button[data-action="adicionar"]:hover {
  background-color: #218838;
}


/* Responsividade */
@media screen and (max-width: 768px) {
  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px;
  }

  nav {
    flex-direction: column;
  }

  nav button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>