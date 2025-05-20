<!-- <template>
  <div class="max-w-md mx-auto p-8">
    <h1 class="text-3xl mb-6">Forgot Password</h1>
    <p>Please enter your email to receive password reset instructions.</p>
    <form @submit.prevent="submitForgotPassword">
      <input
        v-model="email"
        type="email"
        placeholder="Your email address"
        class="w-full mb-4 p-3 border rounded"
        required
      />
      <div v-if="message" :class="{'text-green-600': success, 'text-red-600': !success}" class="mb-4">
        {{ message }}
      </div>
      <button
        type="submit"
        class="bg-teal-700 text-white py-3 px-6 rounded hover:bg-teal-800"
        :disabled="loading"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const success = ref(false)
const loading = ref(false)

async function submitForgotPassword() {
  message.value = ''
  success.value = false
  loading.value = true
  try {
    // Replace this URL with your backend password reset API endpoint
    const response = await $fetch('http://127.0.0.1:8000/api/v1/password-reset/', {
      method: 'POST',
      body: { email: email.value }
    })
    message.value = 'If this email exists, a reset link has been sent.'
    success.value = true
  } catch (err) {
    message.value = 'Failed to send reset link. Please try again.'
    success.value = false
  } finally {
    loading.value = false
  }
}
</script> -->



<script setup>
import { ref } from 'vue'

const email = ref('')
const success = ref(false)
const error = ref(null)

async function sendResetLink() {
  error.value = null
  success.value = false

  try {
    await $fetch('import.meta.env.VITE_API_URL/users/reset_password/', {
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
    />

    <button
      @click="sendResetLink"
      class="py-4 px-6 bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
                  style="box-shadow: 0 0 6px rgba(0,255,150,0.5), 0 0 12px rgba(0,255,150,0.4), 0 0 18px rgba(0,255,150,0.3);"
               
    >
      Send Reset Link
    </button>

    <div v-if="success" class="mt-4 text-green-600">
      Reset link sent! Check your inbox.
    </div>
    <div v-if="error" class="mt-4 text-red-600">
      {{ error }}
    </div>
  </div>
</template>
