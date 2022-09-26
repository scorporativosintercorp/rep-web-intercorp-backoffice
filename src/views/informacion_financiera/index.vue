<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-badge v-if="this.$route.query.mensaje == 'registrada'" variant="success mb-3">Información Financiera registrada correctamente</b-badge>
            <b-badge v-if="this.$route.query.mensaje == 'actualizada'" variant="success mb-3">Información Financiera actualizada correctamente</b-badge>
            <h4 class="card-title">Listado de Información Financiera</h4>
            <p class="card-description">
              Para registrar una nueva Información Financiera, ingrese <router-link to="/informacion_financiera/registrar">aquí</router-link>
            </p>
            <div class="table-responsive">
            <table class="table b-table table-striped table-hover">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Año</th>
                      <th>Trimestre</th>
                      <th>Nombre</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in items" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.anho}}</td>
                      <td>{{item.trimestre}}</td>
                      <td>{{item.nombre}}</td>
                      <td>
                        <div class="icon-div"><router-link :to="{ name: 'editarInformacionFinanciera', params: { idif: item.id }}"><i title="Editar" class="mdi mdi-grease-pencil"></i></router-link></div>
                        <div class="icon-div cursor-pointer" v-on:click="eliminarInformacionFinanciera(item.id)"><i title="Eliminar" class="mdi mdi-delete-forever"></i></div>
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
  name: 'informacionFinanciera',
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
    obtenerIFinanciera () {
      var clase = this
      var params = {
        pagina: this.page,
        cantidad: this.pageSize
      }
      axios
        .post(process.env.API_URL + 'listar-informacion-financiera', params)
        .then((response) => {
          const { ifinanciera, totalItems } = response.data
          this.items = ifinanciera
          this.count = totalItems
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
    eliminarInformacionFinanciera: function (id, event) {
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
                .post(process.env.API_URL + 'eliminar-informacion-financiera', { id_informacion_financiera: id })
                .then((response) => window.location.reload())
                .catch(err => console.log(err))
            }
          }
        }
      )
    },

    handlePageChange (value) {
      this.page = value
      this.obtenerIFinanciera()
    },

    handlePageSizeChange (event) {
      this.pageSize = event.target.value
      this.page = 1
      this.obtenerIFinanciera()
    }
  },
  mounted () {
    this.obtenerIFinanciera()
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
