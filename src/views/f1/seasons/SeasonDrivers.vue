<script setup lang="ts">
import Card from '@/components/Card.vue';
import Table from '@/components/table/Table.vue';
import Td from '@/components/table/Td.vue';
import Th from '@/components/table/Th.vue';
import Tr from '@/components/table/Tr.vue';
import { Jolpica } from '@/modules/jolpica';
import { DriverStanding } from '@/modules/jolpica/DriverStanding';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    season: number;
}>();

const standings = ref<DriverStanding[]>();

watch(
    () => props.season,
    () => {
        refreshData();
    },
);

onMounted(() => {
    refreshData();
});

async function refreshData() {
    const { MRData } = await Jolpica.request('/{season}/driverstandings', { season: props.season });

    if (MRData.total !== '0') {
        standings.value = MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (standing) => new DriverStanding(standing),
        );
    } else {
        standings.value = undefined;
    }
}
</script>

<template>
    <Card>
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
                        <RouterLink :to="{ name: 'driverShow', params: { id: standing.Driver.id } }" class="underline">
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
    </Card>
</template>
