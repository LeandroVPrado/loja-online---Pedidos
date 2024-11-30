<template>
  <div class="login">
    <!-- Barra de Navegação -->
    <nav class="nav-bar">
      <button @click="voltarParaHome" class="voltar-btn">Voltar para Home</button>
    </nav>

    <div class="login-container">
      <h1>
        Acesso ao Painel
        <img class="logo-inline" src="@/assets/imagens/Dashboard.png" alt="Dashboard" />
      </h1>
      <form @submit.prevent="fazerLogin" class="login-form">
        <div class="form-group">
          <label for="username">Usuário</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" v-model="senha" required />
        </div>
        <button type="submit" class="login-btn">Entrar</button>
        <p v-if="erro" class="erro">{{ erro }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      senha: "",
      erro: null,
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const { data } = await axios.post(
          "https://fakestoreapi.com/auth/login",
          {
            username: this.username,
            password: this.senha,
          }
        );
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.$router.push("/dashboard");
        }
      } catch {
        this.erro = "Usuário ou senha inválidos.";
      }
    },
    voltarParaHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Estilo geral */
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #007bff, #6c63ff);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Login container */
.login-container {
  background: #fff;
  color: #333;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

/* Título */
h1 {
  font-size: 1.8em;
  margin-bottom: 20px;
  color: #007bff;
}

.logo-inline {
  width: 50px;
  margin-top: 10px;
}

/* Formulário */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Grupos do formulário */
.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #007bff;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
}

/* Botão */
.login-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #0056b3;
}

/* Barra de navegação */
.nav-bar {
  position: absolute;
  top: 10px;
  left: 10px;
}

.voltar-btn {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s ease, color 0.3s ease;
}

.voltar-btn:hover {
  background: #fff;
  color: #007bff;
}

/* Mensagem de erro */
.erro {
  color: red;
  font-size: 0.9em;
}

/* Responsividade */
@media (max-width: 768px) {
  .login-container {
    width: 95%;
    padding: 20px;
  }

  h1 {
    font-size: 1.5em;
  }

  .logo-inline {
    width: 40px;
  }

  .login-btn {
    font-size: 0.9em;
  }

  .voltar-btn {
    font-size: 0.8em;
  }
}
</style>
