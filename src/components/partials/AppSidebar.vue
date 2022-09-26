<template lang="html">
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-category">Menu</li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'noticias-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Noticias</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="noticias-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Lista de noticias</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/noticias/registrar">Registrar noticia</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" v-b-toggle="'usuarios-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Usuarios</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="usuarios-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/usuarios">Lista de usuarios</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/usuarios/registrar">Registrar usuario</router-link>
              </li>
            </ul>
          </b-collapse>
        </li> -->
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'categorias-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Categorías</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="categorias-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/categorias">Lista de categorías</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/categorias/registrar">Registrar categoría</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'ifinanciera-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">I. Financiera</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="ifinanciera-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/informacion_financiera">Lista de I. Financiera</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/informacion_financiera/registrar">Registrar I. Financiera</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-b-toggle="'testimonio-dropdown'">
            <i class="menu-icon typcn typcn-document-text"></i>
            <span class="menu-title">Testimonios</span>
            <i class="menu-arrow"></i>
          </a>
          <b-collapse id="testimonio-dropdown">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/testimonios">Lista de Testimonios</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/testimonios/registrar">Registrar Testimonio</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/paginas">
            <i class="menu-icon typcn typcn-document-add"></i>
            <span class="menu-title">Páginas</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">
            <i class="menu-icon typcn typcn-document-add"></i>
            <span class="menu-title">Salir</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script lang="js">
import JQuery from 'jquery'
// eslint-disable-next-line
let $ = JQuery
export default {
  name: 'app-sidebar',
  mounted () {
    const body = document.querySelector('body')
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
