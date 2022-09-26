<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Registro de Información Financiera</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action class="form" enctype="multipart/form-data" @submit.prevent="grabarInformacionFinanciera">
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="anho" placeholder="Año">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="trimestre" placeholder="Trimestre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="file" class="form-control" id="archivo" placeholder="Archivo">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre_en" placeholder="Nombre (Inglés)">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="file" class="form-control" id="archivo_en" placeholder="Archivo (Inglés)">
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
  name: 'registrarInformacionFinanciera',
  components: { 'switches': Switches },
  data () {
    return {
      nombre: '',
      nombreen: '',
      anho: '',
      trimestre: '',
      archivo: '',
      archivoen: '',
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
    grabarInformacionFinanciera () {
      this.errors = []

      if (!this.anho) {
        this.errors.push('El año es obligatorio.')
      }

      if (!this.trimestre) {
        this.errors.push('El trimestre es obligatorio.')
      }

      if (!this.nombre) {
        this.errors.push('El nombre es obligatorio.')
      }

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel
        })
        var clase = this
        var primerarchivo = null
        var segundoarchivo = null
        if (document.getElementById('archivo').files[0] != null) {
          primerarchivo = document.getElementById('archivo').files[0]
          segundoarchivo = document.getElementById('archivo_en').files[0]
        } else if (document.getElementById('archivo_en').files[0] != null) {
          primerarchivo = document.getElementById('archivo_en').files[0]
        }
        if (primerarchivo != null) {
          var bodyFormData = new FormData()
          bodyFormData.append('archivo', primerarchivo)
          axios({
            method: 'post',
            url: process.env.API_URL + 'subirarchivo',
            data: bodyFormData,
            headers:
              { 'Content-Type': 'multipart/form-data' }
          })
            .then(function (response) {
              // handle success
              console.log(response.data.archivo)
              clase.archivo = response.data.archivo
              loader.hide()
              console.log(segundoarchivo)
              if (segundoarchivo != null) {
                console.log(segundoarchivo)
                var bodyFormData = new FormData()
                bodyFormData.append('archivo', segundoarchivo)
                axios({
                  method: 'post',
                  url: process.env.API_URL + 'subirarchivo',
                  data: bodyFormData,
                  headers:
                    { 'Content-Type': 'multipart/form-data' }
                })
                  .then(function (response) {
                    // handle success
                    console.log(response)
                    clase.archivo_en = response.data.archivo
                    loader.hide()
                    axios
                      .post(process.env.API_URL + 'informacion-financiera', { anho: clase.anho, nombre: clase.nombre, nombre_en: clase.nombre_en, trimestre: clase.trimestre, archivo: clase.archivo, archivo_en: clase.archivo_en })
                      .then((response) => clase.$router.push('/informacion_financiera?mensaje=registrada'))
                      .catch(err => console.log(err))
                  })
                  .catch(function (response) {
                    // handle error
                    loader.hide()
                    console.log(response)
                  })
              } else {
                axios
                  .post(process.env.API_URL + 'informacion-financiera', { anho: clase.anho, nombre: clase.nombre, nombre_en: clase.nombre_en, trimestre: clase.trimestre, archivo: clase.archivo, archivo_en: clase.archivo_en })
                  .then(function (response) {
                    loader.hide()
                    clase.$router.push('/informacion_financiera?mensaje=registrada')
                  })
                  .catch(err => console.log(err))
              }
            })
            .catch(function (response) {
              // handle error
              loader.hide()
              console.log(response)
            })
        } else {
          axios
            .post(process.env.API_URL + 'informacion-financiera', { anho: clase.anho, nombre: clase.nombre, nombre_en: clase.nombre_en, trimestre: clase.trimestre, archivo: clase.archivo, archivo_en: clase.archivo_en })
            .then(function (response) {
              loader.hide()
              clase.$router.push('/informacion_financiera?mensaje=registrada')
            })
            .catch(function (response) {
              loader.hide()
            })
        }
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
