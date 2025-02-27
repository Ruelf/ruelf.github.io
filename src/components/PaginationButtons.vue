<script setup lang="ts" generic="T">
import type { Pagination } from '@/modules/jolpica';

import PrimaryButton from './PrimaryButton.vue';

defineProps<{
    pagination: Pagination<T>;
}>();

defineEmits<{
    (event: 'previousPage'): unknown;
    (event: 'nextPage'): unknown;
}>();
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <PrimaryButton
            @click="$emit('previousPage')"
            :disabled="pagination.currentPage <= 1"
        >
            Previous page
        </PrimaryButton>

        <div class="flex flex-col items-center">
            <div>
                Page
                <span class="font-medium">{{ pagination.currentPage }}</span>
                of
                <span class="font-medium">{{ pagination.totalPages }}</span>
            </div>
            <div>
                Showing
                <span class="font-medium">{{ pagination.from }}</span>
                to
                <span class="font-medium">{{ pagination.to }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
            </div>
        </div>

        <PrimaryButton
            @click="$emit('nextPage')"
            :disabled="pagination.currentPage >= pagination.totalPages"
        >
            Next page
        </PrimaryButton>
    </div>
</template>
