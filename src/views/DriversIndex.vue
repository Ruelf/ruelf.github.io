<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Table, Td, Th, Tr } from '@/components/table';
import { range } from '@/helpers/helpers';
import { type Driver, Jolpica, type Pagination } from '@/modules/jolpica';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import InputField from '@/components/InputField.vue';

const props = withDefaults(
    defineProps<{
        season?: number;
    }>(),
    {
        season: dayjs().year(),
    },
);

const drivers = ref<Pagination<Driver>>();

const minYear = 1950;
const maxYear = dayjs().year();

const season = ref(Math.max(minYear, Math.min(maxYear, props.season)));

onMounted(() => {
    refreshDrivers();
    updateUrl();
});

async function refreshDrivers(): Promise<void> {
    drivers.value = await Jolpica.getDrivers({ season: season.value }, { limit: 100 });
}

function seasonChange(): void {
    season.value = Math.max(minYear, Math.min(maxYear, season.value));
    refreshDrivers();
    updateUrl();
}

function updateUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('season', season.value.toString());
    window.history.replaceState({}, '', url);
}
</script>

<template>
    <div class="mb-4 flex gap-4">
        <label for="season">Season</label>

        <InputField
            v-model="season"
            type="number"
            inputmode="numeric"
            :min="minYear"
            :max="maxYear"
            id="season"
            @change="seasonChange"
        />

        <input
            v-model="season"
            type="range"
            :min="minYear"
            :max="maxYear"
            list="season-markers"
            class="w-full"
            @change="seasonChange"
        />

        <datalist id="season-markers">
            <option
                v-for="year of range(minYear, maxYear + 1).filter((year) => year % 10 == 0)"
                :key="year"
                :value="year"
            ></option>
        </datalist>
    </div>

    <Card>
        <template v-if="drivers">
            <Table>
                <template #head>
                    <Tr>
                        <Th>Name</Th>
                        <Th>DOB</Th>
                        <Th>Nationality</Th>
                    </Tr>
                </template>
                <template #body>
                    <Tr v-for="driver of drivers.data.sort((a, b) => a.name.localeCompare(b.name))" :key="driver.id">
                        <Td>
                            <RouterLink :to="{ name: 'driverShow', params: { id: driver.id } }" class="underline">
                                {{ driver.name }}
                            </RouterLink>
                        </Td>

                        <Td>{{ driver.dateOfBirth.toLocaleDateString() }}</Td>
                        <Td>{{ driver.nationality }}</Td>
                    </Tr>
                </template>
            </Table>
        </template>
    </Card>
</template>
