<script setup lang="ts">
import Card from '@/components/Card.vue';
import Link from '@/components/Link.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import PaginationButtons from '@/components/PaginationButtons.vue';
import { Table, Td, Th, Tr } from '@/components/table';
import { Driver, Jolpica, type ApiOptions, type Pagination, type Race } from '@/modules/jolpica';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    id: string;
}>();

const driver = ref<Driver | null>();
const wonRaces = ref<Pagination<Race>>();

onMounted(async () => {
    driver.value = await Jolpica.getDriver(props.id);
    refreshRaces({ limit: 10 });
});

async function refreshRaces(options?: ApiOptions) {
    if (driver.value) {
        wonRaces.value = await driver.value.getRaceResults({ position: 1 }, options);
    }
}

function previousPage() {
    if (!wonRaces.value) {
        return;
    }

    refreshRaces({
        limit: wonRaces.value.limit,
        offset: wonRaces.value.offset - wonRaces.value.limit,
    });
}

function nextPage() {
    if (!wonRaces.value) {
        return;
    }

    refreshRaces({
        limit: wonRaces.value.limit,
        offset: wonRaces.value.offset + wonRaces.value.limit,
    });
}
</script>

<template>
    <template v-if="driver">
        <div class="px-2 text-4xl sm:px-0">{{ driver.name }}</div>

        <div v-if="wonRaces && wonRaces.data.length" class="mt-4 grid grid-cols-12 gap-4">
            <Card class="col-span-12 sm:col-span-6">
                <Table>
                    <template #head>
                        <Tr>
                            <Th>Race</Th>
                            <Th>Circuit</Th>
                        </Tr>
                    </template>
                    <template #body>
                        <Tr v-for="race of wonRaces.data" :key="race.season.toString() + race.name">
                            <Td>
                                <Link :href="race.url" target="_blank"> {{ race.season }} {{ race.name }} </Link>
                            </Td>
                            <Td>
                                <Link :href="race.circuit.url" target="_blank">{{ race.circuit.name }}</Link>
                                <div class="text-xs dark:text-gray-400">
                                    {{ race.circuit.location.locality }}, {{ race.circuit.location.country }}
                                </div>
                            </Td>
                        </Tr>
                    </template>
                </Table>

                <div class="p-4">
                    <PaginationButtons
                        v-if="wonRaces.totalPages > 1"
                        :pagination="wonRaces"
                        @previous-page="previousPage"
                        @next-page="nextPage"
                    />
                </div>
            </Card>
        </div>
        <div v-else-if="!wonRaces">
            <LoadingSpinner class="mt-4 text-4xl" />
        </div>
    </template>
    <template v-else-if="driver === null">
        <div class="text-4xl">Driver not found</div>
    </template>
    <template v-else>
        <LoadingSpinner class="text-4xl" />
    </template>
</template>
