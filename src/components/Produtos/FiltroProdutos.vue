<template>
    <div>
        <h2>Filtros</h2>
        <div>
            <label for="categoria">Categoria: </label>
            <select id="categoria" v-model="categoriaSelecionada" @change="emitirFiltro">
                <option value="">Todas</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
            </select>
        </div>
        <div>
            <label for="ordenar">Ordenar por:</label>
            <select id="ordenar" v-model="criterioOrdenacao" @change="emitirOrdenacao">
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating-asc">Classificação: Menor para Maior</option>
                <option value="rating-desc">Classificação: Maior para Menor</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        categorias: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            categoriaSelecionada: '', // Categoria escolhida pelo usuário
            criterioOrdenacao: 'price-asc', // Critério de ordenação padrão
        };
    },
    methods: {
        emitirFiltro() {
            this.$emit('filtrar', this.categoriaSelecionada); // Emite o evento de filtro
        },
        emitirOrdenacao() {
            this.$emit('ordenar', this.criterioOrdenacao); // Emite o evento de ordenação
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
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Título da seção */
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Estilo dos rótulos */
label {
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-right: 10px;
}

/* Estilo dos selects */
select {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  outline: none;
}

/* Espaçamento entre os filtros */
div > div {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Responsividade para telas pequenas */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  label {
    font-size: 14px;
  }

  select {
    font-size: 14px;
    max-width: 100%;
  }

  div > div {
    align-items: stretch;
  }
}
</style>

