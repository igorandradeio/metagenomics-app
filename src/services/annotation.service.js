import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class AnnotationService extends BaseService {
  static async annotation(id, params) {
    const token = await localStorage.getItem(TOKEN_NAME)
    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .post(`/projects/${id}/start_annotation/`, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async getAnalysis(id, path) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/projects/${id}/analysis/${path}/`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
