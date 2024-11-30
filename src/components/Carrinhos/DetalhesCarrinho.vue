<template>
    <div>
        <h2>Detalhes do Pedido #{{ carrinho.id }}</h2>
        <p><strong>Data:</strong> {{ formatarData(carrinho.date) }}</p>
        <h3>Produtos:</h3>
        <ul>
            <li v-for="produto in carrinho.products" :key="produto.productId">
                Produto ID: {{ produto.productId }} - Quantidade: {{ produto.quantity }}
            </li>
        </ul>
        <h3>Valor total:</h3>
        <p>R$ {{ calcularTotal(carrinho.products).toFixed(2) }}</p>
        <button @click="voltar">Voltar</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            carrinho: null,
        };
    },
    computed: {
        ...mapState(['carrinhos']),
    },
    methods: {
    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    },
    calcularTotal(produtos) {
        return produtos.reduce((total, produto) => {
            // Adicionando log para ver os dados de price e quantity
            console.log("Produto:", produto);
            const price = parseFloat(produto.price);
            const quantity = parseInt(produto.quantity, 10);

            // Verificar se price e quantity são números válidos
            if (isNaN(price) || isNaN(quantity)) {
                console.error("Produto com dados inválidos:", produto);
                return total;
            }

            // Verificando se os valores estão corretos
            console.log(`Preço: ${price}, Quantidade: ${quantity}, Total Parcial: ${price * quantity}`);

            return total + (price * quantity);
        }, 0);
    },
    voltar() {
        this.$router.push('/dashboard/carrinhos');
    },
},

    created() {
        const id = Number(this.$route.params.id);
        this.carrinho = this.carrinhos.find((c) => c.id === id);
        if (!this.carrinho) {
            console.error("Carrinho não encontrado!");
        }
    },
};
</script>

<style scoped>
/* Estilização principal */
div {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

/* Informações do pedido */
p {
  font-size: 16px;
  color: #555;
  margin: 10px 0;
}

p strong {
  color: #333;
}

/* Subtítulos */
h3 {
  font-size: 20px;
  color: #007bff;
  margin-top: 20px;
}

/* Lista de produtos */
ul {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

li {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

/* Valor total */
p:last-of-type {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  text-align: right;
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
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

/* Responsividade */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
  }

  li {
    font-size: 13px;
  }

  button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
