<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { TrendingUp, Users, ShoppingCart, Package } from 'lucide-vue-next'

const stats = [
  { title: 'Total Revenue', value: '฿124,500', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  { title: 'Total Orders', value: '45', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Total Products', value: '12', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
  { title: 'Active Customers', value: '890', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
]

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue (THB)',
      backgroundColor: '#4f46e5',
      data: [4000, 6000, 4500, 8000, 5500, 9000, 7000],
      borderRadius: 6
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  }
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <p class="text-gray-500 text-sm">Welcome back, Bank (Super Admin)</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="(card, idx) in stats" 
        :key="idx" 
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
      >
        <div class="p-3 rounded-lg" :class="card.bg">
          <component :is="card.icon" class="w-6 h-6" :class="card.color" />
        </div>
        <div>
          <p class="text-sm text-gray-500">{{ card.title }}</p>
          <p class="text-2xl font-bold text-gray-800">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Weekly Sales Statistics</h3>
      <div class="h-full pb-8">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>