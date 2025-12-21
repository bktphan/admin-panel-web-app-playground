<script setup lang="ts">
import { useProductStore, type Product } from '~/stores/product'
import { Plus, Search, Edit, Trash2, X, Image as ImageIcon } from 'lucide-vue-next'

const productStore = useProductStore()

const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  name: '',
  price: 0,
  stock: 0,
  status: 'Active' as 'Active' | 'Inactive',
  image: ''
})

const openAddModal = () => {
  isEditMode.value = false
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (product: Product) => {
  isEditMode.value = true
  editingId.value = product.id
  Object.assign(form, { ...product }) 
  isModalOpen.value = true
}

const handleSave = () => {
  if (!form.name || form.price < 0) return alert('กรุณากรอกข้อมูลให้ถูกต้อง')

  if (isEditMode.value && editingId.value !== null) {
    productStore.updateProduct(editingId.value, { ...form, id: editingId.value })
  } else {
    productStore.addProduct({ ...form })
  }
  
  closeModal()
}

const handleDelete = (id: number) => {
  if (confirm('ยืนยันที่จะลบสินค้านี้?')) {
    productStore.removeProduct(id)
  }
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const resetForm = () => {
  Object.assign(form, { name: '', price: 0, stock: 0, status: 'Active', image: '' })
  editingId.value = null
}

const closeModal = () => {
  isModalOpen.value = false
  resetForm()
}
</script>

<template>
  <div class="space-y-6 animate-fade-in pb-20 md:pb-0">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">จัดการสินค้า</h1>
        <p class="text-gray-500 text-sm">รายการสินค้าทั้งหมดในระบบ</p>
      </div>
      <button 
        @click="openAddModal"
        class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 shadow-sm transition-colors"
      >
        <Plus :size="18" />
        <span>เพิ่มสินค้า</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100 bg-gray-50/50">
        <div class="relative w-full md:max-w-sm">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="ค้นหาสินค้า..." class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
            <tr>
              <th class="p-4 w-20">รูปภาพ</th>
              <th class="p-4">ชื่อสินค้า</th>
              <th class="p-4">ราคา</th>
              <th class="p-4">คงเหลือ</th>
              <th class="p-4">สถานะ</th>
              <th class="p-4 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden border border-gray-200">
                  <img v-if="product.image && product.image.length > 10" :src="product.image" class="w-full h-full object-cover" />
                  <span v-else>{{ product.image || '📦' }}</span>
                </div>
              </td>
              <td class="p-4 font-medium text-gray-900">{{ product.name }}</td>
              <td class="p-4 text-gray-600">฿{{ product.price.toLocaleString() }}</td>
              <td class="p-4">
                <span 
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                >
                  {{ product.stock }} ชิ้น
                </span>
              </td>
              <td class="p-4">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 rounded-full" :class="product.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'"></div>
                  <span :class="product.status === 'Active' ? 'text-green-700' : 'text-gray-500'">
                    {{ product.status === 'Active' ? 'เปิดขาย' : 'ปิดการขาย' }}
                  </span>
                </div>
              </td>
              <td class="p-4 text-right space-x-2">
                <button @click="openEditModal(product)" class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors" title="แก้ไข">
                  <Edit :size="18" />
                </button>
                <button @click="handleDelete(product.id)" class="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="ลบ">
                  <Trash2 :size="18" />
                </button>
              </td>
            </tr>
            <tr v-if="productStore.products.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-500">
                ยังไม่มีสินค้าในระบบ กดปุ่ม "เพิ่มสินค้า" เพื่อเริ่มต้น
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 backdrop-blur-sm p-0 md:p-4 overflow-y-auto">
      <div class="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg shadow-2xl transform transition-all animate-fade-in-up max-h-[90vh] md:max-h-none flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h3 class="text-xl font-bold text-gray-800">
            {{ isEditMode ? '✏️ แก้ไขสินค้า' : '✨ เพิ่มสินค้าใหม่' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X :size="24" />
          </button>
        </div>

        <div class="p-6 space-y-4 overflow-y-auto">
          <div class="flex flex-col items-center justify-center space-y-2 mb-4">
            <div class="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group hover:border-indigo-500 transition-colors cursor-pointer">
              <img v-if="form.image && form.image.length > 10" :src="form.image" class="w-full h-full object-cover" />
              <div v-else class="text-gray-400 flex flex-col items-center">
                <ImageIcon :size="24" />
                <span class="text-[10px] mt-1">อัปโหลด</span>
              </div>
              <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <p class="text-xs text-gray-400">คลิกเพื่ออัปโหลดรูปภาพสินค้า</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อสินค้า</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="เช่น หูฟังไร้สาย..." />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ราคา (บาท)</label>
              <input v-model.number="form.price" type="number" min="0" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">จำนวนสต็อก</label>
              <input v-model.number="form.stock" type="number" min="0" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
              <select v-model="form.status" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="Active">🟢 เปิดขาย (Active)</option>
                <option value="Inactive">🔴 ปิดการขาย (Inactive)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-2xl shrink-0 safe-area-pb">
          <button @click="closeModal" class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium">ยกเลิก</button>
          <button @click="handleSave" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-200 transition-all font-bold">
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom, 24px);
}
</style>