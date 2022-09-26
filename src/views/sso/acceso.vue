<template lang="html">

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <div class="form-group text-center">
                  Accediendo. Por favor espere...
                </div>
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
import axios from 'axios'
export default {
  name: 'accesoSSO',
  data () {
    return {
      ACK: ''
    }
  },
  methods: {
  },
  mounted () {
    var router = this.$router
    let ACK = atob(this.$route.query.ACK)
    var clase = this
    axios
      .get(process.env.SSO_URL + 'api/account/getAccesos?appID=' + process.env.SSO_APPID + '&userID=' + ACK)
      .then((response) => {
        console.log(response)
        this.$store.dispatch('loginSSO', response.data)
          .then((responsex) => {
            console.log(responsex)
            router.push('/')
          })
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              clase.$store.dispatch('logout')
              clase.$router.push('/login')
            } else {
              // Handle error however you want
            }
          })
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          clase.$store.dispatch('logout')
          clase.$router.push('/login')
        } else {
          // Handle error however you want
        }
      })
    this.$store.dispatch('logout')
  }
}
</script>

<style scoped lang="scss">
#error_msg {
  color:red;
}
</style>
