<script setup>
// ✅ Use runtime config (Nuxt 3 best practice for env vars)
const config = useRuntimeConfig()
const { data: jobs, pending, error } = await useFetch(`${config.public.apiBase}/api/v1/jobs/newest/`)
</script>

<template>
  <div>
    <!-- Hero section -->
    <div class="py-20 px-6 bg-teal-700 text-center flex flex-col items-center space-y-8">
      <h1
        class="mb-12 text-5xl font-semibold text-white px-14 py-6 rounded-xl inline-flex items-center justify-center space-x-6 max-w-max"
        style="background: rgba(72, 187, 120, 0.2); backdrop-filter: blur(10px); border: 2px solid white;
               box-shadow: 0 0 12px rgba(72, 255, 140, 0.8), 0 0 24px rgba(72, 255, 140, 0.6),
                           0 0 36px rgba(72, 255, 140, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.6);
               letter-spacing: 1.5px; animation: borderGlow 2s ease-in-out infinite alternate;">
        <span>Explore Opportunities</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M3 12l18-6-9 18-3-9z" />
        </svg>
      </h1>

      <NuxtLink
        to="/browse"
        class="py-4 px-12 rounded-xl text-white font-semibold cursor-pointer bg-teal-900 shadow-lg glow-button
               hover:bg-teal-800 hover:scale-105 transition-all duration-300 border border-white ring-1 ring-white ring-opacity-20">
        Browse
      </NuxtLink>
    </div>

    <!-- Latest jobs -->
    <div class="py-10 px-6">
      <h2 class="mb-8 text-2xl font-semibold px-6 py-2 mx-auto"
        style="max-width: fit-content;
               background: url('https://www.transparenttextures.com/patterns/pw-maze-white.png'),
                          linear-gradient(90deg, #fff9c4 0%, #fff59d 100%);
               background-blend-mode: multiply;
               box-shadow: 0 0 10px rgba(255, 235, 59, 0.5),
                           0 0 20px rgba(72, 255, 140, 0.4),
                           0 0 30px rgba(72, 255, 140, 0.3);">
        <span>📌 </span>Latest Opportunities
      </h2>

      <!-- States -->
      <div v-if="pending" class="text-center text-gray-500 py-6">
        Loading jobs...
      </div>

      <div v-if="error" class="text-center text-red-600 py-6">
        Failed to load jobs.
      </div>

      <div v-if="jobs?.length > 0" class="space-y-4">
        <Job v-for="job in jobs" :key="job.id" :job="job" />
      </div>

      <div v-else-if="!pending" class="text-center text-gray-400 py-6">
        No jobs found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow-button {
  will-change: box-shadow;
  box-shadow: 0 0 8px rgba(72, 187, 120, 0.8),
              0 0 20px rgba(72, 187, 120, 0.6),
              0 0 30px rgba(72, 187, 120, 0.4);
  animation: pulse-glow 2.5s infinite ease-in-out alternate;
}

@keyframes pulse-glow {
  from {
    box-shadow: 0 0 8px rgba(72, 187, 120, 0.8),
                0 0 20px rgba(72, 187, 120, 0.6),
                0 0 30px rgba(72, 187, 120, 0.4);
  }
  to {
    box-shadow: 0 0 12px rgba(72, 255, 140, 1),
                0 0 28px rgba(72, 255, 140, 0.7),
                0 0 40px rgba(72, 255, 140, 0.5);
  }
}
</style>
