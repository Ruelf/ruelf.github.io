<script setup lang="ts"></script>

<template>
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div class="p-4 max-w-7xl mx-auto">
            Yoooo we got a NavBar now!!! This is so cool. Click
            <RouterLink
                :to="{ name: 'driverShow', params: { id: 'norris' } }"
                class="text-[#F00]"
            >
                here
            </RouterLink>
            for fresh air.
        </div>
    </nav>
</template>
