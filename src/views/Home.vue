<template>
    <div>
      <nav>
        <ul>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
      </nav>
  
      <h1>
        Bem-vindo ao Dashboard
        <img class="logo-inline" src="@/assets/imagens/Dashboard.png" alt="Dashboard" />
      </h1>
      <p class="texto">
        "Ao acessar o dashboard, você ganha total controle sobre as informações e funcionalidades do sistema. <br>
        Tudo fica ao seu alcance, desde a visualização de dados até a gestão completa das operações. <br>
        A plataforma oferece uma experiência intuitiva e organizada, permitindo que você tome decisões mais rápidas e assertivas. <br>
        Com o poder de controlar tudo a partir de um único painel, você pode acompanhar o progresso, gerenciar tarefas e otimizar processos com facilidade e eficiência."
      </p>
  
      <section class="redes-sociais">
        <h2>Conecte-se Conosco</h2>
        <a href="https://www.instagram.com/" target="_blank" class="social-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram">
        </a>
        <a href="https://www.facebook.com/" target="_blank" class="social-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook">
        </a>
        <a href="https://www.linkedin.com/" target="_blank" class="social-icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg" alt="LinkedIn">
        </a>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  /* Estilo geral */
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }
  
  /* Navegação */
  nav ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    background-color: #007bff;
    padding: 10px 20px;
    margin: 0;
  }
  
  nav li {
    margin-left: 20px;
  }
  
  nav a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  nav a:hover {
    color: #f0f0f0;
  }
  
  /* Cabeçalho */
  h1 {
    text-align: center;
    font-size: 2.5em;
    margin: 20px 0;
    color: #007bff;
  }
  
  .logo-inline {
    width: 50px;
    margin-left: 10px;
    vertical-align: middle;
  }
  
  /* Texto */
  .texto {
    text-align: center;
    font-size: 1.2em;
    color: #333;
    margin: 20px auto;
    padding: 0 15px;
    animation: fadeIn 3s ease-out;
  }
  
  /* Redes sociais */
  .redes-sociais {
    text-align: center;
    margin: 30px 0;
  }
  
  .redes-sociais h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
    color: #007bff;
  }
  
  .social-icon {
    display: inline-block;
    margin: 10px;
    transition: transform 0.3s, filter 0.3s;
  }
  
  .social-icon img {
    width: 50px;
    height: 50px;
  }
  
  .social-icon:hover {
    transform: scale(1.2);
    filter: brightness(1.3);
  }
  
  /* Animação */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    h1 {
      font-size: 2em;
    }
  
    .texto {
      font-size: 1em;
    }
  
    .social-icon img {
      width: 40px;
      height: 40px;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.5em;
    }
  
    .texto {
      font-size: 0.9em;
    }
  
    .social-icon img {
      width: 30px;
      height: 30px;
    }
  }
  </style>
  