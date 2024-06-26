import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class SampleService extends BaseService {
  static async getSamplesByProject(projectId) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/project/${projectId}/samples/`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async create(params) {
    return new Promise((resolve, reject) => {
      this.request({
        auth: true,
        file: true,
      })
        .post('/sample/', params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async download(id) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/samples/${id}/download/`, {
          responseType: 'blob',
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }
}
