<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
let jobs = ref([])

onMounted(() => {
  if (!userStore.user.isAuthenticated) {
    router.push('/login')
  } else {
    getJobs()
  }
})

useSeoMeta({
  title: 'My jobs',
  ogTitle: 'My jobs',
  description: 'The description'
})

async function getJobs() {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/jobs/my`, {
      headers: {
        'Authorization': 'token ' + userStore.user.token,
        'Content-Type': 'application/json'
      },
    })
    jobs.value = response
  } catch (error) {
    console.log('error', error)
  }
}

function deleteJob(id) {
  jobs.value = jobs.value.filter(job => job.id !== id)
}
</script>
