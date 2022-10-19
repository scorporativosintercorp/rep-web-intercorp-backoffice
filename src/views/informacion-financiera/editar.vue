<template>
  <div class="form--main">
    <div>
      <div class="col-lg-12 grid-margin stretch-card">
        <div v-if="showMessage" class="mb-6">
          <p class="text-center">Información actualizada correctamente</p>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edición de Información Financiera</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form class="form" enctype="multipart/form-data" @submit.prevent="actualizarInformacionFinanciera">
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
                <div class="input-group">
                  <a id="archivo_enlace" href="" target="_blank"></a>
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
                <div class="input-group">
                  <a id="archivo_en_enlace" href="" target="_blank"></a>
                </div>
              </div>
              <div class="flex justify-end">
                <button class="btn btn-blue">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading form--loading"></div>
  </div>
</template>

<script lang="js">
import axios from 'axios'
export default {
  name: 'editarCategoria',
  data () {
    return {
      API_URL: import.meta.env.VITE_API_URL,
      ARCHIVOS_URL: import.meta.env.VITE_ARCHIVOS_URL,
      idinfo: null,
      token: localStorage.getItem("token"),
      nombre: '',
      nombreen: '',
      activo: true,
      activeItem: 'espaniol',
      errors: [],
      trimestre: '',
      anho: '',
      sent: false,
      loading: false,
      showMessage: false,
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    actualizarInformacionFinanciera () {
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
        this.loading = true;
        let clase = this
        let primerarchivo = null
        let segundoarchivo = null
        if (document.getElementById('archivo').files[0] != null) {
          primerarchivo = document.getElementById('archivo').files[0]
          segundoarchivo = document.getElementById('archivo_en').files[0]
        } else if (document.getElementById('archivo_en').files[0] != null) {
          primerarchivo = document.getElementById('archivo_en').files[0]
        }
        if (primerarchivo != null) {
          let bodyFormData = new FormData()
          bodyFormData.append('archivo', primerarchivo)
          axios({
            method: 'post',
            url: this.API_URL + 'subirarchivo',
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Headers": "x-access-token",
              "x-access-token": this.token,
            },
          })
            .then(function (response) {
              console.log(response.data.archivo)
              clase.archivo = response.data.archivo
              this.loading = false;
              console.log(segundoarchivo)
              if (segundoarchivo != null) {
                console.log(segundoarchivo)
                var bodyFormData = new FormData()
                bodyFormData.append('archivo', segundoarchivo)
                axios({
                  method: 'post',
                  url: this.API_URL + 'subirarchivo',
                  data: bodyFormData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Headers": "x-access-token",
                    "x-access-token": this.token,
                  },
                })
                  .then(function (response) {
                    this.loading = false;
                    console.log(response);
                    clase.archivo_en = response.data.archivo;

                    let dataJson = {
                      id_informacion_financiera: this.idinfo,
                      anho: clase.anho,
                      nombre: clase.nombre,
                      nombre_en: clase.nombre_en,
                      trimestre: clase.trimestre,
                      archivo: clase.archivo,
                      archivo_en: clase.archivo_en
                    };

                    axios({
                      method: "put",
                      url: this.API_URL + "informacion-financiera",
                      data: dataJson,
                      headers: {
                        "Access-Control-Allow-Headers": "x-access-token",
                        "x-access-token": this.token,
                      },
                    })
                      .then((response) => {
                        this.loading = false;
                        this.showMessage = true;
                      })
                      .catch(err => console.log(err));
                  })
                  .catch((response) => {
                    this.loading = false;
                    console.log(response)
                  })
              } else {
                let dataJson = {
                  id_informacion_financiera: this.idinfo,
                  anho: clase.anho,
                  nombre: clase.nombre,
                  nombre_en: clase.nombre_en,
                  trimestre: clase.trimestre,
                  archivo: clase.archivo,
                  archivo_en: clase.archivo_en
                };

                axios({
                  method: "put",
                  url: this.API_URL + "informacion-financiera",
                  data: dataJson,
                  headers: {
                    // "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Headers": "x-access-token",
                    "x-access-token": this.token,
                  },
                })
                  .then((response) => {
                    this.showMessage = true;
                    this.loading = false;
                  })
                  .catch((response) => {
                    this.loading = false;
                  });
              }
            })
            .catch((response) => {
              this.loading = false;
            })
        } else {
          let dataJson = {
            id_informacion_financiera: this.idinfo,
            anho: clase.anho,
            nombre: clase.nombre,
            nombre_en: clase.nombre_en,
            trimestre: clase.trimestre,
            archivo: clase.archivo,
            archivo_en: clase.archivo_en
          };

          axios({
            method: "put",
            url: this.API_URL + "informacion-financiera",
            data: dataJson,
            headers: {
              "Access-Control-Allow-Headers": "x-access-token",
              "x-access-token": this.token,
            },
          })
            .then((response) => {
            this.showMessage = true;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          })
          .catch((response) => {
            this.loading = false;
          })
        }
      }
    },
    eliminarAdjunto() {

    }
  },
  created() {
    let id = this.$route.params.idinfo;
    this.idinfo = this.$route.params.idinfo;

    let dataJson = {
      id_informacion_financiera: id
    }

    axios({
      method: 'post',
      url: this.API_URL + 'detalle-informacion-financiera',
      data: dataJson,
      headers: {
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": this.token,
      },
    })
      .then((response) => {
        this.anho = response.data.anho
        this.trimestre = response.data.trimestre
        this.nombre = response.data.nombre
        this.nombre_en = response.data.informacion_financiera_idiomas[0].nombre
        if (response.data.link) {
          document.getElementById('archivo_enlace').href = this.ARCHIVOS_URL + response.data.link
          document.getElementById('archivo_enlace').text = '>> ' + response.data.link
        }
        if (response.data.informacion_financiera_idiomas[0].link) {
          document.getElementById('archivo_en_enlace').href = this.ARCHIVOS_URL + response.data.informacion_financiera_idiomas[0].link
          document.getElementById('archivo_en_enlace').text = '>> ' + response.data.informacion_financiera_idiomas[0].link
        }
      })
  }
}
</script>

<style scoped lang="postcss">
</style>
