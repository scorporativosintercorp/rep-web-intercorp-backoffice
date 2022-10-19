<template>
  <div class="form--main">
    <div class="mb-8">
      <div v-if="showMessage" class="mb-6">
        <p class="text-center">Información actualizada correctamente</p>
      </div>
      <h3 class="text-3xl font-semibold text-gray-700">Registro de Información Financiera</h3>
    </div>

    <div class="mb-10">
      <div class="p-6 bg-white rounded-md shadow">
        <div class="pb-4 border-b border-gray-100 mb-7">
          <div id="p-errors" v-if="errors.length">
            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </div>
          <div class="grid grid-cols-1 gap-6">
            <form class="form" enctype="multipart/form-data" @submit.prevent="grabarInformacionFinanciera">
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="anho" placeholder="Año" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="trimestre" placeholder="Trimestre" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="file" class="form-control" id="archivo" placeholder="Archivo" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre_en" placeholder="Nombre (Inglés)" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="file" class="form-control" id="archivo_en" placeholder="Archivo (Inglés)" />
                </div>
              </div>
              <div class="flex justify-end">
                <button class="btn btn-blue">Enviar</button>
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
  import axios from 'axios';

  export default {
    name: 'registrarInformacionFinanciera',
    data () {
      return {
        API_URL: import.meta.env.VITE_API_URL,
        nombre: '',
        nombre_en: '',
        anho: '',
        trimestre: '',
        archivo: '',
        archivo_en: '',
        activeItem: 'espaniol',
        errors: [],
        loading: false,
        showMessage: false,
        token: localStorage.getItem("token"),
      }
    },
    mounted() {
      this.test()
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
          this.loading = true;
          let clase = this;

          let primerarchivo = null;
          let segundoarchivo = null;

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
              url: this.API_URL + 'subirarchivo',
              data: bodyFormData,
              headers:
              {
                // 'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Headers": "x-access-token",
                "x-access-token": this.token,
              }
            })
              .then((response) => {
                console.log("PRIMERA CARGA", response.data.archivo);

                clase.archivo = response.data.archivo
                this.loading = false;

                console.log("SEGUNDO ARCHIVO", segundoarchivo)

                if (segundoarchivo != null) {
                  console.log("SEGUNDO ARCHIVO 2", segundoarchivo)

                  var bodyFormData = new FormData()
                  bodyFormData.append('archivo', segundoarchivo);

                  axios({
                    method: 'post',
                    url: this.API_URL + 'subirarchivo',
                    data: bodyFormData,
                    headers:
                     {
                        // 'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Headers": "x-access-token",
                        "x-access-token": this.token,
                      }
                  })
                    .then((response) => {


                      console.log("RESPONSE CARGA IMÁGENES", response);

                      clase.archivo_en = response.data.archivo;
                      this.loading = false;

                      const dataJson = {
                        anho: clase.anho,
                        nombre: clase.nombre,
                        nombre_en: clase.nombre_en,
                        trimestre: clase.trimestre,
                        archivo: clase.archivo,
                        archivo_en: clase.archivo_en
                      };

                      axios({
                        method: 'post',
                        url: this.API_URL + 'informacion-financiera',
                        data: dataJson,
                        headers:
                          {
                            // 'Content-Type': 'multipart/form-data',
                            "Access-Control-Allow-Headers": "x-access-token",
                            "x-access-token": this.token,
                          }
                      })
                        .then((response) => {
                          console.log(`response`, response);
                          this.showMessage = true;
                          this.loading = false;
                        })
                        .catch(err => console.log(err))
                    })
                    .catch((response) => {
                      this.loading = false;
                      console.log(response)
                    })
                } else {
                  let dataJson = {
                    anho: clase.anho,
                    nombre: clase.nombre,
                    nombre_en: clase.nombre_en,
                    trimestre: clase.trimestre,
                    archivo: clase.archivo,
                    archivo_en: clase.archivo_en
                  };

                  axios({
                    method: 'post',
                    url: this.API_URL + 'informacion-financiera',
                    data: dataJson,
                    headers:
                      {
                        // 'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Headers": "x-access-token",
                        "x-access-token": this.token,
                      }
                  })
                    .then((response) => {
                      this.showMessage = true;
                      this.loading = false;
                    })
                    .catch(err => console.log(err))
                }
              })
              .catch((response) => {
                this.loading = false;
                console.log(response)
              })
          } else {
            let dataJson = {
              anho: clase.anho,
              nombre: clase.nombre,
              nombre_en: clase.nombre_en,
              trimestre: clase.trimestre,
              archivo: clase.archivo,
              archivo_en: clase.archivo_en
            };

            axios({
              method: "post",
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
              })
          }
        }
      },
      test() {
        console.log(`API_URL`, import.meta.env.VITE_API_URL);
      }

    }
  }
</script>

<style scoped lang="postcss">
  .form--main {
    @apply relative;
  }
</style>
