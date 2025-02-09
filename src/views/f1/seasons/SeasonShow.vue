<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import config from '@/config';
import router from '@/router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Tab, TabGroup, TabList } from '@headlessui/vue';

const props = defineProps<{
    season: number;
}>();

const tabs = [
    { name: 'Races', route: 'seasonHome' },
    { name: 'Drivers', route: 'seasonDrivers' },
];

function changeTab(index: number) {
    router.push({ name: tabs[index].route, params: { season: props.season } });
}

function previousSeason() {
    router.push({ name: router.currentRoute.value.name, params: { season: props.season - 1 } });
}

function nextSeason() {
    router.push({ name: router.currentRoute.value.name, params: { season: props.season + 1 } });
}
</script>

<template>
    <div class="flex flex-col gap-4 px-2 sm:px-0">
        <div class="flex items-center gap-4">
            <PrimaryButton :disabled="season <= config.f1.seasons.min" @click="previousSeason">
                <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
            </PrimaryButton>

            <div class="text-4xl">
                {{ season }}
            </div>

            <PrimaryButton :disabled="season >= config.f1.seasons.max" @click="nextSeason">
                <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </PrimaryButton>
        </div>

        <TabGroup
            :selected-index="tabs.findIndex((tab) => tab.route === router.currentRoute.value.name)"
            @change="changeTab"
            class="mb-4"
        >
            <TabList class="flex gap-4">
                <Tab v-for="tab of tabs" :key="tab.name" v-slot="{ selected }">
                    <div class="rounded-md p-2" :class="selected ? 'bg-gray-600' : 'bg-gray-800'">
                        {{ tab.name }}
                    </div>
                </Tab>
            </TabList>
        </TabGroup>
    </div>

    <RouterView />
</template>
