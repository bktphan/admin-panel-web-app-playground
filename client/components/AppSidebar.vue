<script setup lang="ts">
import { LayoutDashboard, Package, Palette, LogOut, Store, X } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const route = useRoute()

const handleLogout = () => {
  const token = useCookie('auth_token')
  token.value = null
  navigateTo('/login')
}

const menuItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Shop Editor', path: '/editor', icon: Palette },
]
</script>

<template>
  <aside 
    class="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0"
    :class="props.isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-6 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="bg-indigo-600 p-2 rounded-lg text-white">
          <Store :size="20" />
        </div>
        <span class="font-bold text-xl text-gray-800 tracking-tight">ShopAdmin</span>
      </div>
      
      <button @click="emit('close')" class="md:hidden text-gray-500 hover:text-red-500">
        <X :size="24" />
      </button>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-4">
      <NuxtLink 
        v-for="item in menuItems" 
        :key="item.path" 
        :to="item.path"
        @click="emit('close')" 
        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
        :class="route.path === item.path 
          ? 'bg-indigo-50 text-indigo-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="p-4 border-t border-gray-200">
      <button 
        @click="handleLogout"
        class="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <LogOut :size="20" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>