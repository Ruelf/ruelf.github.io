<script setup lang="ts">
import PromiseTest from '@/components/PromiseTest.vue';
import { Jolpica } from '@/modules/jolpica';
import { ref } from 'vue';

const testData = ref();
</script>

<template>
    {{ testData }}
    <PromiseTest
        :promise="Jolpica.getSeasonRound('current', 'next')"
        v-slot="{ data: race }"
    >
        <template v-if="race">
            <div class="text-3xl">{{ race.season }} {{ race.name }}</div>
            <div class="text-xl dark:text-gray-400">
                <div>{{ race.circuit.name }}</div>
                <div>
                    {{ race.circuit.location.locality }},
                    {{ race.circuit.location.country }}
                </div>
            </div>
        </template>
    </PromiseTest>
</template>
