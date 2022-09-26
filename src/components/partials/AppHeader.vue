<template lang="html">
  <b-navbar id="template-header" class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row" toggleable="md">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/">
        <div href="#" class="header__logo relative">
          <a href="#" id="logo" class="absolute all-0 index-5"></a>
          <ul class="d-flex align-items-center">
            <li class="logotipo">
                <img src="@/assets/img/logotipo.svg" class="img-fluidx" width="30" height="30">
            </li>
            <li id="isotipo" class="isotipo" style="opacity: 1; left: auto;">
                <img src="@/assets/img/isotipo.svg" class="img-fluidx" width="120" height="30">
            </li>
          </ul>
        </div>
      </router-link>
      <router-link class="navbar-brand brand-logo-mini" to="/">
        <div href="#" class="header__logo relative">
          <a href="#" id="logo" class="absolute all-0 index-5"></a>
          <ul class="d-flex align-items-center">
            <li class="logotipo">
                <img src="@/assets/img/logotipo.svg" class="img-fluidx" width="30" height="30">
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button class="navbar-toggler navbar-toggler align-self-center" type="button" @click="collapedSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
      <button class="navbar-toggler navbar-toggler-right align-self-center" type="button" @click="collapedMobileSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script lang="js">
// eslint-disable-next-line
import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'app-header',
  methods: {
    collapedSidebar: function () {
      $('body').toggleClass('sidebar-icon-only')
    },
    collapedMobileSidebar: function () {
      $('#sidebar').toggleClass('active')
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
}
</style>
