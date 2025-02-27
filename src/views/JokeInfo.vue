<script setup lang="ts">
import Card from '@/components/Card.vue';
import type { InfoResponse } from '@/modules/jokeapi';
import JokeApi from '@/modules/jokeapi';
import { onMounted, ref } from 'vue';

const info = ref<InfoResponse>();

onMounted(async () => {
    info.value = await JokeApi.info();
});
</script>

<template>
    <Card class="p-4" v-if="info">
        <h1 class="mb-2 text-5xl">JokeAPI v{{ info.version }}</h1>

        <a
            href="https://sv443.net/jokeapi/v2/"
            target="_blank"
            class="mb-4 block underline"
        >
            Documentation
        </a>

        <div class="grid gap-2">
            <Card class="-mx-4 mb-4 flex flex-wrap gap-8 !rounded-none p-4">
                Total Jokes: {{ info.jokes.totalCount }}
            </Card>

            <Card class="-mx-4 flex flex-wrap gap-8 !rounded-none p-4">
                <div>
                    <h2 class="mb-2 text-3xl">Categories</h2>

                    <ul>
                        <li
                            v-for="category of info.jokes.categories"
                            :key="category"
                            class="ms-4 before:content-['-_']"
                        >
                            {{ category }}
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="mb-2 text-3xl">Flags</h2>

                    <ul>
                        <li
                            v-for="flag of info.jokes.flags"
                            :key="flag"
                            class="ms-4 before:content-['-_']"
                        >
                            {{ flag }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-2 text-3xl">Type</h2>

                    <ul>
                        <li
                            v-for="type of info.jokes.types"
                            :key="type"
                            class="ms-4 before:content-['-_']"
                        >
                            {{ type }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-2 text-3xl">Formats</h2>

                    <ul>
                        <li
                            v-for="format of info.formats"
                            :key="format"
                            class="ms-4 before:content-['-_']"
                        >
                            {{ format }}
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    </Card>
</template>
