<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-badge v-if="this.$route.query.mensaje == 'registrada'" variant="success mb-3">Página registrada correctamente</b-badge>
            <b-badge v-if="this.$route.query.mensaje == 'actualizada'" variant="success mb-3">Página actualizada correctamente</b-badge>
            <h4 class="card-title">Listado de Páginas</h4>
            <div class="table-responsive">
            <table class="table b-table table-striped table-hover">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Código</th>
                      <th>Activo</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in items" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.nombre}}</td>
                      <td>{{item.codigo}}</td>
                      <td>{{item.activo}}</td>
                      <td>
                        <div class="icon-div"><router-link :to="{ name: 'editarPagina', params: { idpag: item.id }}"><i title="Editar" class="mdi mdi-grease-pencil"></i></router-link></div>
                      </td>
                  </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios'
export default {
  name: 'paginas',
  data () {
    return {
      items: [],
      trashseleccionado: null
    }
  },
  methods: {
  },
  mounted () {
    var clase = this
    axios
      .get(process.env.API_URL + 'listar-paginas')
      .then(response => (this.items = response.data))
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          clase.$store.dispatch('logout')
          clase.$router.push('/login')
        } else {
          // Handle error however you want
        }
      })
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
