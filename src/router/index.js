import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

//  Widgets Components
import mainView from '../mainView'

import login from '../views/login'
import usuarios from '../views/usuarios/index'
import registrarUsuario from '../views/usuarios/registrar'
import editarUsuario from '../views/usuarios/editar'
import noticias from '../views/noticias/index'
import registrarNoticia from '../views/noticias/registrar'
import editarNoticia from '../views/noticias/editar'
import categorias from '../views/categorias/index'
import registrarCategoria from '../views/categorias/registrar'
import editarCategoria from '../views/categorias/editar'
import informacionFinanciera from '../views/informacion_financiera/index'
import registrarInformacionFinanciera from '../views/informacion_financiera/registrar'
import editarInformacionFinanciera from '../views/informacion_financiera/editar'
import paginas from '../views/paginas/index'
import editarPagina from '../views/paginas/editar'
import testimonios from '../views/testimonios/index'
import registrarTestimonio from '../views/testimonios/registrar'
import editarTestimonio from '../views/testimonios/editar'
import accesoSSO from '../views/sso/acceso'

Vue.use(Router)

let router = new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/noticias',
    component: mainView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/usuarios',
        name: 'usuarios',
        component: usuarios,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/usuarios/registrar',
        name: 'registrarUsuario',
        component: registrarUsuario,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/usuarios/editar/:iduser',
        name: 'editarUsuario',
        component: editarUsuario,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/noticias',
        name: 'noticias',
        component: noticias,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/noticias/registrar',
        name: 'registrarNoticia',
        component: registrarNoticia
      },
      {
        path: '/noticias/editar/:idnot',
        name: 'editarNoticia',
        component: editarNoticia,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/categorias',
        name: 'categorias',
        component: categorias,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/categorias/registrar',
        name: 'registrarCategoria',
        component: registrarCategoria,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/categorias/editar/:idcat',
        name: 'editarCategoria',
        component: editarCategoria,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/informacion_financiera',
        name: 'informacionFinanciera',
        component: informacionFinanciera,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/informacion_financiera/registrar',
        name: 'registrarInformacionFinanciera',
        component: registrarInformacionFinanciera,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/informacion_financiera/editar/:idif',
        name: 'editarInformacionFinanciera',
        component: editarInformacionFinanciera,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/paginas',
        name: 'paginas',
        component: paginas,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/paginas/editar/:idpag',
        name: 'editarPagina',
        component: editarPagina,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/testimonios',
        name: 'testimonios',
        component: testimonios,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/testimonios/registrar',
        name: 'registrarTestimonio',
        component: registrarTestimonio,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/testimonios/editar/:idtes',
        name: 'editarTestimonio',
        component: editarTestimonio,
        props: true,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/sso/acceso',
    name: 'accesoSSO',
    component: accesoSSO,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/login',
        component: login
      }
    ]}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
