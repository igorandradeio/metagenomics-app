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
          reject(error)
        })
    })
  }
}
