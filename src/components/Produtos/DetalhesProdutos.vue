<template>
  <div>
    <h2>{{ produto.title }}</h2>
    <img :src="produto.image" :alt="produto.title" width="150" />
    <p><strong>Preço:</strong> R$ {{ produto.price.toFixed(2) }}</p>
    <p><strong>Categoria:</strong> {{ produto.category }}</p>
    <p><strong>Descrição:</strong> {{ produto.description }}</p>
    <p><strong>Classificação:</strong> {{ produto.rating.rate }} ({{ produto.rating.count }} avaliações)</p>
    <button @click="fechar">Fechar</button>
  </div>
</template>

<script>
export default {
  props: {
    produto: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  methods: {
    fechar() {
      this.onClose();
    },
  },
};
</script>

<style scoped>
/* Container principal */
div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título do produto */
h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Imagem do produto */
img {
  width: 100%;
  max-width: 150px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
  object-fit: cover;
}

/* Estilo para os detalhes do produto (preço, categoria, descrição) */
p {
  font-size: 16px;
  color: #555;
  margin: 8px 0;
}

/* Estilo para negrito */
strong {
  font-weight: 600;
  color: #333;
}

/* Estilo do botão fechar */
button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

/* Responsividade para telas pequenas */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 22px;
  }

  p {
    font-size: 14px;
  }

  button {
    font-size: 14px;
    padding: 10px 18px;
  }
}
</style>
