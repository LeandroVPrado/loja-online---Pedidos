<template>
    <div v-if="usuario">
        <h2>Detalhes do Usuário</h2>
        <p><strong>Nome:</strong> {{ usuario.name.firstname }} {{ usuario.name.lastname }}</p>
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Cidade:</strong> {{ usuario.address.city }}</p>
        <p><strong>Rua:</strong> {{ usuario.address.street }}</p>
        <button @click="voltar">Voltar</button>
    </div>
    <div v-else-if="carregando">
        <p>Carregando usuário...</p>
    </div>
    <div v-else>
        <p>Usuário não encontrado!</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: null,
            carregando: true, // Estado para o carregamento
        };
    },
    created() {
        const id = Number(this.$route.params.id);
        // Verifique se os usuários estão carregados ou não
        this.$store.dispatch('fetchUsuarios')
            .then(() => {
                this.usuario = this.$store.state.usuarios.find((u) => u.id === id);
                this.carregando = false;
                if (!this.usuario) {
                    console.error("Usuário não encontrado!");
                }
            })
            .catch((error) => {
                this.carregando = false;
                console.error("Erro ao buscar usuários:", error);
            });
    },
    methods: {
        voltar() {
            this.$router.push('/dashboard/usuarios');
        },
    },
};
</script>

<style scoped>
/* Estilização principal */
div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Título principal */
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

/* Informações do usuário */
p {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

p strong {
  color: #333;
  font-weight: bold;
}

/* Mensagem de carregamento ou erro */
p:last-child {
  text-align: center;
  font-size: 16px;
  color: #888;
}

/* Botão de voltar */
button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

/* Responsividade */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
