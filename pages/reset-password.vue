<!-- <template>
  <div class="max-w-md mx-auto p-8">
    <h1 class="text-3xl mb-6">Reset Password</h1>
    <form @submit.prevent="submitResetPassword">
      <input
        v-model="password1"
        type="password"
        placeholder="New password"
        class="w-full mb-4 p-3 border rounded"
        required
      />
      <input
        v-model="password2"
        type="password"
        placeholder="Confirm new password"
        class="w-full mb-4 p-3 border rounded"
        required
      />
      <div v-if="errors.length" class="text-red-600 mb-4">
        <p v-for="err in errors" :key="err">{{ err }}</p>
      </div>
      <button
        type="submit"
        class="bg-teal-700 text-white py-3 px-6 rounded hover:bg-teal-800"
        :disabled="loading"
      >
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password1 = ref('')
const password2 = ref('')
const errors = ref([])
const loading = ref(false)

const token = ref('')

onMounted(() => {
  token.value = route.query.token || ''
  if (!token.value) {
    alert('Reset token missing or invalid')
    router.push('/login')
  }
})

async function submitResetPassword() {
  errors.value = []
  if (password1.value !== password2.value) {
    errors.value.push("Passwords don't match")
    return
  }
  loading.value = true

  try {
    // Replace with your backend reset password API
    await $fetch('import.meta.env.VITE_API_URL/password-reset/confirm/', {
      method: 'POST',
      body: {
        token: token.value,
        password: password1.value
      }
    })
    alert('Password reset successfully!')
    router.push('/login')
  } catch (err) {
    errors.value.push('Failed to reset password. Try again.')
  } finally {
    loading.value = false
  }
}
</script> -->


<template>
  <div class="max-w-md mx-auto p-8">
    <h1 class="text-3xl mb-6">Reset Password</h1>
    <form @submit.prevent="submitResetPassword">
      <input
        v-model="password1"
        type="password"
        placeholder="New password"
        class="w-full mb-4 p-3 border rounded"
        required
      />
      <input
        v-model="password2"
        type="password"
        placeholder="Confirm new password"
        class="w-full mb-4 p-3 border rounded"
        required
      />
      <div v-if="errors.length" class="text-red-600 mb-4">
        <p v-for="err in errors" :key="err">{{ err }}</p>
      </div>
      <button
        type="submit"
        class="bg-teal-700 text-white py-3 px-6 rounded hover:bg-teal-800"
        :disabled="loading"
      >
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password1 = ref('')
const password2 = ref('')
const errors = ref([])
const loading = ref(false)

const token = ref('')

onMounted(() => {
  token.value = route.query.token || ''
  if (!token.value) {
    alert('Reset token missing or invalid')
    router.push('/login')
  }
})

async function submitResetPassword() {
  errors.value = []
  if (password1.value !== password2.value) {
    errors.value.push("Passwords don't match")
    return
  }
  loading.value = true

  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/password-reset/confirm/`, {
      method: 'POST',
      body: {
        token: token.value,
        password: password1.value
      }
    })
    alert('Password reset successfully!')
    router.push('/login')
  } catch (err) {
    errors.value.push('Failed to reset password. Try again.')
  } finally {
    loading.value = false
  }
}
</script>
