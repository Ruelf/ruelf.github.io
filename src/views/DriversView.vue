<script setup lang="ts">
import Card from '@/components/Card.vue';
import Table from '@/components/table/Table.vue';
import Td from '@/components/table/Td.vue';
import Th from '@/components/table/Th.vue';
import Tr from '@/components/table/Tr.vue';
import type { Driver } from '@/jolpica/Driver';
import { Jolpica, type ApiOptions } from '@/jolpica/Jolpica';
import type { Pagination } from '@/jolpica/Pagination';
import { onMounted, ref } from 'vue';

const drivers = ref<Pagination<Driver>>();

onMounted(() => {
    refreshDrivers({ limit: 12 });
});

async function refreshDrivers(options?: ApiOptions): Promise<void> {
    drivers.value = await Jolpica.getDrivers(options);
}

function previousPage(): void {
    if (!drivers.value) {
        return;
    }

    refreshDrivers({
        limit: drivers.value.limit,
        offset: drivers.value.offset - drivers.value.limit,
    });
}

function nextPage(): void {
    if (!drivers.value) {
        return;
    }

    refreshDrivers({
        limit: drivers.value.limit,
        offset: drivers.value.offset + drivers.value.limit,
    });
}
</script>

<template>
    <Card>
        <Table>
            <template #head>
                <Tr>
                    <Th>givenName</Th>
                    <Th>familyName</Th>
                    <Th>id</Th>
                    <Th>dateOfBirth</Th>
                    <Th>nationality</Th>
                </Tr>
            </template>
            <template #body>
                <Tr
                    v-for="driver of drivers?.data"
                    :key="driver.id"
                >
                    <Td>{{ driver.givenName }}</Td>
                    <Td>{{ driver.familyName }}</Td>
                    <Td>{{ driver.id }}</Td>
                    <Td>{{ driver.dateOfBirth.toLocaleDateString() }}</Td>
                    <Td>{{ driver.nationality }}</Td>
                </Tr>
            </template>
        </Table>

        <div class="p-4">
            <template v-if="drivers">
                <div class="mt-4">Page {{ drivers.currentPage }} of {{ drivers.totalPages }}</div>
                <div class="mt-4">Showing {{ drivers.from }} to {{ drivers.to }} of {{ drivers.total }}</div>
            </template>

            <div class="flex gap-4">
                <button
                    class="border border-red-500"
                    @click="previousPage"
                >
                    Previous page
                </button>
                <button
                    class="border border-red-500"
                    @click="nextPage"
                >
                    Next page
                </button>
            </div>
        </div>
    </Card>
</template>
