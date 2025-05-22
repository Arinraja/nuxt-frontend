<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function logout() {
    userStore.removeToken()
}
</script>


<template>
    <div>
        <nav class="p-6 flex items-center justify-between bg-teal-800">
            <NuxtLink to="/" class="text-xl text-white">
              <!-- <img src="@/components/img/Dr_B._R._Ambedkar_University_Logo.webp" alt="Logo" style="height:100px;width:100px;border-radius:12px;box-shadow:0 0 15px rgba(0,170,255,0.6),0 0 30px rgba(0,170,255,0.4);transition:transform 0.3s ease-in-out;" @mouseover="event.target.style.transform='scale(1.05)'" @mouseleave="event.target.style.transform='scale(1)'"> -->
               <img src="@/components/img/Dr_B._R._Ambedkar_University_Logo.webp" alt="Logo" style="height:100px;width:100px;border-radius:12px;box-shadow:0 0 15px rgba(255,255,255,0.7),0 0 30px rgba(255,255,255,0.5);transition:transform 0.3s ease-in-out;" @mouseover="event.target.style.transform='scale(1.05)'" @mouseleave="event.target.style.transform='scale(1)'">

            </NuxtLink>

<!-- 
            <div class="flex items-center space-x-4">
                <NuxtLink to="/" class="text-white hover:text-teal-300">Home</NuxtLink>
                <NuxtLink to="/browse" class="text-white hover:text-teal-300">Browse</NuxtLink>
            </div> -->
            <div class="flex items-center space-x-4 text-white" style="text-shadow: 0 0 8px rgba(255,255,255,0.6); transition: all 0.3s ease-in-out;"><NuxtLink to="/" class="hover:text-teal-300 hover:scale-105 transition-transform">Home</NuxtLink><NuxtLink to="/browse" class="hover:text-teal-300 hover:scale-105 transition-transform">Browse</NuxtLink></div>

        </nav>

        <slot />

        <footer class="p-6 flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white">
  <p class="text-gray-300 mb-4 md:mb-0" style="text-shadow: 0 0 4px #00ff00, 0 0 8px #00ff00, 0 0 6px #ff0000; transition: all 0.3s ease-in-out;">
    Copyright &copy; 2025 IETSUPERCLASSMATES
  </p>


  
  <!-- Social Media Icons -->
<div class="flex space-x-4 text-white mt-4">
  <a href="https://wa.me/your_number" target="_blank" aria-label="WhatsApp">
    <i class="fab fa-whatsapp text-green-500 text-2xl hover:scale-110 transition-transform"></i>
  </a>
  <a href="https://www.instagram.com/your_username" target="_blank" aria-label="Instagram">
    <i class="fab fa-instagram text-pink-500 text-2xl hover:scale-110 transition-transform"></i>
  </a>
  <a href="https://t.me/your_username" target="_blank" aria-label="Telegram">
    <i class="fab fa-telegram text-blue-500 text-2xl hover:scale-110 transition-transform"></i>
  </a>
  <a href="mailto:your@email.com" aria-label="Email">
    <i class="fas fa-envelope text-yellow-500 text-2xl hover:scale-110 transition-transform"></i>
  </a>
</div>


  <!-- 🔐 Auth Buttons -->
  <div class="flex flex-wrap items-center space-x-4">
    <template v-if="userStore.user.isAuthenticated">
      <NuxtLink to="/myjobs" class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl">My jobs</NuxtLink>
      <NuxtLink to="/createjob" class="py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Create job</NuxtLink>
      <a v-on:click="logout" class="py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl">Log out</a>
    </template>

    <template v-else>
      <NuxtLink 
        to="/login"
        class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
        style="box-shadow: 0 0 6px rgba(0,255,200,0.5), 0 0 12px rgba(0,255,200,0.4), 0 0 18px rgba(0,255,200,0.3);"
      >
        Log in
      </NuxtLink>

      <NuxtLink 
        to="/signup"
        class="py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ring-2 ring-white ring-opacity-30"
        style="box-shadow: 0 0 6px rgba(0,255,120,0.5), 0 0 12px rgba(0,255,120,0.4), 0 0 18px rgba(0,255,120,0.3);"
      >
        Sign up
      </NuxtLink>
    </template>
  </div>
</footer>

    </div>
</template>
