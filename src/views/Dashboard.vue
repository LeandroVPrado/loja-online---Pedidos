<template>
    <div class="dashboard">
      <nav>
        <ul>
          <li><button @click="sair">Sair</button></li>
        </ul>
      </nav>
  
      <h1>
        Painel de Controle
        <img class="logo-inline" src="@/assets/imagens/Dashboard.png" alt="Dashboard" />
      </h1>
  
      <section class="indicadores" v-if="carregando">
        <p>Carregando dados...</p>
      </section>
  
      <section class="indicadores" v-else>
        <div>
          <h3>Total de Produtos</h3>
          <p>{{ produtos.length }}</p>
          <button @click="irPara('produtos')">Ver Produtos</button>
        </div>
        <div>
          <h3>Quantidade de Categorias</h3>
          <p>{{ categorias.length }}</p>
        </div>
        <div>
          <h3>Total de Pedidos</h3>
          <p>{{ carrinhos.length }}</p>
          <button @click="irPara('carrinhos')">Ver Pedidos</button>
        </div>
        <div>
          <h3>Total de Usuários</h3>
          <p>{{ usuarios.length }}</p>
          <button @click="irPara('usuarios')">Ver Usuários</button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        carregando: true,
      };
    },
    computed: {
      ...mapState(['produtos', 'categorias', 'carrinhos', 'usuarios']),
    },
    methods: {
      irPara(tipo) {
        switch (tipo) {
          case 'produtos':
            this.$router.push('/dashboard/produtos');
            break;
          case 'carrinhos':
            this.$router.push('/dashboard/carrinhos');
            break;
          case 'usuarios':
            this.$router.push('/dashboard/usuarios');
            break;
          default:
            break;
        }
      },
      sair() {
        // Aqui você pode adicionar lógica para logout, como limpar os dados de sessão
        this.$router.push('/login');
      },
    },
    created() {
      // Carregando os dados ao inicializar
      if (this.produtos.length === 0) {
        this.$store.dispatch('fetchProdutos');
      }
      if (this.categorias.length === 0) {
        this.$store.dispatch('fetchCategorias');
      }
      if (this.carrinhos.length === 0) {
        this.$store.dispatch('fetchCarrinhos');
      }
      if (this.usuarios.length === 0) {
        this.$store.dispatch('fetchUsuarios');
      }
      this.carregando = false;
    },
  };
  </script>
  
  <style scoped>
/* Estilo geral */
.dashboard {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f4f7fa; /* Fundo principal */
  color: #333; /* Cor de texto */
  min-height: 100vh;
  box-sizing: border-box;
}

/* Navegação */
nav {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  display: inline;
}

nav button {
  background-color: #007bff; /* Azul principal do projeto */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #0056b3; /* Azul escuro */
}

/* Título */
h1 {
  font-size: 28px;
  font-weight: bold;
  color: #007bff; /* Azul principal */
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-inline {
  height: 40px;
}

/* Indicadores */
.indicadores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.indicadores div {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
}

.indicadores h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.indicadores p {
  font-size: 24px;
  font-weight: bold;
  color: #007bff; /* Azul principal */
}

.indicadores button {
  margin-top: 10px;
  background-color: #007bff; /* Azul principal */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicadores button:hover {
  background-color: #0056b3; /* Azul escuro */
}

/* Responsividade */
@media (max-width: 600px) {
  .dashboard {
    padding: 15px;
  }

  h1 {
    font-size: 24px;
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    justify-content: center;
  }

  nav button {
    width: 100%;
    padding: 10px;
  }

  .indicadores {
    grid-template-columns: 1fr;
  }
}
</style>
