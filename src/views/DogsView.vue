<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface ResponseData {
    message: string[];
    status: string;
}

const urls = ref<string[]>();

onMounted(() => {
    refreshDogs();
});

function refreshDogs() {
    axios.get<ResponseData>('https://dog.ceo/api/breeds/image/random/18').then(({ data }) => {
        urls.value = data.message;
    });
}
</script>

<template>
    <PrimaryButton @click="refreshDogs">Show more!</PrimaryButton>

    <div class="mt-4 flex flex-wrap">
        <div v-for="url in urls" :key="url" class="-z-10 size-48">
            <img
                :src="url"
                alt="dog"
                class="size-full rounded-lg object-cover"
                :style="{ transform: 'rotate(' + Math.floor(Math.random() * 30 - 15) + 'deg)' }"
            />
        </div>
    </div>
</template>
