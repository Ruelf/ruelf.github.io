<script setup lang="ts">
import router from '@/router';
import { useRouter } from 'vue-router';

console.log(2);
function bruh() {
    router.push({ name: 'snowflake' });
}
</script>
<template>
    <div class="text-black">
        Gaming
    </div>

    <button type="button" class="text-red-500" @click="bruh">aa</button>
</template>
