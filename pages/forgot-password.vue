<script setup>
import { ref } from 'vue'

const email = ref('')
const success = ref(false)
const error = ref(null)
const loading = ref(false)

async function sendResetLink() {
  error.value = null
  success.value = false
  loading.value = true

  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/users/reset_password/`, {
      method: 'POST',
      body: { email: email.value }
    })
    success.value = true
  } catch (err) {
    console.error('Forgot password error:', err)

    if (err.response?._data?.email) {
      error.value = err.response._data.email[0]
    } else if (err.response?._data?.detail) {
      error.value = err.response._data.detail
    } else {
      error.value = 'Failed to send reset link. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h1 class="text-2xl font-bold mb-4">Forgot Password</h1>

    <input
      v-model="email"
      type="email"
      placeholder="Enter your email"
      class="w-full p-4 mb-4 rounded-xl border border-gray-300"
      :disabled="loading"
    />

    <button
      @click="sendResetLink"
      class="py-4 px-6 bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
      style="box-shadow: 0 0 6px rgba(0,255,150,0.5), 0 0 12px rgba(0,255,150,0.4), 0 0 18px rgba(0,255,150,0.3);"
      :disabled="loading || !email"
    >
      {{ loading ? 'Sending...' : 'Send Reset Link' }}
    </button>

    <div v-if="success" class="mt-4 text-green-600">
      Reset link sent! Check your inbox.
    </div>
    <div v-if="error" class="mt-4 text-red-600">
      {{ error }}
    </div>
  </div>
</template>
