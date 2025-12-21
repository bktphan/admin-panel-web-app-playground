<script setup lang="ts">
definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = () => {
  if (email.value === 'admin@shop.com' && password.value === '123456') {
    const token = useCookie('auth_token', {
        maxAge: 60 * 60 * 24
    })
    token.value = 'dummy-token-secret-123'
    return navigateTo('/')
  } else {
    errorMsg.value = 'Invalid email or password. (Try admin@shop.com / 123456)'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Shop Admin Login 🛍️</h1>
        <p class="text-gray-500 text-sm">Welcome back! Please enter your details.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="admin@shop.com"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="123456"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <p v-if="errorMsg" class="text-red-500 text-xs text-center">{{ errorMsg }}</p>

        <button 
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>