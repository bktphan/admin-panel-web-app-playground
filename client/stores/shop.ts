import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', {
  state: () => ({
    config: {
      shopName: 'Bank Gadgets Store',
      welcomeText: 'ยินดีต้อนรับสู่ร้านอุปกรณ์ไอทีคุณภาพ อันดับ 1 ในไทย',
      themeColor: '#4f46e5',
      contactEmail: 'contact@bankshop.com'
    }
  }),
  actions: {
    resetConfig() {
      this.config = {
        shopName: 'Bank Gadgets Store',
        welcomeText: 'ยินดีต้อนรับสู่ร้านอุปกรณ์ไอทีคุณภาพ อันดับ 1 ในไทย',
        themeColor: '#4f46e5',
        contactEmail: 'contact@bankshop.com'
      }
    }
  }
})