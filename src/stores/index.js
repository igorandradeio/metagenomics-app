import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {

  state() {
    return {
      sidebarVisible: true,
      sidebarUnfoldable: false,
      theme: 'light',
    }
  },

  actions: {
    //Hide/Show sidebar
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    //minimize sidebar
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable;
    },
    updateSidebarVisible(value) {
      this.sidebarVisible = value;
    },
  }

})
