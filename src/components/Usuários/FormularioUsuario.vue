<template>
    <div>
      <h2>{{ usuario.id ? 'Editar Usuário' : 'Adicionar Usuário' }}</h2>
      <form @submit.prevent="salvarUsuario">
        <label for="nome">Nome</label>
        <input
          id="nome"
          type="text"
          v-model="usuario.name.firstname"
          required
        />
  
        <label for="sobrenome">Sobrenome</label>
        <input
          id="sobrenome"
          type="text"
          v-model="usuario.name.lastname"
          required
        />
  
        <label for="email">Email</label>
        <input id="email" type="email" v-model="usuario.email" required />
  
        <label for="cidade">Cidade</label>
        <input id="cidade" type="text" v-model="usuario.address.city" required />
  
        <label for="rua">Rua</label>
        <input id="rua" type="text" v-model="usuario.address.street" required />
  
        <button type="submit">
          {{ usuario.id ? 'Salvar Alterações' : 'Adicionar Usuário' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usuario: {
          name: { firstname: '', lastname: '' },
          email: '',
          address: { city: '', street: '' },
        },
      };
    },
    created() {
      if (this.$route.params.id) {
        const id = Number(this.$route.params.id);
        const usuarioExistente = this.$store.state.usuarios.find(
          (u) => u.id === id
        );
        if (usuarioExistente) {
          this.usuario = JSON.parse(JSON.stringify(usuarioExistente));
        }
      }
    },
    methods: {
      async salvarUsuario() {
        if (this.usuario.id) {
          // Atualizar usuário existente
          await this.$store.dispatch('atualizarUsuario', this.usuario);
        } else {
          // Adicionar novo usuário
          await this.$store.dispatch('adicionarUsuario', this.usuario);
        }
        this.$router.push('/dashboard/usuarios');
      },
    },
  };
  </script>
  
  <style scoped>
/* Container principal */
div {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Título */
h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Estilo dos labels */
label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  margin-top: 10px;
}

/* Estilo dos campos de input */
input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 16px;
  background-color: #fff;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff; /* cor principal do projeto */
  outline: none;
}

/* Estilo do botão */
button {
  width: 100%;
  padding: 14px;
  background-color: #007bff; /* cor principal do projeto */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* cor principal mais escura */
}

/* Responsividade */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 22px;
  }

  input {
    font-size: 14px;
  }

  button {
    font-size: 14px;
  }
}
</style>
