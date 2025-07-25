import axios from "axios"
import SERVER_URL from "../SERVER_URL"

const api = axios.create({
  baseURL: SERVER_URL.origin,
})

export default api
