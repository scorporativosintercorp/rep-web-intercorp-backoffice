import Cookies from 'js-cookie'
import axios from 'axios'
const ENDPOINT_PATH = 'http://localhost:8080/api/'

export default {
  setUserLogged (userLogged) {
    Cookies.set('userLogged', userLogged)
  },
  getUserLogged () {
    return Cookies.get('userLogged')
  },
  login (email, password) {
    const user = { email, password }
    return axios.post(ENDPOINT_PATH + 'auth/login', user)
  }
}
