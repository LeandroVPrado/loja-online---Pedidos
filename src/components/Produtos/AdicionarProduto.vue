<template>
  <div>
    <h2>Adicionar Produto</h2>
    <form @submit.prevent="adicionarProduto">
      <!-- Campos do formulário -->
      <div>
        <label for="titulo">Título:</label>
        <input id="titulo" v-model="produto.title" required />
      </div>
      <div>
        <label for="imagem">Imagem (URL):</label>
        <input id="imagem" v-model="produto.image" required />
      </div>
      <div>
        <label for="preco">Preço:</label>
        <input id="preco" type="number" step="0.01" v-model="produto.price" required />
      </div>
      <div>
        <label for="categoria">Categoria:</label>
        <input id="categoria" v-model="produto.category" required />
      </div>
      <div>
        <label for="descricao">Descrição:</label>
        <textarea id="descricao" v-model="produto.description" required></textarea>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produto: {
        title: '',
        image: '',
        price: 0,
        category: '',
        description: '',
      },
    };
  },
  created() {
    const produtoId = this.$route.params.id;
    if (produtoId) {
      this.carregarProduto(produtoId); // Carregar produto se estiver editando
    }
  },
  methods: {
    async carregarProduto(id) {
      try {
        const produto = this.$store.state.produtos.find(
          (p) => p.id.toString() === id.toString() // Garantir que os tipos coincidam
        );
        if (produto) {
          this.produto = { ...produto }; // Preenche o formulário com os dados existentes
        }
      } catch (error) {
        console.error('Erro ao carregar produto para edição:', error);
      }
    },
    async adicionarProduto() {
      try {
        // Chamando ação do Vuex para adicionar o produto
        await this.$store.dispatch('adicionarProduto', this.produto);
        alert('Produto adicionado com sucesso!');
        this.$router.push('/dashboard/produtos'); // Redireciona após sucesso
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    },
    async editarProduto() {
      try {
        await this.$store.dispatch('editarProduto', this.produto);
        alert('Produto editado com sucesso!');
        this.$router.push('/dashboard/produtos'); // Redireciona após sucesso
      } catch (error) {
        console.error('Erro ao editar produto:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Container principal */
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Título do formulário */
h2 {
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
}

/* Estilos para o formulário */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Estilo dos rótulos */
label {
  font-size: 14px;
  font-weight: 500;
  color: #495057;
}

/* Estilo dos campos de input */
input, textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  border-color: #007bff;
}

/* Estilo específico para o campo de preço */
input[type="number"] {
  width: 100%;
}

/* Estilo para a área de texto (descrição) */
textarea {
  resize: vertical;
  min-height: 120px;
}

/* Estilo do botão de envio */
button {
  background-color: #28a745;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}

/* Responsividade para telas pequenas */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  input, textarea, button {
    font-size: 16px;
  }
}
</style>
