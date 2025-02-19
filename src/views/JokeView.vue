<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import type { SingleTypeJoke, TwopartTypeJoke } from '@/modules/jokeapi';
import JokeApi, { JokeLanguage } from '@/modules/jokeapi';
import { computed, onMounted, ref } from 'vue';

const jokeQueue = ref<(SingleTypeJoke | TwopartTypeJoke)[]>([]);

const joke = computed(() => jokeQueue.value[0]);

onMounted(async () => {
    jokeQueue.value.push(await getJoke());
    jokeQueue.value.push(await getJoke());
});

function getJoke() {
    return JokeApi.joke({
        language: JokeLanguage.English,
        safeMode: true,
        blacklistFlags: ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'],
    });
}

async function nextJoke() {
    jokeQueue.value.shift();
    jokeQueue.value.push(await getJoke());
}
</script>

<template>
    <RouterLink :to="{ name: 'jokeInfo' }" class="mb-8 block">Info</RouterLink>
    <PrimaryButton @click="nextJoke" class="mb-2"> Next </PrimaryButton>
    <template v-if="joke">
        <div class="mb-1 text-3xl font-semibold">
            {{ joke.category }}
        </div>
        <template v-if="joke.type == 'single'">
            <div class="text-xl">
                {{ joke.joke }}
            </div>
        </template>
        <template v-else>
            <div class="text-xl">
                {{ joke.setup }}
            </div>
            <div
                class="inline-block rounded-md bg-current text-lg transition-colors hover:bg-transparent dark:text-gray-100"
            >
                {{ joke.delivery }}
            </div>
        </template>
    </template>
</template>
