import axios from 'axios'

export default {
  authRequest (options) {
    const user = JSON.parse(localStorage.getItem('user'))
    options.headers = {
      Authorization: 'Bearer ' + user.token
    }
    return axios.request(options)
  }
}
