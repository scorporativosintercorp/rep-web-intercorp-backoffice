<template lang="html">

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
              <form action class="form" @submit.prevent="login">
                  <div class="form-group">
                    <label class="label">Usuario</label>
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="username" placeholder="Ingrese su nombre de usuario">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Contraseña</label>
                    <div class="input-group">
                      <input type="password" class="form-control" v-model="password" placeholder="*********">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <span id="error_msg" class="error"></span>
                    <button class="btn btn-primary submit-btn btn-block" type="submit">Login</button>
                  </div>
                </form>
              </div>
              <ul class="auth-footer">
              </ul>
              <p class="footer-text text-center">copyright © 2020 Intercorp. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      document.getElementById('error_msg').text = ''
      var router = this.$router
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      })
      this.$store.dispatch('login', { username, password })
        .then(function (response) {
          loader.hide()
          router.push('/')
        })
        .catch(function (error) {
          console.log(error)
          loader.hide()
          if (error.response.status === 401 || error.response.status === 404) {
            document.getElementById('error_msg').innerHTML = 'Error : ' + error.response.data.message
          }
        })
        // .catch(err => console.log(err))
    }
  },
  mounted () {
    this.$store.dispatch('logout')
  }
}
</script>

<style scoped lang="scss">
#error_msg {
  color:red;
}
</style>
