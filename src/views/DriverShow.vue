<script setup lang="ts">
import Card from '@/components/Card.vue';
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

async function refreshRaces(options?: ApiOptions): Promise<void> {
    if (driver.value) {
        console.log(driver.value);

        wonRaces.value = await driver.value.getRaceResults({ position: 1 }, options);
    }
}

function previousPage(): void {
    if (!wonRaces.value) {
        return;
    }

    refreshRaces({
        limit: wonRaces.value.limit,
        offset: wonRaces.value.offset - wonRaces.value.limit,
    });
}

function nextPage(): void {
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
        <div class="text-4xl">{{ driver.givenName }} {{ driver.familyName }}</div>
        <div class="mt-4 grid grid-cols-12 gap-4">
            <Card class="col-span-6">
                <Table>
                    <template #head>
                        <Tr>
                            <Th>Race</Th>
                        </Tr>
                    </template>
                    <template #body>
                        <Tr v-for="race of wonRaces?.data" :key="race.name">
                            <Td>{{ race.season }} {{ race.name }}</Td>
                            <Td>
                                {{ race.circuit.name }}, {{ race.circuit.location.locality }},
                                {{ race.circuit.location.country }}
                            </Td>
                        </Tr>
                    </template>
                </Table>

                <div class="p-4">
                    <PaginationButtons
                        v-if="wonRaces"
                        :pagination="wonRaces"
                        @previous-page="previousPage"
                        @next-page="nextPage"
                    />
                </div>
            </Card>
        </div>
    </template>
</template>
