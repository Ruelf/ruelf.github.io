<script setup lang="ts">
import type { Driver, DriverTable, Response } from '@/types/jolpica';
import axios from 'axios';
import { ref } from 'vue';

const drivers = ref<Driver[]>();

axios.get<Response<DriverTable>>('https://api.jolpi.ca/ergast/f1/drivers.json')
    .then(({ data }) => {
        drivers.value = data.MRData.DriverTable.Drivers;
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
