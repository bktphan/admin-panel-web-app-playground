<script setup lang="ts">
import { useShopStore } from '~/stores/shop'
import { Palette, RotateCcw, Smartphone, Monitor } from 'lucide-vue-next'

const shopStore = useShopStore()

const colorPresets = [
  { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
  { name: 'Emerald', value: '#10b981', class: 'bg-emerald-500' },
  { name: 'Rose', value: '#e11d48', class: 'bg-rose-600' },
  { name: 'Amber', value: '#f59e0b', class: 'bg-amber-500' },
  { name: 'Sky', value: '#0ea5e9', class: 'bg-sky-500' },
  { name: 'Slate', value: '#475569', class: 'bg-slate-600' },
]

const previewMode = ref<'mobile' | 'desktop'>('mobile')
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-6 animate-fade-in xl:h-[calc(100vh-6rem)] h-auto pb-8">
    
    <div class="w-full xl:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden shrink-0">
      <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center space-x-2 text-gray-800">
          <Palette :size="20" class="text-indigo-600" />
          <h2 class="font-bold text-lg">ตกแต่งหน้าร้าน</h2>
        </div>
        <button 
          @click="shopStore.resetConfig"
          class="text-xs flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <RotateCcw :size="14" />
          <span>รีเซ็ตค่าเริ่มต้น</span>
        </button>
      </div>

      <div class="p-6 space-y-6 overflow-y-auto flex-1 max-h-[400px] xl:max-h-none">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700">ชื่อร้านค้า</label>
          <input 
            v-model="shopStore.config.shopName" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="ตั้งชื่อร้านเท่ๆ ของคุณ"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700">ข้อความต้อนรับ</label>
          <textarea 
            v-model="shopStore.config.welcomeText" 
            rows="3"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            placeholder="เขียนคำทักทายลูกค้า..."
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700">อีเมลติดต่อ</label>
          <input 
            v-model="shopStore.config.contactEmail" 
            type="email" 
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div class="space-y-3">
          <label class="text-sm font-semibold text-gray-700">เลือกสีธีม</label>
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="color in colorPresets" 
              :key="color.value"
              @click="shopStore.config.themeColor = color.value"
              class="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-transparent"
              :class="[
                color.class, 
                shopStore.config.themeColor === color.value ? '!border-gray-800 scale-110 !ring-gray-300' : 'border-transparent'
              ]"
              :title="color.name"
            ></button>
             <div class="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform">
               <input 
                 type="color" 
                 v-model="shopStore.config.themeColor"
                 class="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                 title="เลือกสีเอง"
               />
             </div>
          </div>
          <p class="text-xs text-gray-400">ลองคลิกเปลี่ยนสี แล้วดูผลลัพธ์ทันที 👉</p>
        </div>
      </div>
    </div>

    <div class="w-full xl:w-2/3 bg-gray-100 rounded-xl border border-gray-300 shadow-inner p-4 md:p-8 relative flex flex-col items-center justify-center min-h-[600px] xl:min-h-0">
      <div class="absolute top-4 right-4 bg-gray-800/80 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm flex items-center space-x-2 z-10">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span>ตัวอย่างหน้าเว็บ</span>
      </div>

      <div class="absolute top-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex space-x-1 z-10">
        <button 
          @click="previewMode = 'mobile'"
          class="p-2 rounded transition-colors"
          :class="previewMode === 'mobile' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'"
        >
          <Smartphone :size="18" />
        </button>
        <button 
          @click="previewMode = 'desktop'"
          class="p-2 rounded transition-colors"
          :class="previewMode === 'desktop' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'"
        >
          <Monitor :size="18" />
        </button>
      </div>

      <div 
        class="bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out border-8 border-gray-800 relative max-w-full"
        :class="previewMode === 'mobile' ? 'w-[320px] md:w-[375px] h-[600px] md:h-[667px] rounded-[3rem]' : 'w-full h-[400px] xl:h-full rounded-xl'"
      >
        <div v-if="previewMode === 'mobile'" class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

        <div v-if="previewMode === 'desktop'" class="h-8 bg-gray-100 border-b flex items-center px-4 space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
          <div class="flex-1 bg-white h-5 rounded mx-4 text-[10px] flex items-center px-2 text-gray-400 truncate">
            https://myshop.com
          </div>
        </div>

        <div class="h-full overflow-y-auto bg-gray-50 pb-20 scrollbar-hide">
          
          <div 
            class="h-48 flex flex-col items-center justify-center text-white text-center px-6 relative overflow-hidden"
            :style="{ backgroundColor: shopStore.config.themeColor }"
          >
             <div class="absolute top-0 left-0 w-full h-full opacity-10">
                <div class="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white"></div>
                <div class="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-white"></div>
             </div>
             
             <h1 class="text-2xl font-bold drop-shadow-md z-10 break-words max-w-full">{{ shopStore.config.shopName }}</h1>
             <p class="mt-2 text-sm opacity-90 z-10 max-w-xs">{{ shopStore.config.welcomeText }}</p>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">สินค้าแนะนำ</h3>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="i in 4" :key="i" class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 group">
                <div class="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-300">
                  {{ ['🎧', '⌚', '📷', '💻'][i-1] }}
                </div>
                <div class="h-3 w-3/4 bg-gray-100 rounded mb-1"></div>
                <div class="flex justify-between items-center mt-2">
                  <span 
                    class="font-bold text-sm"
                    :style="{ color: shopStore.config.themeColor }"
                  >
                    ฿{{ [2500, 4900, 15900, 32000][i-1] }}
                  </span>
                  <button 
                    class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                    :style="{ backgroundColor: shopStore.config.themeColor }"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 bg-gray-800 text-gray-400 text-xs text-center mt-4">
            <p>© 2024 {{ shopStore.config.shopName }}</p>
            <p class="mt-1">อีเมล: {{ shopStore.config.contactEmail }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>