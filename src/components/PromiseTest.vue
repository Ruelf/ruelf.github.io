<script setup lang="ts" generic="T">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    promise: Promise<T>;
}>();

const data = ref<T>();

onMounted(async () => {
    data.value = await props.promise;
});
</script>

<template>
    <slot v-bind="{ data }" />
</template>
