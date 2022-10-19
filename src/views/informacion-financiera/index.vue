<template>
  <div>
    <div class="mb-8">
      <div class="flex justify-between">
        <h3 class="text-3xl font-medium text-gray-700">Información financiera</h3>
        <router-link to="/agregar-informacion-financiera" class="btn btn-blue">Agregar nueva <i class="fa fa-plus"></i></router-link>
      </div>
    </div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">ID</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Año</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Trimestre</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Nombre</th>
                <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Acciones</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(item, index) in items" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ item.id }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ item.anho }}</td>
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">{{ item.trimestre }}</td>
                <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">{{ item.nombre }}</td>
                <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                  <router-link :to="`/editar-informacion-financiera/idinfo/${item.id}`" :key="item.id" class="text-indigo-600 hover:text-indigo-900">
                    <i class="fa fa-pen" title="Editar"></i>
                  </router-link>
                  <button type="button" class="cursor-pointer" v-on:click="eliminarInformacionFinanciera(item.id)"><i title="Eliminar" class="fa fa-trash"></i></button>
                </td>
                <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" prev-text="Prev" next-text="Next" @change="handlePageChange"></b-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  // import Vue from "vue";
  export default {
    name: "informacionFinanciera",
    data() {
      return {
        items: [],
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
        page: 1,
        count: 0,
        pageSize: 100,
        pageSizes: [20, 50, 100],
        API_URL: import.meta.env.VITE_API_URL,
        TINY_EDITOR_KEY: import.meta.env.VITE_TINY_EDITOR_KEY,
        token: localStorage.getItem("token"),
      };
    },
    methods: {
      obtenerIFinanciera() {
        const clase = this;
        const params = {
          pagina: this.page,
          cantidad: this.pageSize,
        };
        const reqheaders = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "x-access-token",
            "x-access-token": this.token,
          },
        };

        axios
          .post(import.meta.env.VITE_API_URL + "listar-informacion-financiera", params, reqheaders)
          .then((response) => {
            const {ifinanciera, totalItems} = response.data;
            this.items = ifinanciera;
            this.count = totalItems;
          })
          .catch(function (error) {
            if (error.response && error.response.status === 401) {
              clase.$store.dispatch("logout");
              clase.$router.push("/login");
            } else {
            }
          });
      },
      eliminarInformacionFinanciera(id) {
        if (confirm("¿Está seguro(a) de eliminar el registro?") == true) {
          let dataJson = {
            id_informacion_financiera: id,
          };

          axios({
            method: "post",
            url: this.API_URL + "eliminar-informacion-financiera",
            data: dataJson,
            headers: {
              // "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Headers": "x-access-token",
              "x-access-token": this.token,
            },
          })
            .then((response) => window.location.reload())
            .catch((err) => console.log(err));
        }
      },
      handlePageChange(value) {
        this.page = value;
        this.obtenerIFinanciera();
      },
      handlePageSizeChange(event) {
        this.pageSize = event.target.value;
        this.page = 1;
        this.obtenerIFinanciera();
      },
    },
    mounted() {
      this.obtenerIFinanciera();
    },
  };
</script>
