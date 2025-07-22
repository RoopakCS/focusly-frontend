import axios from "axios"

const api = axios.create({
  baseURL: "http://10.112.22.149:3000",
})

export default api
