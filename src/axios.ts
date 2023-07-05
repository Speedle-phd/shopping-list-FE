import axios from 'axios'
import Cookies from 'universal-cookie'
axios.defaults.baseURL = 'https://shopping-list-api-gtv3.onrender.com/api/v1'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/api/v1'

axios.interceptors.request.use(function (req) {
   const cookies = new Cookies()
   const user = cookies.get('panda-eats-cookies') 
   if (user) {
      const { token } = user
      req.headers.authorization = `Bearer ${token}`
      return req
   }
   return req
})