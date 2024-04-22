import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class ProjectService extends BaseService {
  static async getProjects() {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get('/project/')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async create(params) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .post('/project/', params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async update(id, params) {
    const token = await localStorage.getItem(TOKEN_NAME)
    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .put(`/project/${id}/`, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async getById(id) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/project/${id}/`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async destroy(id) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .delete(`/project/${id}/`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async getSequencingMethod() {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get('/sequencing-method/')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async getSequencingReadType() {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get('/sequencing-read-type/')
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
