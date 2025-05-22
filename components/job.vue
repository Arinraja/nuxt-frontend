<script setup>
import { useUserStore } from '@/stores/user'
import { defineProps, defineEmits } from 'vue'

const userStore = useUserStore()
const emit = defineEmits(['deleteJob'])
const props = defineProps({
  my: {
    type: Boolean,
    default: false
  },
  job: {
    type: Object,
    required: true
  }
})

// Add this line
const config = useRuntimeConfig()

async function deleteJob(id) {
  try {
    const response = await $fetch(`${config.public.apiBase}/jobs/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + userStore.user.token,
        'Content-Type': 'application/json'
      }
    })
    console.log('response', response)
    emit('deleteJob', id)
  } catch (error) {
    console.log('Delete job error:', error)
  }
}
</script>


<template>
  <div class="p-6 flex items-center justify-between bg-gray-100 rounded-xl">
    <div>
      <h3 class="mb-2 text-xl font-semibold">{{ job.title }}</h3>
      <p class="text-gray-600">{{ job.company_name }}</p>
    </div>

    <div>
      <p class="mb-2">{{ job.position_location }}</p>
      <p>{{ job.position_salary }}</p>
    </div>

    <div>
      <p>Posted {{ job.created_at_formatted }}</p>
    </div>

    <div class="space-x-4">
      <NuxtLink :to="`/browse/${job.id}`" class="py-4 px-6 bg-teal-700 text-white rounded-xl">
        Details
      </NuxtLink>

      <NuxtLink
        v-if="my"
        :to="`/editjob/${job.id}`"
        class="py-4 px-6 bg-cyan-700 text-white rounded-xl"
      >
        Edit
      </NuxtLink>

      <button
        v-if="my"
        @click="deleteJob(job.id)"
        class="py-4 px-6 bg-rose-700 text-white rounded-xl cursor-pointer"
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
</template>
