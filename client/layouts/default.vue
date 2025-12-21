<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col md:flex-row">
    
    <div class="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
      <div class="font-bold text-lg text-indigo-600">ShopAdmin</div>
      <button @click="toggleSidebar" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
        <Menu :size="24" />
      </button>
    </div>

    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
    ></div>

    <AppSidebar 
      :is-open="isSidebarOpen" 
      @close="isSidebarOpen = false" 
    />

    <main class="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
      <slot />
    </main>
  </div>
</template>