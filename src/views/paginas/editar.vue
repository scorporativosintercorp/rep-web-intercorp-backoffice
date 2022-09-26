<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edición de Página</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action class="form" enctype="multipart/form-data" @submit.prevent="actualizarPagina">
              <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('espaniol')" :class="{ active: isActive('espaniol') }" href="#espaniol">Español</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('ingles')" :class="{ active: isActive('ingles') }" href="#ingles">Inglés</a>
                </li>
              </ul>
              <div class="tab-content py-3" id="myTabContent">
                <div class="tab-pane fade" :class="{ 'active show': isActive('espaniol') }" id="espaniol">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cabecera_texto" class="form-control" placeholder="Cabecera Texto"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cabecera_link_video" class="form-control" placeholder="Cabecera Link Video"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_titulo" class="form-control" placeholder="Cierre Título"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_bajada" class="form-control" placeholder="Cierre Bajada"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_link_video" class="form-control" placeholder="Cierre Link Video"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <editor v-model="cierre_introduccion"
                        :api-key="TINY_EDITOR_KEY"
                        :init="{
                          width: '100%',
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount | code preview'
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic underline backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help | code preview'
                        }" placeholder="Cierre Introducción"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_link_pagina" class="form-control" placeholder="Cierre Link Página"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_texto_color" class="form-control" placeholder="Cierre Texto Color">
                    </div>
                    <div class="input-group colorpicker">
                      <v-input-colorpicker  v-model="cierre_texto_color" /> [Cierre Texto Color]
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_fondo_color" class="form-control" placeholder="Cierre Fondo Color">
                    </div>
                    <div class="input-group colorpicker">
                      <v-input-colorpicker  v-model="cierre_fondo_color" /> [Cierre Fondo Color]
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <b-form-select text="Cierre Formato" v-model="cierre_formato">
                        <b-form-select-option :value="null">Seleccione el Cierre Formato</b-form-select-option>
                        <b-form-select-option :value="1">Imagen de Fondo</b-form-select-option>
                        <b-form-select-option :value="2">Imagen Izquierda</b-form-select-option>
                        <b-form-select-option :value="3">Imagen Derecha</b-form-select-option>
                        <b-form-select-option :value="4">Video de Fondo</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Cierre Activo</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="cierre_activo" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn">Actualizar Datos</button>
                  </div>
                  <b-badge id="bagde_actualizada" variant="success mb-3" hidden>Página actualizada correctamente</b-badge>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cabecera Imagen Desktop (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_imagen_desktop" v-on:change="uploadImagenPagina($event, 'cabecera_imagen_desktop', 0)" class="form-control" placeholder="Cabecera Imagen Desktop" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_imagen_desktop_enlace" href="" target="_blank"></a>
                      <a id="cabecera_imagen_desktop_eliminar" v-on:click="eliminarImagen($event, 'cabecera_imagen_desktop', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cabecera Imagen Mobile (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_imagen_mobile" v-on:change="uploadImagenPagina($event, 'cabecera_imagen_mobile', 0)" class="form-control" placeholder="Cabecera Imagen Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_imagen_mobile_enlace" href="" target="_blank"></a>
                      <a id="cabecera_imagen_mobile_eliminar" v-on:click="eliminarImagen($event, 'cabecera_imagen_mobile', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cabecera Video</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_video" v-on:change="uploadImagenPagina($event, 'cabecera_video', 0)" class="form-control" placeholder="Cabecera Video" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_video_enlace" href="" target="_blank"></a>
                      <a id="cabecera_video_eliminar" v-on:click="eliminarImagen($event, 'cabecera_video', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cierre Imagen Desktop (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_imagen_desktop" v-on:change="uploadImagenPagina($event, 'cierre_imagen_desktop', 0)" class="form-control" placeholder="Cierre Imagen Desktop" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_imagen_desktop_enlace" href="" target="_blank"></a>
                      <a id="cierre_imagen_desktop_eliminar" v-on:click="eliminarImagen($event, 'cierre_imagen_desktop', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cierre Imagen Mobile (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_imagen_mobile" v-on:change="uploadImagenPagina($event, 'cierre_imagen_mobile', 0)" class="form-control" placeholder="Cierre Imagen Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_imagen_mobile_enlace" href="" target="_blank"></a>
                      <a id="cierre_imagen_mobile_eliminar" v-on:click="eliminarImagen($event, 'cierre_imagen_mobile', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Cierre Video</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_video" v-on:change="uploadImagenPagina($event, 'cierre_video', 0)" class="form-control" placeholder="Cierre Video" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_video_enlace" href="" target="_blank"></a>
                      <a id="cierre_video_eliminar" v-on:click="eliminarImagen($event, 'cierre_video', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" :class="{ 'active show': isActive('ingles') }" id="ingles">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cabecera_texto_en" class="form-control" placeholder="Cabecera Texto"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_titulo_en" class="form-control" placeholder="Cierre Título"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="cierre_bajada_en" class="form-control" placeholder="Cierre Bajada"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <editor v-model="cierre_introduccion_en"
                        :api-key="TINY_EDITOR_KEY"
                        :init="{
                          width: '100%',
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount | code preview'
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic underline backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help | code preview'
                        }" placeholder="Cierre Introducción"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cabecera imagen desktop español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cabecera_imagen_desktop_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cabecera imagen mobile español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cabecera_imagen_mobile_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cabecera video español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cabecera_video_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cierre imagen desktop español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cierre_imagen_desktop_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cierre imagen mobile español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cierre_imagen_mobile_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar cierre video español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="usar_cierre_video_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn">Actualizar Datos</button>
                  </div>
                  <b-badge id="bagde_actualizada" variant="success mb-3" hidden>Página actualizada correctamente</b-badge>
                  <div class="form-group" id="div_cabecera_imagen_desktop_en">
                    <div class="input-group">
                      <span>Cabecera Imagen Desktop Inglés (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_imagen_desktop_en" v-on:change="uploadImagenPagina($event, 'cabecera_imagen_desktop_en', 0)" class="form-control" placeholder="Cabecera Imagen Desktop Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_imagen_desktop_en_enlace" href="" target="_blank"></a>
                      <a id="cabecera_imagen_desktop_en_eliminar" v-on:click="eliminarImagen($event, 'cabecera_imagen_desktop_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group" id="div_cabecera_imagen_mobile_en">
                    <div class="input-group">
                      <span>Cabecera Imagen Mobile Inglés (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_imagen_mobile_en" v-on:change="uploadImagenPagina($event, 'cabecera_imagen_mobile_en', 0)" class="form-control" placeholder="Cabecera Imagen Mobile Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_imagen_mobile_en_enlace" href="" target="_blank"></a>
                      <a id="cabecera_imagen_mobile_en_eliminar" v-on:click="eliminarImagen($event, 'cabecera_imagen_mobile_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group" id="div_cabecera_video_en">
                    <div class="input-group">
                      <span>Cabecera Video Inglés</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cabecera_video_en" v-on:change="uploadImagenPagina($event, 'cabecera_video_en', 0)" class="form-control" placeholder="Cabecera Video Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cabecera_video_en_enlace" href="" target="_blank"></a>
                      <a id="cabecera_video_en_eliminar" v-on:click="eliminarImagen($event, 'cabecera_video_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group" id="div_cierre_imagen_desktop_en">
                    <div class="input-group">
                      <span>Cierre Imagen Desktop Inglés (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_imagen_desktop_en" v-on:change="uploadImagenPagina($event, 'cierre_imagen_desktop_en', 0)" class="form-control" placeholder="Cierre Imagen Desktop Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_imagen_desktop_en_enlace" href="" target="_blank"></a>
                      <a id="cierre_imagen_desktop_en_eliminar" v-on:click="eliminarImagen($event, 'cierre_imagen_desktop_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group" id="div_cierre_imagen_mobile_en">
                    <div class="input-group">
                      <span>Cierre Imagen Mobile Inglés (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_imagen_mobile_en" v-on:change="uploadImagenPagina($event, 'cierre_imagen_mobile_en', 0)" class="form-control" placeholder="Cierre Imagen Mobile Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_imagen_mobile_en_enlace" href="" target="_blank"></a>
                      <a id="cierre_imagen_mobile_en_eliminar" v-on:click="eliminarImagen($event, 'cierre_imagen_mobile_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group" id="div_cierre_video_en">
                    <div class="input-group">
                      <span>Cierre Video Inglés</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="cierre_video_en" v-on:change="uploadImagenPagina($event, 'cierre_video_en', 0)" class="form-control" placeholder="Cierre Video Inglés" />
                    </div>
                    <div class="input-group">
                      <a id="cierre_video_en_enlace" href="" target="_blank"></a>
                      <a id="cierre_video_en_eliminar" v-on:click="eliminarImagen($event, 'cierre_video_en', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                </div>
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
import Editor from '@tinymce/tinymce-vue'
import Switches from 'vue-switches'
export default {
  name: 'editarPagina',
  components: { 'editor': Editor, 'switches': Switches },
  data () {
    return {
      color: '#FF0000',
      displayPicker: false,
      cabecera_texto: '',
      cabecera_texto_en: '',
      cabecera_imagen_desktop: '',
      cabecera_imagen_desktop_en: '',
      usar_cabecera_imagen_desktop_en: true,
      cabecera_imagen_mobile: '',
      cabecera_imagen_mobile_en: '',
      usar_cabecera_imagen_mobile_en: true,
      cabecera_video: '',
      cabecera_video_en: '',
      usar_cabecera_video_en: true,
      cabecera_link_video: '',
      cierre_imagen_desktop: '',
      cierre_imagen_desktop_en: '',
      usar_cierre_imagen_desktop_en: true,
      cierre_imagen_mobile: '',
      cierre_imagen_mobile_en: '',
      usar_cierre_imagen_mobile_en: true,
      cierre_video: '',
      cierre_video_en: '',
      usar_cierre_video_en: true,
      cierre_link_video: '',
      cierre_titulo: '',
      cierre_titulo_en: '',
      cierre_bajada: '',
      cierre_bajada_en: '',
      cierre_introduccion: '',
      cierre_introduccion_en: '',
      cierre_link_pagina: '',
      cierre_texto_color: '',
      cierre_fondo_color: '',
      cierre_formato: '',
      cierre_activo: true,
      activeItem: 'espaniol',
      errors: []
    }
  },
  watch: {
    usar_cabecera_imagen_desktop_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cabecera_imagen_desktop_en').hidden = true
      } else {
        document.getElementById('div_cabecera_imagen_desktop_en').hidden = false
      }
    },
    usar_cabecera_imagen_mobile_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cabecera_imagen_mobile_en').hidden = true
      } else {
        document.getElementById('div_cabecera_imagen_mobile_en').hidden = false
      }
    },
    usar_cabecera_video_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cabecera_video_en').hidden = true
      } else {
        document.getElementById('div_cabecera_video_en').hidden = false
      }
    },
    usar_cierre_imagen_desktop_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cierre_imagen_desktop_en').hidden = true
      } else {
        document.getElementById('div_cierre_imagen_desktop_en').hidden = false
      }
    },
    usar_cierre_imagen_mobile_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cierre_imagen_mobile_en').hidden = true
      } else {
        document.getElementById('div_cierre_imagen_mobile_en').hidden = false
      }
    },
    usar_cierre_video_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_cierre_video_en').hidden = true
      } else {
        document.getElementById('div_cierre_video_en').hidden = false
      }
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    actualizarPagina () {
      let idp = this.$route.params.idpag
      this.errors = []

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        axios
          .put(process.env.API_URL + 'datos-pagina',
            {
              id_pagina: idp,
              cabecera_texto: this.cabecera_texto,
              cabecera_texto_en: this.cabecera_texto_en,
              cabecera_imagen_desktop: this.cabecera_imagen_desktop,
              cabecera_imagen_desktop_en: this.cabecera_imagen_desktop_en,
              usar_cabecera_imagen_desktop_en: this.usar_cabecera_imagen_desktop_en,
              cabecera_imagen_mobile: this.cabecera_imagen_mobile,
              cabecera_imagen_mobile_en: this.cabecera_imagen_mobile_en,
              usar_cabecera_imagen_mobile_en: this.usar_cabecera_imagen_mobile_en,
              cabecera_video: this.cabecera_video,
              cabecera_video_en: this.cabecera_video_en,
              usar_cabecera_video_en: this.usar_cabecera_video_en,
              cabecera_link_video: this.cabecera_link_video,
              cierre_imagen_desktop: this.cierre_imagen_desktop,
              cierre_imagen_desktop_en: this.cierre_imagen_desktop_en,
              usar_cierre_imagen_desktop_en: this.usar_cierre_imagen_desktop_en,
              cierre_imagen_mobile: this.cierre_imagen_mobile,
              cierre_imagen_mobile_en: this.cierre_imagen_mobile_en,
              usar_cierre_imagen_mobile_en: this.usar_cierre_imagen_mobile_en,
              cierre_video: this.cierre_video,
              cierre_video_en: this.cierre_video_en,
              usar_cierre_video_en: this.usar_cierre_video_en,
              cierre_link_video: this.cierre_link_video,
              cierre_titulo: this.cierre_titulo,
              cierre_titulo_en: this.cierre_titulo_en,
              cierre_bajada: this.cierre_bajada,
              cierre_bajada_en: this.cierre_bajada_en,
              cierre_introduccion: this.cierre_introduccion,
              cierre_introduccion_en: this.cierre_introduccion_en,
              cierre_link_pagina: this.cierre_link_pagina,
              cierre_texto_color: this.cierre_texto_color,
              cierre_fondo_color: this.cierre_fondo_color,
              cierre_formato: this.cierre_formato,
              cierre_activo: this.cierre_activo
            }
          )
          .then((response) => this.$router.push('/paginas?mensaje=actualizada'))
          .catch(err => console.log(err))
      }
    },
    eliminarImagen (event, campo, idioma) {
      this.$confirm(
        {
          message: '¿Está seguro(a) de eliminar la imagen?',
          button: {
            no: 'No',
            yes: 'Si'
          },
          callback: confirm => {
            if (confirm) {
              let idpag = this.$route.params.idpag
              axios
                .post(process.env.API_URL + 'datos-pagina/eliminarimagen', { id_pagina: idpag, id_idioma: idioma, campo: campo })
                .then((response) => {
                  document.getElementById(event.target.id.replace('_eliminar', '_enlace')).text = ''
                  document.getElementById(event.target.id).text = ''
                })
                .catch(err => console.log(err))
            }
          }
        }
      )
    },
    uploadImagenPagina (event, campo, idioma) {
      var bodyFormData = new FormData()
      let idpag = this.$route.params.idpag
      bodyFormData.append('id_pagina', idpag)
      bodyFormData.append('id_idioma', idioma)
      bodyFormData.append('imagen', event.target.files[0])
      bodyFormData.append('campo', campo)
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      })
      axios({
        method: 'post',
        url: process.env.API_URL + 'datos-pagina/subirimagen',
        data: bodyFormData,
        headers:
          { 'Content-Type': 'multipart/form-data' }
      })
        .then(function (response) {
          // handle success
          console.log(response)
          if (idioma > 0) {
            document.getElementById(campo + '_en_enlace').href = response.data.url + response.data.imagen
            document.getElementById(campo + '_en_enlace').text = '>> ' + response.data.imagen
            document.getElementById(campo + '_en_eliminar').text = '[Eliminar]'
          } else {
            document.getElementById(campo + '_enlace').href = response.data.url + response.data.imagen
            document.getElementById(campo + '_enlace').text = '>> ' + response.data.imagen
            document.getElementById(campo + '_eliminar').text = '[Eliminar]'
          }
          loader.hide()
        })
        .catch(function (response) {
          // handle error
          loader.hide()
          console.log(response)
        })
    }
  },
  mounted () {
    let idp = this.$route.params.idpag
    axios
      .post(process.env.API_URL + 'detalle-pagina', {id_pagina: idp, id_idioma: 1})
      .then((response) => {
        this.cabecera_texto = response.data.cabecera_texto
        this.cabecera_texto_en = response.data.datos_pagina_idioma[0].cabecera_texto
        this.cabecera_imagen_desktop = response.data.cabecera_imagen_desktop
        this.cabecera_imagen_desktop_en = response.data.datos_pagina_idioma[0].cabecera_imagen_desktop
        this.usar_cabecera_imagen_desktop_en = response.data.datos_pagina_idioma[0].usar_cabecera_imagen_desktop_espanol
        this.cabecera_imagen_mobile = response.data.cabecera_imagen_mobile
        this.cabecera_imagen_mobile_en = response.data.datos_pagina_idioma[0].cabecera_imagen_mobile
        this.usar_cabecera_imagen_mobile_en = response.data.datos_pagina_idioma[0].usar_cabecera_imagen_mobile_espanol
        this.cabecera_video = response.data.cabecera_video
        this.cabecera_video_en = response.data.datos_pagina_idioma[0].cabecera_video
        this.usar_cabecera_video_en = response.data.datos_pagina_idioma[0].usar_cabecera_video_espanol
        this.cabecera_link_video = response.data.cabecera_link_video
        this.cierre_imagen_desktop = response.data.cierre_imagen_desktop
        this.cierre_imagen_desktop_en = response.data.datos_pagina_idioma[0].cierre_imagen_desktop
        this.usar_cierre_imagen_desktop_en = response.data.datos_pagina_idioma[0].usar_cierre_imagen_desktop_espanol
        this.cierre_imagen_mobile = response.data.cierre_imagen_mobile
        this.cierre_imagen_mobile_en = response.data.datos_pagina_idioma[0].cierre_imagen_mobile
        this.usar_cierre_imagen_mobile_en = response.data.datos_pagina_idioma[0].usar_cierre_imagen_mobile_espanol
        this.cierre_video = response.data.cierre_video
        this.cierre_video_en = response.data.datos_pagina_idioma[0].cierre_video
        this.usar_cierre_video_en = response.data.datos_pagina_idioma[0].usar_cierre_video_espanol
        this.cierre_link_video = response.data.cierre_link_video
        this.cierre_titulo = response.data.cierre_titulo
        this.cierre_titulo_en = response.data.datos_pagina_idioma[0].cierre_titulo
        this.cierre_bajada = response.data.cierre_bajada
        this.cierre_bajada_en = response.data.datos_pagina_idioma[0].cierre_bajada
        this.cierre_introduccion = response.data.cierre_introduccion
        this.cierre_introduccion_en = response.data.datos_pagina_idioma[0].cierre_introduccion
        this.cierre_link_pagina = response.data.cierre_link_pagina
        this.cierre_texto_color = response.data.cierre_texto_color
        this.cierre_fondo_color = response.data.cierre_fondo_color
        this.cierre_formato = response.data.cierre_formato
        this.cierre_activo = response.data.cierre_activo

        if (response.data.cabecera_imagen_desktop) {
          document.getElementById('cabecera_imagen_desktop_enlace').href = process.env.IMAGES_URL + response.data.cabecera_imagen_desktop
          document.getElementById('cabecera_imagen_desktop_enlace').text = '>> ' + response.data.cabecera_imagen_desktop
          document.getElementById('cabecera_imagen_desktop_eliminar').text = '[Eliminar]'
        }
        if (response.data.cabecera_imagen_mobile) {
          document.getElementById('cabecera_imagen_mobile_enlace').href = process.env.IMAGES_URL + response.data.cabecera_imagen_mobile
          document.getElementById('cabecera_imagen_mobile_enlace').text = '>> ' + response.data.cabecera_imagen_mobile
          document.getElementById('cabecera_imagen_mobile_eliminar').text = '[Eliminar]'
        }
        if (response.data.cabecera_video) {
          document.getElementById('cabecera_video_enlace').href = process.env.IMAGES_URL + response.data.cabecera_video
          document.getElementById('cabecera_video_enlace').text = '>> ' + response.data.cabecera_video
          document.getElementById('cabecera_video_eliminar').text = '[Eliminar]'
        }
        if (response.data.cierre_imagen_desktop) {
          document.getElementById('cierre_imagen_desktop_enlace').href = process.env.IMAGES_URL + response.data.cierre_imagen_desktop
          document.getElementById('cierre_imagen_desktop_enlace').text = '>> ' + response.data.cierre_imagen_desktop
          document.getElementById('cierre_imagen_desktop_eliminar').text = '[Eliminar]'
        }
        if (response.data.cierre_imagen_mobile) {
          document.getElementById('cierre_imagen_mobile_enlace').href = process.env.IMAGES_URL + response.data.cierre_imagen_mobile
          document.getElementById('cierre_imagen_mobile_enlace').text = '>> ' + response.data.cierre_imagen_mobile
          document.getElementById('cierre_imagen_mobile_eliminar').text = '[Eliminar]'
        }
        if (response.data.cierre_video) {
          document.getElementById('cierre_video_enlace').href = process.env.IMAGES_URL + response.data.cierre_video
          document.getElementById('cierre_video_enlace').text = '>> ' + response.data.cierre_video
          document.getElementById('cierre_video_eliminar').text = '[Eliminar]'
        }
        if (response.data.datos_pagina_idioma[0].usar_cabecera_imagen_desktop_espanol === true) { document.getElementById('div_cabecera_imagen_desktop_en').hidden = true }
        if (response.data.datos_pagina_idioma[0].usar_cabecera_imagen_mobile_espanol === true) { document.getElementById('div_cabecera_imagen_mobile_en').hidden = true }
        if (response.data.datos_pagina_idioma[0].usar_cabecera_video_espanol === true) { document.getElementById('div_cabecera_video_en').hidden = true }
        if (response.data.datos_pagina_idioma[0].usar_cierre_imagen_desktop_espanol === true) { document.getElementById('div_cierre_imagen_desktop_en').hidden = true }
        if (response.data.datos_pagina_idioma[0].usar_cierre_imagen_mobile_espanol === true) { document.getElementById('div_cierre_imagen_mobile_en').hidden = true }
        if (response.data.datos_pagina_idioma[0].usar_cierre_video_espanol === true) { document.getElementById('div_cierre_video_en').hidden = true }
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
.badge{
  font-size:17px !important;
  font-weight: normal !important;
}
  #p-errors{
    color: red;
  }
  .colorpicker{
    margin-top: 5px;
  }
</style>
