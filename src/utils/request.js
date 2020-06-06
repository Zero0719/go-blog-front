/* eslint-disable camelcase */
import axios from 'axios'
import Qs from 'qs'

export default {
  authRequest (options) {
    const user = JSON.parse(localStorage.getItem('user'))
    var axios_instance = axios.create({
      baseURL: 'http://api.blog.kayuho.com',
      // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
      transformRequest: [function (data) {
        data = Qs.stringify(data)
        return data
      }],
      // 设置Content - Type
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    options.headers = {
      Authorization: 'Bearer ' + user.token
    }
    return axios_instance.request(options)
  }
}
