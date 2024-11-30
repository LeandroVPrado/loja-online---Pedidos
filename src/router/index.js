import { createRouter, createWebHistory } from 'vue-router';

// Importação dos componentes
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';


import DetalhesCarrinho from '../components/Carrinhos/DetalhesCarrinho.vue';
import ListaCarrinhos from '../components/Carrinhos/ListaCarrinhos.vue';

import DetalhesProdutos from '../components/Produtos/DetalhesProdutos.vue';
import FiltroProdutos from '../components/Produtos/FiltroProdutos.vue';
import ListaProdutos from '../components/Produtos/ListaProdutos.vue';
import AdicionarProduto from '../components/Produtos/AdicionarProduto.vue';
import DetalhesUsuario from '../components/Usuários/DetalhesUsuario.vue';
import ListaUsuarios from '../components/Usuários/ListaUsuarios.vue';
import FormularioUsuario from '../components/Usuários/FormularioUsuario.vue';

// Rotas do projeto
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/dashboard/produtos', name: 'ListaProdutos', component: ListaProdutos },
  { path: '/dashboard/produtos/filtro', name: 'FiltroProdutos', component: FiltroProdutos },
  { path: '/dashboard/produtos/:id', name: 'DetalhesProdutos', component: DetalhesProdutos },
  { path: '/dashboard/produtos/novo', name: 'AdicionarProduto', component: AdicionarProduto },
  { path: '/dashboard/produtos/:id/editar', name: 'EditarProduto', component: AdicionarProduto },

  { path: '/dashboard/carrinhos', name: 'ListaCarrinhos', component: ListaCarrinhos },
  { path: '/dashboard/carrinhos/:id', name: 'DetalhesCarrinho', component: DetalhesCarrinho },

  { path: '/dashboard/usuarios', name: 'ListaUsuarios', component: ListaUsuarios },
  { path: '/dashboard/usuarios/:id', name: 'DetalhesUsuario', component: DetalhesUsuario },
  { path: '/dashboard/usuarios/novo', name: 'AdicionarUsuario', component: FormularioUsuario },
  { path: '/dashboard/usuarios/:id/editar', name: 'EditarUsuario', component: FormularioUsuario },
  
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Redireciona para a Home
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
