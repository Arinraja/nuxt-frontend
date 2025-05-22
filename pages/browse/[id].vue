<script setup>
import { useRoute } from 'vue-router'
import { useRuntimeConfig, useFetch, useSeoMeta } from '#imports'
import { watchEffect } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()

const { data: job } = await useFetch(`${config.public.apiBase}/jobs/${route.params.id}/`)

// Update SEO meta dynamically once job data is loaded
watchEffect(() => {
  if (job.value) {
    useSeoMeta({
      title: job.value.title || 'Job Details',
      ogTitle: job.value.title || 'Job Details',
      description: job.value.description || 'View job details and apply now'
    })
  }
})
</script>

<template>
  <div v-if="job" class="py-10 px-6 grid md:grid-cols-4 gap-3">
    <div class="md:col-span-3">
      <h1 class="mb-6 text-3xl">{{ job.value.title }}</h1>
      <p>{{ job.value.description }}</p>
      <a :href="'mailto:' + job.value.company_email" class="inline-block mt-6 py-4 px-6 bg-teal-700 text-white rounded-xl">
        Apply
      </a>
    </div>

    <div class="md:col-span-1 p-6 bg-teal-700 text-white rounded-xl">
      <h3 class="mb-6 text-2xl">Company</h3>
      <p class="mb-2">{{ job.value.company_name }}</p>
      <p>Location: {{ job.value.company_location }}</p>

      <hr class="my-6 opacity-30" />

      <h3 class="mb-6 text-2xl">Position</h3>
      <p class="mb-2">{{ job.value.position_location }}</p>
      <p>{{ job.value.position_salary }}</p>

      <hr class="my-6 opacity-30" />

      <p>Posted at {{ job.value.created_at_formatted }}</p>
    </div>
  </div>
</template>
