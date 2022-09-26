<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-badge v-if="this.$route.query.mensaje == 'registrado'" variant="success mb-3">Usuario registrado correctamente</b-badge>
            <b-badge v-if="this.$route.query.mensaje == 'actualizado'" variant="success mb-3">Usuario actualizado correctamente</b-badge>
            <h4 class="card-title">Listado de Usuarios</h4>
            <p class="card-description">
              Para registrar un nuevo usuario, ingrese <router-link to="/usuarios/registrar">aquí</router-link>
            </p>
            <div class="table-responsive">
            <table class="table b-table table-striped table-hover">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Es super admin</th>
                      <th>Token</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in items" :key="item.id">
                      <td>{{item.id}}</td>
                      <td>{{item.nombre_usuario}}</td>
                      <td>{{item.super_admin}}</td>
                      <td>{{item.token}}</td>
                      <td>
                        <div class="icon-div" v-if="item.id > 1"><router-link :to="{ name: 'editarUsuario', params: { iduser: item.id }}"><i title="Editar" class="mdi mdi-grease-pencil"></i></router-link></div>
                        <div class="icon-div cursor-pointer" v-if="item.id > 1" v-on:click="eliminarUsuario(item.id)"><i title="Eliminar" class="mdi mdi-delete-forever"></i></div>
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
  name: 'usuarios',
  data () {
    return {
      items: []
    }
  },
  methods: {
    eliminarUsuario: function (id, event) {
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
                .post(process.env.API_URL + 'eliminar-usuario', { id: id })
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
      .get(process.env.API_URL + 'usuarios')
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
