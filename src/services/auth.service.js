import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class AuthService extends BaseService {
  static async login(params) {
    return new Promise((resolve, reject) => {
      this.request()
        .post('/login/', params)
        .then((response) => {
          localStorage.setItem(TOKEN_NAME, response.data.token)
          resolve(response)
        })
        .catch((error) => reject(error.response))
    })
  }

  static async register(params) {
    return new Promise((resolve, reject) => {
      this.request()
        .post('/register/', params)
        .then((response) => {
          localStorage.setItem(TOKEN_NAME, response.data.token)
          resolve(response)
        })
        .catch((error) => reject(error.response))
    })
  }

  static async getMe() {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get('/me/')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem(TOKEN_NAME)
          }
          reject(error.response)
        })
    })
  }

  static async logout() {
    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .post('/logout/')
        .then(() => {
          localStorage.removeItem(TOKEN_NAME)
          resolve('Logging out')
        })
        .catch((error) => reject(error.response))
    })
  }
}
