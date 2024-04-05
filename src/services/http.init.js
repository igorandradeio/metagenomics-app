import axios from 'axios'
import { API_URL, TOKEN_NAME } from '@/utils/constants'

export default class Http {
  constructor(status) {
    const token = localStorage.getItem(TOKEN_NAME)

    const headers = status.auth ? { Authorization: `TOKEN ${token}` } : {}
    this.instance = axios.create({
      baseURL: API_URL,
      headers: headers,
    })

    return this.instance
  }
}
