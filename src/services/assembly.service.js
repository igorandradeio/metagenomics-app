import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class AssemblyService extends BaseService {
  static async create(params) {
    return new Promise((resolve, reject) => {
      this.request({
        auth: true,
        file: true,
      })
        .post('/assembly/', params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async assembler(id, params) {
    const token = await localStorage.getItem(TOKEN_NAME)
    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .post(`/projects/${id}/start_assembly/`, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async getAssemblyByProject(projectId) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/project/${projectId}/assembly/`)
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
        .get(`/download/assembly/${id}/`, {
          responseType: 'blob',
        })
        .then((response) => {
          // Function to extract the filename from Content-Disposition header
          const extractFileName = (header) => {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(header)
            if (matches != null && matches[1]) {
              return matches[1].replace(/['"]/g, '')
            }
            return 'downloaded_file'
          }

          // Extract the filename from Content-Disposition header
          const contentDisposition = response.headers['content-disposition']
          const fileName = extractFileName(contentDisposition)

          // Create a temporary URL for the Blob and initiate the download
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }
}
