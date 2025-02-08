<script setup lang="ts">
import router from '@/router';
import { Tab, TabGroup, TabList } from '@headlessui/vue';

const props = defineProps<{
    season?: number;
}>();

const tabs = [
    { name: 'Races', route: 'seasonHome' },
    { name: 'Drivers', route: 'seasonDrivers' },
];

function changeTab(index: number) {
    router.push({ name: tabs[index].route, params: { season: props.season } });
}
</script>

<template>
    <div class="px-2 sm:px-0">
        <div class="mb-4 text-4xl">
            {{ season }}
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
