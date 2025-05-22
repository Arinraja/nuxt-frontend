<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const queryRef = ref('')

function performSearch() {
  queryRef.value = query.value.trim()
}

const { data: jobCategories } = await useFetch(`${import.meta.env.VITE_API_URL}/jobs/categories`)

const selectedCategories = ref([])

// Keep a reactive string for API query param
const selectedCategoriesRef = ref('')

function toggleCategory(id) {
  const index = selectedCategories.value.indexOf(id)

  if (index === -1) {
    selectedCategories.value.push(id)
  } else {
    selectedCategories.value.splice(index, 1)
  }
  selectedCategoriesRef.value = selectedCategories.value.join(',')
}

// Reactive params for useFetch query
const fetchQuery = ref({ query: queryRef.value, categories: selectedCategoriesRef.value })

// Update fetchQuery whenever filters change
watch([queryRef, selectedCategoriesRef], () => {
  fetchQuery.value = {
    query: queryRef.value,
    categories: selectedCategoriesRef.value
  }
}, { immediate: true })

const { data: jobs } = await useFetch(`${import.meta.env.VITE_API_URL}/v1/jobs/`, {
  query: fetchQuery
})
</script>

<template>
  <div class="grid md:grid-cols-4 gap-3 py-10 px-6">
    <div class="md:col-span-1 px-6 py-6 bg-teal-700 rounded-xl">
      <div class="flex space-x-4">
        <input
          v-model="query"
          type="search"
          placeholder="Find a job..."
          class="w-full px-6 py-4 rounded-xl"
        />

        <button
          class="px-6 py-4 bg-teal-900 text-white rounded-xl"
          @click="performSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <hr class="my-6 opacity-30" />

      <h3 class="mt-6 text-xl text-white">Categories</h3>

      <div class="mt-6 space-y-4">
        <p
          v-for="category in jobCategories"
          :key="category.id"
          @click="toggleCategory(category.id)"
          class="py-4 px-6 text-white rounded-xl cursor-pointer select-none"
          :class="{ 'bg-teal-900': selectedCategories.includes(category.id) }"
        >
          {{ category.title }}
        </p>
      </div>
    </div>

    <div class="md:col-span-3">
      <div class="space-y-4">
        <Job
          v-for="job in jobs"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </div>
</template>
