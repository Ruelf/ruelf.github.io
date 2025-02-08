<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Table, Td, Th, Tr } from '@/components/table';
import { range } from '@/helpers';
import { Jolpica } from '@/modules/jolpica';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import InputField from '@/components/InputField.vue';
import { DriverStanding } from '@/modules/jolpica/DriverStanding';

const props = withDefaults(
    defineProps<{
        season?: number;
    }>(),
    {
        season: dayjs().year(),
    },
);

const standings = ref<DriverStanding[]>();

const minYear = 1950;
const maxYear = dayjs().year();

const season = ref(Math.max(minYear, Math.min(maxYear, props.season)));

onMounted(() => {
    refreshDrivers();
    updateUrl();
});

async function refreshDrivers() {
    const { MRData } = await Jolpica.request('/{season}/driverstandings', { season: season.value });

    if (MRData.total !== '0') {
        standings.value = MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (standing) => new DriverStanding(standing),
        );
    } else {
        standings.value = undefined;
    }
}

function seasonChange() {
    season.value = Math.max(minYear, Math.min(maxYear, season.value));
    refreshDrivers();
    updateUrl();
}

function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('season', season.value.toString());
    window.history.replaceState({}, '', url);
}
</script>

<template>
    <div class="mb-4 flex gap-4 px-2 sm:px-0">
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

        <div class="flex w-full gap-2">
            <div>{{ minYear }}</div>

            <input
                v-model="season"
                type="range"
                :min="minYear"
                :max="maxYear"
                list="season-markers"
                class="w-full"
                @change="seasonChange"
            />

            <div>{{ maxYear }}</div>
        </div>

        <datalist id="season-markers">
            <option
                v-for="year of range(minYear, maxYear + 1).filter((year) => year % 10 == 0)"
                :key="year"
                :value="year"
            ></option>
        </datalist>
    </div>

    <Card>
        <template v-if="standings">
            <Table>
                <template #head>
                    <Tr>
                        <Th></Th>
                        <Th>Name</Th>
                        <Th>Constructor</Th>
                        <Th>Points</Th>
                        <Th>Wins</Th>
                    </Tr>
                </template>
                <template #body>
                    <Tr v-for="standing of standings" :key="standing.Driver.id">
                        <Td>
                            {{ standing.positionText }}
                        </Td>
                        <Td>
                            <RouterLink
                                :to="{ name: 'driverShow', params: { id: standing.Driver.id } }"
                                class="underline"
                            >
                                {{ standing.Driver.name }}
                            </RouterLink>
                        </Td>
                        <Td>
                            {{ standing.Constructors.map((constructor) => constructor.name).join(', ') }}
                        </Td>
                        <Td>
                            {{ standing.points }}
                        </Td>
                        <Td>
                            {{ standing.wins }}
                        </Td>
                    </Tr>
                </template>
            </Table>
        </template>
    </Card>
</template>
