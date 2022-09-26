<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-badge v-if="this.$route.query.mensaje == 'actualizada'" variant="success mb-3">Noticia actualizada correctamente</b-badge>
            <h4 class="card-title">Listado de Noticias</h4>
            <p class="card-description">
              Para registrar una nueva noticia, ingrese <router-link to="/noticias/registrar">aquí</router-link>
            </p>
            <div class="table-responsive">
              <table class="table b-table table-striped table-hover">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Página</th>
                          <th>Destacado</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in items" :key="item.id">
                          <td>{{item.id}}</td>
                          <td class="ellipsis--tr">{{item.titulo}}</td>
                          <td class="ellipsis--tr" v-if="item.pagina != null">{{item.pagina.nombre}}</td>
                          <td class="ellipsis--tr" v-else></td>
                          <td>{{item.destacado}}</td>
                          <td>
                            <div class="icon-div"><router-link :to="{ name: 'editarNoticia', params: { idnot: item.id }}"><i title="Editar" class="mdi mdi-grease-pencil"></i></router-link></div>
                            <div v-bind:id="'accion_desactivar_' + item.id" v-if="item.activo == 0" class="icon-div cursor-pointer" v-on:click="cambiarEstadoNoticia(item.id, 1)"><i title="Activar" class="mdi mdi-checkbox-marked-circle"></i></div>
                            <div v-bind:id="'accion_activar_' + item.id" v-if="item.activo == 1" class="icon-div cursor-pointer" v-on:click="cambiarEstadoNoticia(item.id, 0)"><i title="Desactivar" class="mdi mdi-cancel"></i></div>
                            <div class="icon-div cursor-pointer" v-on:click="eliminarNoticia(item.id)"><i title="Eliminar" class="mdi mdi-delete-forever"></i></div>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios'
export default {
  name: 'noticias',
  data () {
    return {
      items: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: '',

      page: 1,
      count: 0,
      pageSize: 20,

      pageSizes: [20, 50, 100]
    }
  },
  methods: {
    eliminarNoticia: function (id, event) {
      this.$confirm(
        {
          message: '¿Está seguro(a) de eliminar el registro?',
          button: {
            no: 'No',
            yes: 'Si'
          },
          callback: confirm => {
            if (confirm) {
              axios
                .post(process.env.API_URL + 'eliminar-noticia', { id_noticia: id })
                .then((response) => window.location.reload())
                .catch(err => console.log(err))
            }
          }
        }
      )
    },
    cambiarEstadoNoticia: function (id, accion, event) {
      var mensaje = ''
      if (accion === 1) {
        mensaje = '¿Desea activar la noticia?'
      } else {
        mensaje = '¿Desea desactivar la noticia?'
      }
      this.$confirm(
        {
          message: mensaje,
          button: {
            no: 'No',
            yes: 'Si'
          },
          callback: confirm => {
            if (confirm) {
              axios
                .post(process.env.API_URL + 'cambiar-estado-noticia', { id_noticia: id, accion: accion })
                .then((response) => window.location.reload())
                .catch(err => console.log(err))
            }
          }
        }
      )
    },
    obtenerNoticias () {
      var clase = this
      var params = {
        pagina: this.page,
        cantidad: this.pageSize
      }
      axios
        .post(process.env.API_URL + 'listar-noticias', params)
        .then((response) => {
          const { noticias, totalItems } = response.data
          this.items = noticias
          this.count = totalItems
          console.log(response.data)
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            clase.$store.dispatch('logout')
            clase.$router.push('/login')
          } else {
            // Handle error however you want
          }
        })
    },

    handlePageChange (value) {
      this.page = value
      this.obtenerNoticias()
    },

    handlePageSizeChange (event) {
      this.pageSize = event.target.value
      this.page = 1
      this.obtenerNoticias()
    }
  },
  mounted () {
    this.obtenerNoticias()
  }
}
</script>

<style scoped lang="scss">
.icon-div {
    display: inline-block;
}
.icon-div i {
    display: inline-block;
    font-size: 20px;
    width: 40px;
    text-align: left;
    color: #2196f3;
}
.cursor-pointer{
  cursor: pointer;
}
.badge{
  font-size:17px !important;
  font-weight: normal !important;
}
</style>
