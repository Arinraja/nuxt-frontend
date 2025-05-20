<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let email = ref('')
let password1 = ref('')
let password2 = ref('')
let errors = ref([])

async function submitForm() {
    console.log('submitForm')
    errors.value = []

    // Check password confirmation
    if (password1.value !== password2.value) {
        errors.value.push("Passwords do not match")
        return
    }

    try {
        const response = await $fetch(`${import.meta.env.VITE_API_URL}/users/`, {
            method: 'POST',
            body: {
                username: email.value,
                password: password1.value
            }
        })
        console.log('response', response)
        router.push({ path: '/login' })
    } catch (error) {
        if (error.response && error.response._data) {
            for (const property in error.response._data) {
                errors.value.push(`${property}: ${error.response._data[property]}`)
            }
            console.log(JSON.stringify(error.response))
        } else if (error.message) {
            errors.value.push('Something went wrong. Please try again')
            console.log(JSON.stringify(error))
        }
    }
}
</script>
