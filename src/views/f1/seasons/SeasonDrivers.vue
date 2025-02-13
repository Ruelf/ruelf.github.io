<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Table, Td, Th, Tr } from '@/components/table';
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
    standings.value = await Jolpica.getSeasonDriverStandings(props.season);
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
