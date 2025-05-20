<script setup>
const router = useRouter()

let email = ref('')
let password1 = ref('')
let password2 = ref('')
let errors = ref([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []

    await $fetch('import.meta.env.VITE_API_URL/users/', {
        method: 'POST',
        body: {
            username: email.value,
            password: password1.value
        }
    })
    .then(response => {
        console.log('response', response)

        router.push({path: '/login'})
    })
    .catch(error => {
        if (error.response) {
            for (const property in error.response._data) {
                errors.value.push(`${property}: ${error.response._data[property]}`)
            }
            console.log(JSON.stringify(error.response))
        } else if (error.message) {
            errors.value.push('Something went wrong. Please try again')
            
            console.log(JSON.stringify(error))
        }
    })
}
</script>

<template>
    <div class="py-10 px-6">
        <div class="max-w-sm mx-auto py-10 px-6 bg-gray-100 rounded-xl">
            <h1 class="mb-6 text-2xl">Sign up</h1>

            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" placeholder="Your email address..." class="w-full mb-4 py-4 px-6 rounded-xl">
                <input v-model="password1" type="password" placeholder="Your password..." class="w-full mb-4 py-4 px-6 rounded-xl">
                <input v-model="password2" type="password" placeholder="Repeat password..." class="w-full mb-4 py-4 px-6 rounded-xl">

                <div
                    v-if="errors.length" 
                    class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                >
                    <p v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </p>
                </div>

                <!-- <button class="py-4 px-6 bg-teal-700 text-white rounded-xl">Submit</button> -->
                 <button
                  class="py-4 px-6 bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
                  style="box-shadow: 0 0 6px rgba(0,255,150,0.5), 0 0 12px rgba(0,255,150,0.4), 0 0 18px rgba(0,255,150,0.3);"
                >
                  Submit
                </button>
            </form>
        </div>
    </div>
</template>
