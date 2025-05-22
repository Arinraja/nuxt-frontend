<script setup>
definePageMeta({ ssr: false }) // Disable SSR to avoid prerender errors

const config = useRuntimeConfig()

const { data: jobs, pending, error } = await useFetch(`${config.public.apiBase}/api/v1/jobs/newest/`)
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-center">
      📌 Latest Opportunities
    </h1>

    <!-- Loading state -->
    <div v-if="pending" class="text-center text-gray-500">
      Loading job listings...
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-center text-red-500">
      Failed to load job listings. Please try again later.
    </div>

    <!-- Job list -->
    <div v-if="jobs?.length" class="space-y-4">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >
        <h2 class="text-lg font-semibold">{{ job.title }}</h2>
        <p class="text-gray-600">{{ job.description }}</p>
        <p class="text-sm text-gray-400">Posted on: {{ job.created_at?.split('T')[0] }}</p>
      </div>
    </div>

    <!-- No jobs -->
    <div v-if="jobs?.length === 0" class="text-center text-gray-400">
      No job opportunities available at the moment.
    </div>
  </div>
</template>
