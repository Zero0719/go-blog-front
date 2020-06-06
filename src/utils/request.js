import axios from 'axios'

export default {
  authRequest (options) {
    const user = JSON.parse(localStorage.getItem('user'))
    options.headers = {
      Authorization: 'Bearer ' + user.token
    }
    console.log(options)
    return axios.request(options)
  }
}
