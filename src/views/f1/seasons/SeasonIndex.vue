<script setup lang="ts">
import Card from '@/components/Card.vue';
import { groupBy, range } from '@/helpers/helpers';
import dayjs from 'dayjs';

const allSeasons = range(1950, dayjs().year() + 1);
</script>

<template>
    <Card class="p-4">
        <div class="flex flex-wrap gap-16">
            <div
                v-for="[key, seasons] of groupBy(allSeasons, (season) => season - (season % 10))"
                :key="key"
                class="w-16"
            >
                <div class="w-full border-b-2 border-gray-500 text-xl">
                    {{ key }}
                </div>
                <div v-for="season of seasons" :key="season">
                    <RouterLink :to="{ name: 'seasonHome', params: { season } }" class="underline">
                        {{ season }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </Card>
</template>
