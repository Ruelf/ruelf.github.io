<script setup lang="ts">
import { makeJolpicaRequest } from '@/helpers/helpers';
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
                <td>{{ driver.driverId }}</td>
                <td>{{ driver.url }}</td>
                <td>{{ driver.givenName }}</td>
                <td>{{ driver.familyName }}</td>
                <td>{{ driver.dateOfBirth }}</td>
                <td>{{ driver.nationality }}</td>
            </tr>
        </tbody>
    </table>
</template>
