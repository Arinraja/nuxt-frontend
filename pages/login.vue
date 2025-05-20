<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

let email = ref('')
let password = ref('')
let errors = ref([])

async function submitForm() {
  console.log('submitForm')

  errors.value = []

  try {
    const data = await $fetch(`${import.meta.env.VITE_API_URL}/token/login/`, {
      method: 'POST',
      body: {
        username: email.value,
        password: password.value
      }
    })
    console.log('response', data.auth_token)

    userStore.setToken(data.auth_token, email.value)

    router.push({ path: '/' })
  } catch (error) {
    if (error.response && error.response._data) {
      for (const property in error.response._data) {
        errors.value.push(`${property}: ${error.response._data[property]}`)
      }
      console.log(JSON.stringify(error.response))
    } else if (error.message) {
      errors.value.push('Something went wrong. Please try again')
      console.log(JSON.stringify(error))
    }
  }
}
</script>

<template>
  <div class="py-10 px-6">
    <div class="max-w-sm mx-auto py-10 px-6 bg-gray-100 rounded-xl">
      <h1 class="mb-6 text-2xl font-semibold">Log in</h1>

      <form @submit.prevent="submitForm">
        <input
          v-model="email"
          type="email"
          placeholder="Your email address..."
          class="w-full mb-4 py-4 px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Your password..."
          class="w-full mb-2 py-4 px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <!-- Forgot Password link -->
        <NuxtLink
          to="/forgot-password"
          class="block text-right mb-6 text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
        >
          Forgot Password?
        </NuxtLink>

        <div
          v-if="errors.length"
          class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
        >
          <p v-for="error in errors" :key="error">
            {{ error }}
          </p>
        </div>

        <button
          type="submit"
          class="py-4 px-6 bg-teal-700 text-white rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
          style="box-shadow: 0 0 6px rgba(0,255,150,0.5), 0 0 12px rgba(0,255,150,0.4), 0 0 18px rgba(0,255,150,0.3); will-change: transform, box-shadow;"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
