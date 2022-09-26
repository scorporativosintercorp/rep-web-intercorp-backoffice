<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-badge v-if="this.$route.query.mensaje == 'registrada'" variant="success mb-3">Testimonio registrado correctamente</b-badge>
            <b-badge v-if="this.$route.query.mensaje == 'actualizada'" variant="success mb-3">Testimonio actualizado correctamente</b-badge>
            <h4 class="card-title">Listado de Testimonios</h4>
            <p class="card-description">
              Para registrar una nueva testimonio, ingrese <router-link to="/testimonios/registrar">aquí</router-link>
            </p>
            <div class="table-responsive">
            <table class="table b-table table-striped table-hover">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Cargo</th>
                      <th>Activo</th>
                      <th>Fecha Creación</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in items" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.nombre}}</td>
                      <td>{{item.cargo}}</td>
                      <td>{{item.activo}}</td>
                      <td>{{ item.fecha_hora_creacion | moment("DD/MM/YYYY HH:mm:ss") }}</td>
                      <td>
                        <div class="icon-div"><router-link :to="{ name: 'editarTestimonio', params: { idtes: item.id }}"><i title="Editar" class="mdi mdi-grease-pencil"></i></router-link></div>
                        <div class="icon-div cursor-pointer" v-on:click="eliminarTestimonio(item.id)"><i title="Eliminar" class="mdi mdi-delete-forever"></i></div>
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
  name: 'testimonios',
  data () {
    return {
      items: [],
      trashseleccionado: null
    }
  },
  methods: {
    eliminarTestimonio: function (id, event) {
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
                .post(process.env.API_URL + 'eliminar-testimonio', { id_testimonio: id })
                .then((response) => window.location.reload())
                .catch(err => console.log(err))
            }
          }
        }
      )
    }
  },
  mounted () {
    var clase = this
    axios
      .post(process.env.API_URL + 'listar-testimonios')
      .then((response) => {
        this.items = response.data
        console.log('SAPEEE')
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
