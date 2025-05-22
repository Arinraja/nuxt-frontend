<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const config = useRuntimeConfig()
const userStore = useUserStore()
const router = useRouter()
const jobs = ref([])

// Redirect to login if user is not authenticated
onMounted(() => {
  if (!userStore.user?.isAuthenticated) {
    router.push('/login')
  } else {
    getJobs()
  }
})

useSeoMeta({
  title: 'My Jobs',
  ogTitle: 'My Jobs',
  description: 'A list of jobs posted by the user.'
})

// Fetch user's own jobs
async function getJobs() {
  try {
    const response = await $fetch(`${config.public.apiBase}/api/v1/jobs/my`, {
      headers: {
        Authorization: `Token ${userStore.user.token}`, // Capital 'Token'
        'Content-Type': 'application/json'
      },
    })
    jobs.value = response
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
}

// Local deletion from state (not backend)
function deleteJob(id) {
  jobs.value = jobs.value.filter(job => job.id !== id)
}
</script>

<template>
  <div class="py-10 px-6">
    <h1
      class="mb-6 text-2xl text-white px-6 py-3 rounded-lg max-w-max"
      style="background: linear-gradient(to right, #b22222 0%, #b22222 20%, #0F5E57 20%, #0F5E57 100%);"
    >
      My Jobs
    </h1>

    <div v-if="jobs.length > 0" class="space-y-4">
      <Job
        v-for="job in jobs"
        :key="job.id"
        :job="job"
        :my="true"
        @deleteJob="deleteJob(job.id)"
      />
    </div>

    <div v-else class="text-gray-500 mt-4">
      You haven't posted any jobs yet.
    </div>
  </div>
</template>
