<script setup lang="ts">
import { makeJolpicaRequest } from '@/assets/helpers/helpers';
import type { Driver, DriverTable } from '@/types/jolpica';
import { ref } from 'vue';

const drivers = ref<Driver[]>();

makeJolpicaRequest<DriverTable>('/current/drivers')
    .then(({ MRData }) => {
        drivers.value = MRData.DriverTable.Drivers;
    });
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>driverId</th>
                <th>url</th>
                <th>givenName</th>
                <th>familyName</th>
                <th>dateOfBirth</th>
                <th>nationality</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="driver of drivers" :key="driver.driverId">
                <th>{{ driver.driverId }}</th>
                <th>{{ driver.url }}</th>
                <th>{{ driver.givenName }}</th>
                <th>{{ driver.familyName }}</th>
                <th>{{ driver.dateOfBirth }}</th>
                <th>{{ driver.nationality }}</th>
            </tr>
        </tbody>
    </table>
</template>
