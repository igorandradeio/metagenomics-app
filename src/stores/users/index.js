import { defineStore } from 'pinia'
import AuthService from '@/services/auth.service'

export const useUserStore = defineStore('users', {
  state: () => ({
    user: {
      id: null,
      username: '',
      email: '',
      first_name: '',
      last_name: '',
    },
  }),

  getters: {
    fullName: (state) => state.user.first_name + ' ' + state.user.last_name,
  },

  actions: {
    async auth(params) {
      return await AuthService.login(params)
    },
    async getMe() {
      return await AuthService.getMe().then((response) => {
        this.user = response
      })
    },
    async logout() {
      return await AuthService.logout()
    },
  },
})
