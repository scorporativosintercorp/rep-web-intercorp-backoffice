<template lang="html">

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
              <form action class="form" @submit.prevent="login">
                  <div class="form-group text-center">
                    <span id="error_msg" class="error"></span>
                    <img alt="Vue logo" class="mw-100" src="../assets/img/LoginLogo.png"><br>
                    <a class="btn btn-primary submit-btn btn-block" :href="urlSSO">Iniciar sesión</a>
                  </div>
                </form>
              </div>
              <ul class="auth-footer">
              </ul>
              <p class="footer-text text-center">copyright © 2021 Intercorp. Todos los derechos reservados.</p>
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
      password: '',
      urlSSO: process.env.SSO_URL + 'Account/Login?ReturnUrl=' + process.env.SSO_RETURN_URL + '&ACK=' + process.env.SSO_TOKEN
    }
  },
  methods: {
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
