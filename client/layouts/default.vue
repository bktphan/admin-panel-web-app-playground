<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <AppSidebar />

    <main class="md:ml-64 p-8 transition-all duration-300">
      <slot />
    </main>
  </div>
</template>