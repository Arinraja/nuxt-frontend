<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
let jobs = ref()

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
    await $fetch('import.meta.env.VITE_API_URL/jobs/my', {
        headers: {
            'Authorization': 'token ' + userStore.user.token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        jobs.value = response
    })
    .catch(error => {
        console.log('error', error)
    })
}

function deleteJob(id) {
    console.log('id', id)

    jobs.value = jobs.value.filter(job => job.id !== id)
}
</script>

<template>
    <div class="py-10 px-6">
        <!-- <h1 class="mb-6 text-2xl">My jobs</h1> -->
         
        <h1
  class="mb-6 text-2xl text-white px-6 py-3 rounded-lg max-w-max"
  style="
    background: linear-gradient(
      to right,
      #b22222 0%,
      #b22222 20%,
      #0F5E57 20%,
      #0F5E57 100%
    );
  "
>
  My jobs
</h1>

        <div class="space-y-4">
            <Job
                v-for="job in jobs"
                :key="job.id"
                :job="job" 
                :my="true"
                v-on:deleteJob="deleteJob(job.id)"
            />
        </div>
    </div>
</template>
