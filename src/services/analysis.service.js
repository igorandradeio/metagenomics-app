import BaseService from './base.service'
import { TOKEN_NAME } from '@/utils/constants'

export default class AnalysisService extends BaseService {
  static async getAnalysisByProject(projectId) {
    const token = await localStorage.getItem(TOKEN_NAME)

    if (!token) {
      return Promise.reject('Token not found')
    }

    return new Promise((resolve, reject) => {
      this.request({ auth: true })
        .get(`/project/${projectId}/analysis/`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }
}
