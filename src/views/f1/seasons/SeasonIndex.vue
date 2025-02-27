<script setup lang="ts">
import Card from '@/components/Card.vue';
import config from '@/config';
import { range } from '@/utils';

const allSeasons = range(config.f1.seasons.min, config.f1.seasons.max + 1);
</script>

<template>
    <Card class="p-4">
        <div class="flex flex-wrap gap-16">
            <div
                v-for="[key, seasons] of allSeasons.groupBy(
                    (season) => season - (season % 10),
                )"
                :key="key"
                class="w-16"
            >
                <div class="w-full border-b-2 border-gray-500 text-xl">
                    {{ key }}
                </div>

                <div class="flex flex-col gap-1">
                    <div v-for="season of seasons" :key="season">
                        <RouterLink
                            :to="{ name: 'seasonHome', params: { season } }"
                            class="underline"
                        >
                            {{ season }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>
