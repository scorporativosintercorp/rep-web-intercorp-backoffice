<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Registro de Usuario</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action @submit.prevent="grabarUsuario">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="contrasena" placeholder="Contraseña">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <h6>Super Admin</h6>
                </div>
                <div class="input-group">
                  <switches v-model="super_admin" theme="bootstrap" color="primary"></switches>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <h6>Activo</h6>
                </div>
                <div class="input-group">
                  <switches v-model="activo" theme="bootstrap" color="primary"></switches>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary submit-btn">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
import axios from 'axios'
import Switches from 'vue-switches'

export default {
  name: 'registrarUsuario',
  components: { 'switches': Switches },
  data () {
    return {
      nombre: '',
      contrasena: '',
      super_admin: true,
      activo: true,
      activeItem: 'espaniol',
      errors: []
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    grabarUsuario () {
      let nombre = this.nombre
      let contrasena = this.contrasena
      let superadmin = this.super_admin
      let activo = this.activo
      this.errors = []

      if (!this.nombre) {
        this.errors.push('El nombre de usuario es obligatorio.')
      }
      if (!this.contrasena) {
        this.errors.push('La contraseña es obligatoria.')
      }

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        axios
          .post(process.env.API_URL + 'usuario', { username: nombre, password: contrasena, super_admin: superadmin, activo: activo })
          .then((response) => this.$router.push('/usuarios?mensaje=registrado'))
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #app-editor{
    width: 100%;
  }
  input[type="file"]{
    padding-top:11px;
  }
  #p-errors{
    color: red;
  }
</style>
