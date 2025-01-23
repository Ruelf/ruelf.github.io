<script setup lang="ts">
import Card from '@/components/Card.vue';
import { makeJolpicaRequest } from '@/helpers/helpers';
import type { Driver, DriverTable, MRData } from '@/types/jolpica';
import { onMounted, ref } from 'vue';

const drivers = ref<Driver[]>();
const data = ref<MRData<DriverTable>>();

onMounted(() => {
    refreshDrivers({ limit: 10 });
});

async function refreshDrivers(params?: { limit?: number; offset?: number; }): Promise<void> {
    const response = await makeJolpicaRequest<DriverTable>('/drivers', { params });
    data.value = response.MRData;
    drivers.value = response.MRData.DriverTable.Drivers;
}

function previousPage(): void {
    if (!data.value) {
        return;
    }

    refreshDrivers({ limit: +data.value.limit, offset: +data.value.offset - +data.value.limit });
}

function nextPage(): void {
    if (!data.value) {
        return;
    }

    refreshDrivers({ limit: +data.value.limit, offset: +data.value.offset + +data.value.limit });
}
</script>

<template>
    <Card class="p-4">
        <table>
            <thead>
                <tr>
                    <th>givenName</th>
                    <th>familyName</th>
                    <th>driverId</th>
                    <th>dateOfBirth</th>
                    <th>nationality</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="driver of drivers" :key="driver.driverId">
                    <td>{{ driver.givenName }}</td>
                    <td>{{ driver.familyName }}</td>
                    <td>{{ driver.driverId }}</td>
                    <td>{{ driver.dateOfBirth }}</td>
                    <td>{{ driver.nationality }}</td>
                </tr>
            </tbody>
        </table>

        <template v-if="data">
            <div class="mt-4">
                Page {{ +data.offset / +data.limit + 1 }} of {{ Math.ceil(+data.total / +data.limit) }}
            </div>
            <div class="mt-4">
                Showing {{ data.offset }} to {{ +data.offset + +data.limit }} of {{ data.total }}
            </div>
        </template>


        <div class="flex gap-4">
            <button class="border border-red-500" @click="previousPage">Previous page</button>
            <button class="border border-red-500" @click="nextPage">Next page</button>
        </div>
    </Card>
</template>
