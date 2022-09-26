<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Edición de Noticia</h6>
            <h4 class="card-title">Datos de la Noticia</h4>
            <b-badge id="badge-proceda" v-if="this.$route.query.next === 'true'" variant="success mb-3">Noticia registrada correctamente, proceda con las imágenes.</b-badge>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action class="form" enctype="multipart/form-data" @submit.prevent="actualizarNoticia">
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
                      <input type="text" v-model="titulo" class="form-control" placeholder="Título"> </div>
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
                          // file_picker_types: 'image media',
                          // file_picker_callback: uploadImagenRichText
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
                        <input type="text" id="titulo_en" v-model="titulo_en" class="form-control" placeholder="Título en Inglés"> </div>
                    </div>
                    <div class="input-group">
                      <editor id="texto_en" v-model="texto_en"
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
                          // file_picker_types: 'image media',
                          // file_picker_callback: uploadImagenRichText
                        }"
                      />
                  </div>
                  <div class="form-group mt-3">
                    <div class="input-group">
                      <h6>Usar video español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_video_default" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_enlace_video_en" class="form-group">
                    <div class="input-group">
                      <input type="text" id="enlace_video_en" v-model="enlace_video_en" class="form-control" placeholder="Enlace de video. Ej: https://youtube.com/xxxxxxxx" />
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
                    <button class="btn btn-primary submit-btn">Actualizar</button>
                  </div>
                  <b-badge id="bagde_actualizada" variant="success mb-3" hidden>Noticia actualizada correctamente</b-badge>
              </div>
            <h4 class="card-title">Imágenes de la Noticia</h4>
              <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActiveImgs('espaniol_imgs')" :class="{ active: isActiveImgs('espaniol_imgs') }" href="#espaniol_imgs">Español</a>
                </li>
                <li id="imagenes_ingles" class="nav-item" hidden>
                  <a class="nav-link" @click.prevent="setActiveImgs('ingles_imgs')" :class="{ active: isActiveImgs('ingles_imgs') }" href="#ingles_imgs">Inglés</a>
                </li>
              </ul>
              <div class="tab-content py-3" id="seccion_imagenes">
                <div class="tab-pane fade" :class="{ 'active show': isActiveImgs('espaniol_imgs') }" id="espaniol_imgs">
                  <div class="form-group">
                    <div class="input-group">
                      <span>Imagen Preview Noticia (400 x 266)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_preview" v-on:change="uploadImagenNoticia($event, 'imagen_preview', 0)" class="form-control" placeholder="Imagen Preview" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_preview_enlace" href="" target="_blank"></a>
                      <a id="imagen_preview_eliminar" v-on:click="eliminarImagen($event, 'imagen_preview', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Imagen Detalle Noticia Desktop (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_detalle" v-on:change="uploadImagenNoticia($event, 'imagen_detalle', 0)" class="form-control" placeholder="Imagen Detalle" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_detalle_enlace" href="" target="_blank"></a>
                      <a id="imagen_detalle_eliminar" v-on:click="eliminarImagen($event, 'imagen_detalle', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Imagen Detalle Noticia Mobile (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_detalle_mobile" v-on:change="uploadImagenNoticia($event, 'imagen_detalle_mobile', 0)" class="form-control" placeholder="Imagen Detalle Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_detalle_mobile_enlace" href="" target="_blank"></a>
                      <a id="imagen_detalle_mobile_eliminar" v-on:click="eliminarImagen($event, 'imagen_detalle_mobile', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Imagen Destacada Desktop (1920 x 1080)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_destacado" v-on:change="uploadImagenNoticia($event, 'imagen_destacado', 0)" class="form-control" placeholder="Imagen Destacado" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_destacado_enlace" href="" target="_blank"></a>
                      <a id="imagen_destacado_eliminar" v-on:click="eliminarImagen($event, 'imagen_destacado', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <span>Imagen Destacada Mobile (1024 x 1024)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_destacado_mobile" v-on:change="uploadImagenNoticia($event, 'imagen_destacado_mobile', 0)" class="form-control" placeholder="Imagen Destacado Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_destacado_mobile_enlace" href="" target="_blank"></a>
                      <a id="imagen_destacado_mobile_eliminar" v-on:click="eliminarImagen($event, 'imagen_destacado_mobile', 0)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" :class="{ 'active show': isActiveImgs('ingles_imgs') }" id="ingles_imgs">
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar imagen preview español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def1_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_imagen_preview_en" class="form-group">
                    <div class="input-group">
                      <span>Imagen Preview Noticia (400 x 266)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" class="form-control" id="imagen_preview_en" v-on:change="uploadImagenNoticia($event, 'imagen_preview', 1)" placeholder="Imagen Preview" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_preview_en_enlace" href="" target="_blank"></a>
                      <a id="imagen_preview_en_eliminar" v-on:click="eliminarImagen($event, 'imagen_preview', 1)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar imagen detalle (desktop) español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def2_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_imagen_detalle_en" class="form-group">
                    <div class="input-group">
                      <span>Imagen Detalle Noticia Desktop (960 x 540)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_detalle_en" v-on:change="uploadImagenNoticia($event, 'imagen_detalle', 1)" class="form-control" placeholder="Imagen Detalle" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_detalle_en_enlace" href="" target="_blank"></a>
                      <a id="imagen_detalle_en_eliminar" v-on:click="eliminarImagen($event, 'imagen_detalle', 1)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar imagen detalle (mobile) español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def2_mobile_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_imagen_detalle_mobile_en" class="form-group">
                    <div class="input-group">
                      <span>Imagen Detalle Noticia Mobile (767 x 431)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_detalle_mobile_en" v-on:change="uploadImagenNoticia($event, 'imagen_detalle_mobile', 1)" class="form-control" placeholder="Imagen Detalle Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_detalle_mobile_en_enlace" href="" target="_blank"></a>
                      <a id="imagen_detalle_mobile_en_eliminar" v-on:click="eliminarImagen($event, 'imagen_detalle_mobile', 1)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar imagen destacado (desktop) español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def3_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_imagen_destacado_en" class="form-group">
                    <div class="input-group">
                      <span>Imagen Destacada Desktop (1920 x 1080)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_destacado_en" v-on:change="uploadImagenNoticia($event, 'imagen_destacado', 1)" class="form-control" placeholder="Imagen Destacado" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_destacado_en_enlace" href="" target="_blank"></a>
                      <a id="imagen_destacado_en_eliminar" v-on:click="eliminarImagen($event, 'imagen_destacado', 1)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <h6>Usar imagen destacado (mobile) español</h6>
                    </div>
                    <div class="input-group">
                      <switches v-model="enabled_def3_mobile_en" theme="bootstrap" color="primary"></switches>
                    </div>
                  </div>
                  <div id="div_imagen_destacado_mobile_en" class="form-group">
                    <div class="input-group">
                      <span>Imagen Destacada Mobile (1024 x 1024)</span>
                    </div>
                    <div class="input-group">
                      <input type="file" id="imagen_destacado_mobile_en" v-on:change="uploadImagenNoticia($event, 'imagen_destacado_mobile', 1)" class="form-control" placeholder="Imagen Destacado Mobile" />
                    </div>
                    <div class="input-group">
                      <a id="imagen_destacado_mobile_en_enlace" href="" target="_blank"></a>
                      <a id="imagen_destacado_mobile_en_eliminar" v-on:click="eliminarImagen($event, 'imagen_destacado_mobile', 1)" class="eliminar_imagen ml-3" href="javascript:void(0);"></a>
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
  name: 'editarNoticia',
  components: { 'editor': Editor, 'switches': Switches },
  data () {
    return {
      API_URL: process.env.API_URL,
      TINY_EDITOR_KEY: process.env.TINY_EDITOR_KEY,
      titulo: '',
      texto: '',
      titulo_en: '',
      texto_en: '',
      enlace_video: '',
      enlace_video_en: '',
      palabras_clave: '',
      palabras_clave_en: '',
      nombre_medio: '',
      nombre_medio_en: '',
      link_noticia_medio: '',
      link_noticia_medio_en: '',
      categoria_seleccionada: null,
      categoriase_seleccionada: null,
      pagina_seleccionada: null,
      tipo_noticia_seleccionada: null,
      categorias: [],
      categoriasSE: [],
      paginas: [],
      enabled_activo: true,
      enabled_destacado: true,
      enabled_flaghome: true,
      enabled_video_default: true,
      enabled_def1_en: true,
      enabled_def2_en: true,
      enabled_def2_mobile_en: true,
      enabled_def3_en: true,
      enabled_def3_mobile_en: true,
      activeItem: 'espaniol',
      activeItemImgs: 'espaniol_imgs',
      errors: []
    }
  },
  watch: {
    enabled_video_default (newValue) {
      if (newValue === true) {
        document.getElementById('div_enlace_video_en').hidden = true
      } else {
        document.getElementById('div_enlace_video_en').hidden = false
      }
    },
    enabled_def1_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_imagen_preview_en').hidden = true
      } else {
        document.getElementById('div_imagen_preview_en').hidden = false
      }
    },
    enabled_def2_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_imagen_detalle_en').hidden = true
      } else {
        document.getElementById('div_imagen_detalle_en').hidden = false
      }
    },
    enabled_def2_mobile_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_imagen_detalle_mobile_en').hidden = true
      } else {
        document.getElementById('div_imagen_detalle_mobile_en').hidden = false
      }
    },
    enabled_def3_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_imagen_destacado_en').hidden = true
      } else {
        document.getElementById('div_imagen_destacado_en').hidden = false
      }
    },
    enabled_def3_mobile_en (newValue) {
      if (newValue === true) {
        document.getElementById('div_imagen_destacado_mobile_en').hidden = true
      } else {
        document.getElementById('div_imagen_destacado_mobile_en').hidden = false
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
    isActiveImgs (menuItem) {
      return this.activeItemImgs === menuItem
    },
    setActiveImgs (menuItem) {
      this.activeItemImgs = menuItem
    },
    actualizarNoticia () {
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
        let idnot = this.$route.params.idnot
        var dataJson = {
          id_noticia: idnot,
          titulo: this.titulo,
          texto: this.texto,
          enlace_video: this.enlace_video,
          palabras_clave: this.palabras_clave,
          titulo_en: this.titulo_en,
          texto_en: this.texto_en,
          usar_video_detalle_defaulr: this.enabled_def3,
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
          usar_imagen_preview_default: this.enabled_def1_en,
          usar_imagen_detalle_default: this.enabled_def2_en,
          usar_imagen_detalle_mobile_default: this.enabled_def2_mobile_en,
          usar_imagen_destacado_default: this.enabled_def3_en,
          usar_imagen_destacado_mobile_default: this.enabled_def3_mobile_en,
          usar_video_detalle_preview: this.enabled_video_default,
          activo: this.enabled_activo,
          id_usuario: localStorage.getItem('userid')
        }
        axios
          .put(process.env.API_URL + 'noticia', dataJson)
          .then((response) => {
            // this.$router.push('/noticias/editar/' + idnot + '?mensaje=actualizada')
            document.getElementById('bagde_actualizada').hidden = false
            setTimeout(function () {
              const el = document.getElementById('bagde_actualizada')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                setTimeout(function () {
                  document.getElementById('bagde_actualizada').hidden = true
                  console.log(response.data.idioma_existe)
                  if (response.data.idioma_existe === true) {
                    document.getElementById('imagenes_ingles').hidden = false
                  } else {
                    document.getElementById('imagenes_ingles').hidden = true
                  }
                  // console.log(document.getElementById('titulo_en').value)
                  // if (document.getElementById('titulo_en').value !== '' && document.getElementById('texto_en').value !== '') {
                  //  document.getElementById('seccion_imagenes').hidden = false
                  // }
                }, 2000)
              }
            }, 300)
          })
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
              let idnot = this.$route.params.idnot
              axios
                .post(process.env.API_URL + 'eliminarimagen', { id_noticia: idnot, id_idioma: idioma, campo: campo })
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
    uploadImagenNoticia (event, campo, idioma) {
      var bodyFormData = new FormData()
      let idnot = this.$route.params.idnot
      bodyFormData.append('id_noticia', idnot)
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
        url: process.env.API_URL + 'subirimagen',
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
    if (this.$route.query.next === 'true') {
      setTimeout(function () {
        document.getElementById('badge-proceda').hidden = true
        const el = document.getElementById('seccion_imagenes')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 1000)
    }
    let idnot = this.$route.params.idnot
    axios
      .get(process.env.API_URL + 'categorias')
      .then((response) => {
        this.categorias = response.data
        axios
          .get(process.env.API_URL + 'categoriasse')
          .then((response) => {
            this.categoriasSE = response.data
            axios
              .get(process.env.API_URL + 'paginas-selector')
              .then((response) => {
                this.paginas = response.data
                axios
                  .post(process.env.API_URL + 'detalle-noticia-back', { id_noticia: idnot })
                  .then((response) => {
                    this.titulo = response.data.titulo
                    this.texto = response.data.texto
                    this.enlace_video = response.data.link_video_detalle
                    this.palabras_clave = response.data.palabras_clave
                    this.nombre_medio = response.data.nombre_medio
                    this.link_noticia_medio = response.data.link_noticia_medio
                    this.categoria_seleccionada = parseInt(response.data.id_categoria)
                    this.categoriase_seleccionada = parseInt(response.data.id_categoriase)
                    this.pagina_seleccionada = response.data.id_pagina
                    this.tipo_noticia_seleccionada = parseInt(response.data.tipo_noticia)
                    if (response.data.link_imagen_preview) {
                      document.getElementById('imagen_preview_enlace').href = process.env.IMAGES_URL + response.data.link_imagen_preview
                      document.getElementById('imagen_preview_enlace').text = '>> ' + response.data.link_imagen_preview
                      document.getElementById('imagen_preview_eliminar').text = '[Eliminar]'
                    }
                    if (response.data.link_imagen_detalle) {
                      document.getElementById('imagen_detalle_enlace').href = process.env.IMAGES_URL + response.data.link_imagen_detalle
                      document.getElementById('imagen_detalle_enlace').text = '>> ' + response.data.link_imagen_detalle
                      document.getElementById('imagen_detalle_eliminar').text = '[Eliminar]'
                    }
                    if (response.data.link_imagen_detalle_mobile) {
                      document.getElementById('imagen_detalle_mobile_enlace').href = process.env.IMAGES_URL + response.data.link_imagen_detalle_mobile
                      document.getElementById('imagen_detalle_mobile_enlace').text = '>> ' + response.data.link_imagen_detalle_mobile
                      document.getElementById('imagen_detalle_mobile_eliminar').text = '[Eliminar]'
                    }
                    if (response.data.link_imagen_destacado) {
                      document.getElementById('imagen_destacado_enlace').href = process.env.IMAGES_URL + response.data.link_imagen_destacado
                      document.getElementById('imagen_destacado_enlace').text = '>> ' + response.data.link_imagen_destacado
                      document.getElementById('imagen_destacado_eliminar').text = '[Eliminar]'
                    }
                    if (response.data.link_imagen_destacado_mobile) {
                      document.getElementById('imagen_destacado_mobile_enlace').href = process.env.IMAGES_URL + response.data.link_imagen_destacado_mobile
                      document.getElementById('imagen_destacado_mobile_enlace').text = '>> ' + response.data.link_imagen_destacado_mobile
                      document.getElementById('imagen_destacado_mobile_eliminar').text = '[Eliminar]'
                    }
                    this.enabled_activo = response.data.activo
                    this.enabled_destacado = response.data.destacado
                    this.enabled_flaghome = response.data.flag_home
                    if (response.data.noticia_idiomas[0]) {
                      document.getElementById('imagenes_ingles').hidden = false
                      this.titulo_en = response.data.noticia_idiomas[0].titulo
                      this.texto_en = response.data.noticia_idiomas[0].texto
                      this.enlace_video_en = response.data.noticia_idiomas[0].link_video_detalle
                      this.palabras_clave_en = response.data.noticia_idiomas[0].palabras_clave
                      this.nombre_medio_en = response.data.noticia_idiomas[0].nombre_medio
                      this.link_noticia_medio_en = response.data.noticia_idiomas[0].link_noticia_medio
                      if (response.data.noticia_idiomas[0].link_imagen_preview) {
                        document.getElementById('imagen_preview_en_enlace').href = process.env.IMAGES_URL + response.data.noticia_idiomas[0].link_imagen_preview
                        document.getElementById('imagen_preview_en_enlace').text = '>> ' + response.data.noticia_idiomas[0].link_imagen_preview
                        document.getElementById('imagen_preview_en_eliminar').text = '[Eliminar]'
                      }
                      if (response.data.noticia_idiomas[0].link_imagen_detalle) {
                        document.getElementById('imagen_detalle_en_enlace').href = process.env.IMAGES_URL + response.data.noticia_idiomas[0].link_imagen_detalle
                        document.getElementById('imagen_detalle_en_enlace').text = '>> ' + response.data.noticia_idiomas[0].link_imagen_detalle
                        document.getElementById('imagen_detalle_en_eliminar').text = '[Eliminar]'
                      }
                      if (response.data.noticia_idiomas[0].link_imagen_detalle_mobile) {
                        document.getElementById('imagen_detalle_mobile_en_enlace').href = process.env.IMAGES_URL + response.data.noticia_idiomas[0].link_imagen_detalle_mobile
                        document.getElementById('imagen_detalle_mobile_en_enlace').text = '>> ' + response.data.noticia_idiomas[0].link_imagen_detalle_mobile
                        document.getElementById('imagen_detalle_mobile_en_eliminar').text = '[Eliminar]'
                      }
                      if (response.data.noticia_idiomas[0].link_imagen_destacado) {
                        document.getElementById('imagen_destacado_en_enlace').href = process.env.IMAGES_URL + response.data.noticia_idiomas[0].link_imagen_destacado
                        document.getElementById('imagen_destacado_en_enlace').text = '>> ' + response.data.noticia_idiomas[0].link_imagen_destacado
                        document.getElementById('imagen_destacado_en_eliminar').text = '[Eliminar]'
                      }
                      if (response.data.noticia_idiomas[0].link_imagen_destaca) {
                        document.getElementById('imagen_destacado_mobile_en_enlace').href = process.env.IMAGES_URL + response.data.noticia_idiomas[0].link_imagen_destacado_mobile
                        document.getElementById('imagen_destacado_mobile_en_enlace').text = '>> ' + response.data.noticia_idiomas[0].link_imagen_destaca
                        document.getElementById('imagen_destacado_mobile_en_eliminar').text = '[Eliminar]'
                      }
                      this.enabled_video_default = response.data.noticia_idiomas[0].usar_video_detalle_preview
                      this.enabled_def1_en = response.data.noticia_idiomas[0].usar_imagen_preview_default
                      if (this.enabled_def1_en === true) { document.getElementById('div_imagen_preview_en').hidden = true }
                      this.enabled_def2_en = response.data.noticia_idiomas[0].usar_imagen_detalle_default
                      if (this.enabled_def2_en === true) { document.getElementById('div_imagen_detalle_en').hidden = true }
                      this.enabled_def2_mobile_en = response.data.noticia_idiomas[0].usar_imagen_detalle_mobile_default
                      if (this.enabled_def2_mobile_en === true) { document.getElementById('div_imagen_detalle_mobile_en').hidden = true }
                      this.enabled_def3_en = response.data.noticia_idiomas[0].usar_imagen_destacado_default
                      if (this.enabled_def3_en === true) { document.getElementById('div_imagen_destacado_en').hidden = true }
                      this.enabled_def3_mobile_en = response.data.noticia_idiomas[0].usar_imagen_destacado_mobile_default
                      if (this.enabled_def3_mobile_en === true) { document.getElementById('div_imagen_destacado_mobile_en').hidden = true }
                    } else {
                      document.getElementById('imagenes_ingles').hidden = true
                    }
                  })
              })
          })
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
</style>
