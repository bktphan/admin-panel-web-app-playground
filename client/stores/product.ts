import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: 'Active' | 'Inactive'
  image: string
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      { id: 1, name: 'หูฟังไร้สาย Pro', price: 2500, stock: 15, status: 'Active', image: '🎧' },
      { id: 2, name: 'นาฬิกา Smart Watch', price: 4900, stock: 8, status: 'Active', image: '⌚' },
      { id: 3, name: 'คีย์บอร์ด Mechanical', price: 3200, stock: 0, status: 'Inactive', image: '⌨️' },
    ] as Product[]
  }),

  actions: {
    addProduct(item: Omit<Product, 'id'>) {
      const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
      this.products.push({ ...item, id: newId })
    },

    updateProduct(id: number, updatedItem: Product) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products[index] = updatedItem
      }
    },

    removeProduct(id: number) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})