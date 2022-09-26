<template lang="html">
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style>
@import "../node_modules/mdi/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "../node_modules/vue-snotify/styles/material.css";
@import "../node_modules/typicons.font/src/font/typicons.css";
</style>

<style lang="scss">
@import "assets/scss/shared/style";
</style>
