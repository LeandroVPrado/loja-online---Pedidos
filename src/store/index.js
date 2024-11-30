import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    produtos: [],
    categorias: [],
    carrinhos: [],
    usuarios: [],
    produtoDetalhado: null, // Produto que será exibido na página de detalhes
  },
  mutations: {
    setProdutos(state, produtos) {
      state.produtos = produtos;
    },
    setCategorias(state, categorias) {
      state.categorias = categorias;
    },
    setCarrinhos(state, carrinhos) {
      state.carrinhos = carrinhos;
    },
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    },
    setProdutoDetalhado(state, produto) {
      state.produtoDetalhado = produto;
    },
    adicionarUsuario(state, usuario) {
      state.usuarios.push(usuario);
    },
    atualizarUsuario(state, usuarioAtualizado) {
      const index = state.usuarios.findIndex((u) => u.id === usuarioAtualizado.id);
      if (index !== -1) {
        state.usuarios.splice(index, 1, usuarioAtualizado); // Atualiza o usuário no array
      }
    },
    removerUsuario(state, idUsuario) {
      state.usuarios = state.usuarios.filter((u) => u.id !== idUsuario);
    },
  },
  actions: {
    // Ações de produtos
    async fetchProdutos({ commit }) {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        commit('setProdutos', data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    async adicionarProduto({ commit }, produto) {
      try {
        const { data } = await axios.post('https://fakestoreapi.com/products', produto);  // Ajuste a URL conforme seu backend
        commit('setProdutos', [...this.state.produtos, data]);
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        throw error;
      }
    },
    async editarProduto({ commit }, produto) {
      try {
        const { data } = await axios.put(`https://fakestoreapi.com/products/${produto.id}`, produto);
        commit('setProdutos', this.state.produtos.map(p => (p.id === data.id ? data : p)));
      } catch (error) {
        console.error('Erro ao editar produto:', error);
        throw error;
      }
    },
    async removerProduto({ commit }, produtoId) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${produtoId}`);
        commit('setProdutos', this.state.produtos.filter(produto => produto.id !== produtoId));
      } catch (error) {
        console.error('Erro ao remover produto:', error);
        throw error;
      }
    },
    // Ações de cartegorias
    async fetchCategorias({ commit }) {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products/categories');
        commit('setCategorias', data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    },
    // Ações de pedidos
    async fetchCarrinhos({ commit, state }) {
      try {
          const { data: carrinhos } = await axios.get('https://fakestoreapi.com/carts');
          const produtos = state.produtos.length 
              ? state.produtos 
              : (await axios.get('https://fakestoreapi.com/products')).data;
  
          // Mapeia os carrinhos para incluir o preço nos produtos
          const carrinhosComPrecos = carrinhos.map((carrinho) => ({
              ...carrinho,
              products: carrinho.products.map((produto) => ({
                  ...produto,
                  price: produtos.find((p) => p.id === produto.productId)?.price || 0,
              })),
          }));
  
          commit('setCarrinhos', carrinhosComPrecos);
      } catch (error) {
          console.error('Erro ao buscar carrinhos:', error);
      }
    },
    async fetchProdutoDetalhado({ commit }, idProduto) {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${idProduto}`);
        commit('setProdutoDetalhado', data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    },

    // Ações de usuários
    async fetchUsuarios({ commit }) {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/users');
        commit('setUsuarios', data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    async adicionarUsuario({ commit }, usuario) {
      try {
        const { data } = await axios.post('https://fakestoreapi.com/users', usuario);
        commit('adicionarUsuario', data);
        return data;
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        throw error;
      }
    },
    async atualizarUsuario({ commit }, usuario) {
      try {
        const { data } = await axios.put(`https://fakestoreapi.com/users/${usuario.id}`, usuario);
        commit('atualizarUsuario', data);
        return data;
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }
    },
    async removerUsuario({ commit }, idUsuario) {
      try {
        await axios.delete(`https://fakestoreapi.com/users/${idUsuario}`);
        commit('removerUsuario', idUsuario);
      } catch (error) {
        console.error('Erro ao remover usuário:', error);
        throw error;
      }
    },
  },
  getters: {
    produtosPorCategoria: (state) => (categoria) => {
      return categoria
        ? state.produtos.filter((produto) => produto.category === categoria)
        : state.produtos;
    },
    produtosOrdenados: (state) => (criterio) => {
      const produtos = [...state.produtos];
      if (criterio === 'price-asc') {
        return produtos.sort((a, b) => a.price - b.price);
      } else if (criterio === 'price-desc') {
        return produtos.sort((a, b) => b.price - a.price);
      } else if (criterio === 'rating-asc') {
        return produtos.sort((a, b) => (a.rating?.rate || 0) - (b.rating?.rate || 0));
      } else if (criterio === 'rating-desc') {
        return produtos.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      }
      return produtos;
    },
  },
});

export default store;
