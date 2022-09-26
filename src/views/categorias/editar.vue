<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Edición de Categoría</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action @submit.prevent="actualizarCategoria">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombreen" placeholder="Nombre (Inglés)">
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
  name: 'editarCategoria',
  components: { 'switches': Switches },
  data () {
    return {
      nombre: '',
      nombreen: '',
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
    actualizarCategoria () {
      let idc = this.$route.params.idcat
      let nombre = this.nombre
      let nombreen = this.nombreen
      let activo = this.activo
      this.errors = []

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
        axios
          .put(process.env.API_URL + 'categoria', { id_categoria: idc, nombre: nombre, nombre_en: nombreen, activo: activo })
          .then((response) => this.$router.push('/categorias?mensaje=actualizada'))
          .catch(err => console.log(err))
      }
    }
  },
  mounted () {
    let idc = this.$route.params.idcat
    axios
      .post(process.env.API_URL + 'detalle-categoria', {id_categoria: idc})
      .then((response) => {
        this.nombre = response.data.nombre
        this.nombreen = response.data.categoria_idiomas[0].nombre
        this.activo = response.data.activo
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
