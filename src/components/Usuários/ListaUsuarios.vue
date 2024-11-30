<template>
  <div>
    <!-- Barra de Navegação com botão voltar para Dashboard -->
    <nav>
      <button @click="voltarParaDashboard">Voltar ao Dashboard</button>
    </nav>

    <h2>Lista de Usuários</h2>
    <button @click="adicionarUsuario">Adicionar Usuário</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.name.firstname }} {{ usuario.name.lastname }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <button @click="verDetalhes(usuario.id)">Ver Detalhes</button>
            <button @click="editarUsuario(usuario.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['usuarios']),
  },
  methods: {
    verDetalhes(id) {
      this.$router.push(`/dashboard/usuarios/${id}`);
    },
    adicionarUsuario() {
      this.$router.push('/dashboard/usuarios/novo');
    },
    editarUsuario(id) {
      this.$router.push(`/dashboard/usuarios/${id}/editar`);
    },
    voltarParaDashboard() {
      this.$router.push('/dashboard');
    },
  },
  created() {
    if (!this.usuarios.length) {
      this.$store.dispatch('fetchUsuarios');
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
h1, h2 {
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

/* Responsividade */
@media screen and (max-width: 768px) {
    table {
        font-size: 12px;
    }

    th, td {
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