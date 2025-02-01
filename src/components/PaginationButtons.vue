<script setup lang="ts">
import type { Pagination } from '@/jolpica/Pagination'
import PrimaryButton from './PrimaryButton.vue'

defineProps<{
    data: Pagination
}>()

defineEmits<{
    (event: 'previousPage'): unknown
    (event: 'nextPage'): unknown
}>()
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <PrimaryButton @click="$emit('previousPage')">Previous page</PrimaryButton>

        <div class="flex flex-col items-center">
            <div>
                Page
                <span class="font-medium">{{ data.currentPage }}</span>
                of
                <span class="font-medium">{{ data.totalPages }}</span>
            </div>
            <div>
                Showing
                <span class="font-medium">{{ data.from }}</span>
                to
                <span class="font-medium">{{ data.to }}</span>
                of
                <span class="font-medium">{{ data.total }}</span>
                results
            </div>
        </div>

        <PrimaryButton @click="$emit('nextPage')">Next page</PrimaryButton>
    </div>
</template>
