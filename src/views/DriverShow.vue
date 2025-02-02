<script setup lang="ts">
import Card from '@/components/Card.vue';
import Table from '@/components/table/Table.vue';
import Td from '@/components/table/Td.vue';
import Th from '@/components/table/Th.vue';
import Tr from '@/components/table/Tr.vue';
import { Driver, Jolpica, type Pagination, type Race } from '@/modules/jolpica';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    id: string;
}>();

const driver = ref<Driver | null>();
const races = ref<Pagination<Race>>();

onMounted(async () => {
    driver.value = await Jolpica.getDriver(props.id);
    refreshRaces({ limit: 10 });
});

async function refreshRaces(params?: { limit?: number; offset?: number }): Promise<void> {
    if (driver.value) {
        console.log(driver.value);

        races.value = await driver.value.getRacesWithResults(params);
    }
}

function previousPage(): void {
    if (!races.value) {
        return;
    }

    refreshRaces({
        limit: races.value.limit,
        offset: races.value.offset - races.value.limit,
    });
}

function nextPage(): void {
    if (!races.value) {
        return;
    }

    refreshRaces({
        limit: races.value.limit,
        offset: races.value.offset + races.value.limit,
    });
}
</script>

<template>
    <Card>
        <div class="p-4 text-4xl">{{ driver?.givenName }} {{ driver?.familyName }}</div>
        <Table>
            <template #head>
                <Tr>
                    <Th>Race</Th>
                    <Th>Circuit</Th>
                    <Th>Position</Th>
                </Tr>
            </template>
            <template #body>
                <Tr v-for="race of races?.data" :key="race.name">
                    <Td>{{ race.season }} {{ race.name }}</Td>
                    <Td>
                        {{ race.circuit.name }}, {{ race.circuit.location.locality }},
                        {{ race.circuit.location.country }}
                    </Td>
                    <Td>
                        {{ race.results ? race.results[0].positionText : 'Unknown' }}
                    </Td>
                </Tr>
            </template>
        </Table>

        <div class="p-4">
            <template v-if="races">
                <div class="mt-4">Page {{ races.currentPage }} of {{ races.totalPages }}</div>
                <div class="mt-4">Showing {{ races.from }} to {{ races.to }} of {{ races.total }}</div>
            </template>

            <div class="flex gap-4">
                <button class="border border-red-500" @click="previousPage">Previous page</button>
                <button class="border border-red-500" @click="nextPage">Next page</button>
            </div>
        </div>
    </Card>
</template>
