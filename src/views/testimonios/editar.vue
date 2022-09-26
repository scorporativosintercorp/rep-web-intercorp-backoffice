<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edición de Testimonio</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action @submit.prevent="actualizarTestimonio">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="cargo" placeholder="Cargo">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="cargoen" placeholder="Cargo (Inglés)">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="cita" placeholder="Cita">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="citaen" placeholder="Cita (Inglés)">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="file" id="imagen" class="form-control" v-on:change="uploadImagen($event)" placeholder="Imagen" />
                </div>
                    <div class="input-group">
                  <a id="imagen_enlace" href="" target="_blank"></a>
                    </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="orden" placeholder="Orden">
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
  name: 'editarTestimonio',
  components: { 'switches': Switches },
  data () {
    return {
      nombre: '',
      cargo: '',
      cargoen: '',
      cita: '',
      citaen: '',
      imagen: null,
      orden: 1,
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
    uploadImagen (event) {
      this.imagen = event.target.files[0]
    },
    actualizarTestimonio () {
      var router = this.$router
      let idtes = this.$route.params.idtes
      let nombre = this.nombre
      let cargo = this.cargo
      let cargoen = this.cargoen
      let cita = this.cita
      let citaen = this.citaen
      let imagen = this.imagen
      let orden = this.orden
      let activo = this.activo
      this.errors = []

      if (!this.nombre) {
        this.errors.push('El nombre es obligatorio.')
      }

      if (!this.cargo) {
        this.errors.push('El cargo es obligatorio.')
      }

      if (!this.cita) {
        this.errors.push('El cita es obligatorio.')
      }

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        var bodyFormData = new FormData()
        bodyFormData.append('id_testimonio', idtes)
        bodyFormData.append('nombre', nombre)
        bodyFormData.append('cargo', cargo)
        bodyFormData.append('cargoen', cargoen)
        bodyFormData.append('cita', cita)
        bodyFormData.append('citaen', citaen)
        bodyFormData.append('imagen', imagen)
        bodyFormData.append('orden', orden)
        bodyFormData.append('activo', activo)
        bodyFormData.append('id_usuario', localStorage.getItem('userid'))
        let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel
        })
        axios({
          method: 'put',
          url: process.env.API_URL + 'testimonio',
          data: bodyFormData,
          headers:
            { 'Content-Type': 'multipart/form-data' }
        })
          .then((response) => {
            loader.hide()
            router.push('/testimonios?mensaje=actualizada')
          })
          .catch(function (response) {
            // handle error
            console.log(response)
            loader.hide()
          })
      }
    }
  },
  mounted () {
    let idtes = this.$route.params.idtes
    axios
      .post(process.env.API_URL + 'detalle-testimonio', {id_testimonio: idtes})
      .then((response) => {
        this.nombre = response.data.nombre
        this.cargo = response.data.cargo
        this.cargoen = response.data.testimonio_idioma[0].cargo
        this.cita = response.data.cita
        this.citaen = response.data.testimonio_idioma[0].cita
        this.orden = response.data.orden
        this.activo = response.data.activo
        if (response.data.imagen) {
          document.getElementById('imagen_enlace').href = process.env.MEDIA_URL + response.data.imagen
          document.getElementById('imagen_enlace').text = '>> ' + response.data.imagen
        }
      })
      .catch(function (response) {
        // handle error
        console.log(response)
      })
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
