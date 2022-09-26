<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Registro de Noticia</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action class="form" enctype="multipart/form-data" @submit.prevent="grabarNoticia">
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
                      <input type="text" v-model="titulo" class="form-control" placeholder="Título">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <editor v-model="texto"
                        :api-key="TINY_EDITOR_KEY"
                        :init="{
                          width: '100%',
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image media charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount | code preview'
                          ],
                          toolbar:
                            'undo redo | formatselect | link image media | bold italic underline backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help | code preview',
                          image_title: true,
                          images_upload_url: API_URL + 'subirimagen-richtext',
                          images_upload_handler: uploadImagenRichText
                        }"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="enlace_video" class="form-control" placeholder="Enlace de video. Ej: https://youtube.com/xxxxxxxx" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="palabras_clave" class="form-control" placeholder="Palabras clave"> </div>
                  </div>
                </div>
                <div class="tab-pane fade" :class="{ 'active show': isActive('ingles') }" id="ingles">
                    <div class="form-group">
                      <div class="input-group">
                        <input type="text" v-model="titulo_en" class="form-control" placeholder="Título en Inglés"> </div>
                    </div>
                    <div class="input-group">
                      <editor v-model="texto_en"
                        :api-key="TINY_EDITOR_KEY"
                        :init="{
                          width: '100%',
                          height: 400,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image media charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount | code preview'
                          ],
                          toolbar:
                            'undo redo | formatselect | link image media | bold italic underline backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help | code preview',
                          image_title: true,
                          images_upload_url: API_URL + 'subirimagen-richtext',
                          images_upload_handler: uploadImagenRichText
                        }"
                      />
                  </div>
                  <div class="form-group mt-3">
                    <div class="input-group">
                      <h6>Usar video español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def3" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="enlace_video_en" class="form-control" placeholder="Enlace de video. Ej: https://youtube.com/xxxxxxxx" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" v-model="palabras_clave_en" class="form-control" placeholder="Palabras clave"> </div>
                  </div>
                </div>
                  <div class="form-group">
                    <div class="input-group">
                      <b-form-select text="Página" v-model="tipo_noticia_seleccionada">
                        <b-form-select-option :value="null">Seleccione el Tipo Noticia</b-form-select-option>
                        <b-form-select-option :value="1">Noticia</b-form-select-option>
                        <b-form-select-option :value="2">Medio</b-form-select-option>
                        <b-form-select-option :value="3">Comunicados Corporativos</b-form-select-option>
                        <b-form-select-option :value="4">Sumando Esfuerzos | COVID-19</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <b-form-select text="Categoría" v-model="categoria_seleccionada">
                        <b-form-select-option :value="null">Seleccione una Categoría</b-form-select-option>
                        <b-form-select-option v-for="item_categoria in categorias"
                                          :key="item_categoria.id" :value="item_categoria.id">{{item_categoria.nombre}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <b-form-select text="Categoría de Sumando Esfuerzos" v-model="categoriase_seleccionada">
                        <b-form-select-option :value="null">Seleccione una Categoría de Sumando Esfuerzos</b-form-select-option>
                        <b-form-select-option v-for="item_categoriase in categoriasSE"
                                          :key="item_categoriase.id" :value="item_categoriase.id">{{item_categoriase.nombre}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <b-form-select text="Página" v-model="pagina_seleccionada">
                        <b-form-select-option :value="null">Seleccione una Página</b-form-select-option>
                        <b-form-select-option v-for="item_pagina in paginas"
                                          :key="item_pagina.id" :value="item_pagina.id">{{item_pagina.nombre}}</b-form-select-option>
                      </b-form-select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Destacado</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_destacado" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="nombre_medio" placeholder="Nombre de Medio"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="link_noticia_medio" placeholder="Link de Noticia de Medio"> </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Flag Home</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_flaghome" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Activo</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_activo" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn">Enviar</button>
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
  name: 'registrarNoticia',
  components: { 'editor': Editor, 'switches': Switches },
  data () {
    return {
      TINY_EDITOR_KEY: process.env.TINY_EDITOR_KEY,
      categoria_seleccionada: null,
      categoriase_seleccionada: null,
      pagina_seleccionada: null,
      tipo_noticia_seleccionada: null,
      categorias: [],
      categoriasSE: [],
      paginas: [],
      enabled_activo: true,
      enabled_destacado: true,
      enabled_flaghome: false,
      enabled_def1: true,
      enabled_def2: true,
      enabled_def3: true,
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
    grabarNoticia () {
      this.errors = []

      if (!this.titulo) {
        this.errors.push('El título es obligatorio.')
      }
      if (!this.texto) {
        this.errors.push('El texto es obligatorio.')
      }
      if (!this.tipo_noticia_seleccionada) {
        this.errors.push('El tipo de noticia es obligatorio.')
      } else {
        if (this.tipo_noticia_seleccionada === 4) {
          if (!this.categoriase_seleccionada) {
            this.errors.push('Debe seleccionar una categoría de Sumando Esfuerzos.')
          }
        } else if (!this.categoria_seleccionada) {
          this.errors.push('Debe seleccionar una categoría.')
        }
      }

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        var dataJson = {
          titulo: this.titulo,
          texto: this.texto,
          enlace_video: this.enlace_video,
          palabras_clave: this.palabras_clave,
          titulo_en: this.titulo_en,
          texto_en: this.texto_en,
          usar_video_detalle_default: this.enabled_def3,
          enlace_video_en: this.enlace_video_en,
          palabras_clave_en: this.palabras_clave_en,
          categoria: this.categoria_seleccionada,
          categoriase: this.categoriase_seleccionada,
          pagina: this.pagina_seleccionada,
          destacado: this.enabled_destacado,
          tipo_noticia: this.tipo_noticia_seleccionada,
          nombre_medio: this.nombre_medio,
          link_noticia_medio: this.link_noticia_medio,
          flag_home: this.enabled_flaghome,
          activo: this.enabled_activo,
          id_usuario: localStorage.getItem('userid')
        }
        axios
          .post(process.env.API_URL + 'noticia', dataJson)
          .then((response) => this.$router.push('/noticias/editar/' + response.data.id + '?next=true'))
          .catch(err => console.log(err))
      }
    },
    uploadImagenRichText (blobInfo, success, failure, progress) {
      var xhr, formData

      xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', process.env.API_URL + 'subirimagen-richtext')
      xhr.setRequestHeader('x-access-token', localStorage.token)

      xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100)
      }

      xhr.onload = function () {
        var json

        if (xhr.status === 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true })
          return
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status)
          return
        }

        json = JSON.parse(xhr.responseText)

        if (!json || typeof json.imagen !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          return
        }

        success(json.url + json.imagen)
      }

      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
      }

      formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      formData.append('type', 'imagen')

      xhr.send(formData)
    }
  },
  mounted () {
    axios
      .get(process.env.API_URL + 'categorias')
      .then((response) => {
        this.categorias = response.data
      })
    axios
      .get(process.env.API_URL + 'categoriasse')
      .then((response) => {
        this.categoriasSE = response.data
      })
    axios
      .get(process.env.API_URL + 'paginas-selector')
      .then((response) => {
        this.paginas = response.data
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
