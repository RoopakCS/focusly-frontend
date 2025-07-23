import axios from "axios"
import SERVER_URL from "../SERVER_URL"

const api = axios.create({
  baseURL: `https://${SERVER_URL}`,
})

export default api
