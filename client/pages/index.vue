<script setup lang="ts">
import { TrendingUp, Users, ShoppingCart, Package } from "lucide-vue-next";

const stats = [
  {
    title: "ยอดขายรวม",
    value: "฿124,500",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "จำนวนออเดอร์",
    value: "45",
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "สินค้าทั้งหมด",
    value: "12",
    icon: Package,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "ลูกค้าทั้งหมด",
    value: "890",
    icon: Users,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const chartData = [40, 60, 45, 80, 55, 90, 70];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
      >
        <div class="p-3 rounded-lg" :class="stat.bg">
          <component :is="stat.icon" class="w-6 h-6" :class="stat.color" />
        </div>
        <div>
          <p class="text-sm text-gray-500">{{ stat.title }}</p>
          <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-800">ยอดขายรายสัปดาห์</h3>
        <span class="text-sm text-green-600 font-medium"
          >+12.5% จากสัปดาห์ก่อน</span
        >
      </div>

      <div class="h-64 flex items-end justify-between space-x-4 px-4">
        <div
          v-for="(height, i) in chartData"
          :key="i"
          class="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-all relative group cursor-pointer"
          :style="{ height: `${height}%` }"
        >
          <div
            class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            ฿{{ height }}k
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-4 text-sm text-gray-400 px-4">
        <span v-for="day in days" :key="day">{{ day }}</span>
      </div>
    </div>
  </div>
</template>
