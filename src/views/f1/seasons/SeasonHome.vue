<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Table, Td, Th, Tr } from '@/components/table';
import { Jolpica, Race } from '@/modules/jolpica';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    season: number;
}>();

const races = ref<Race[]>();

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
    const { MRData } = await Jolpica.request('/{season}/results/{position}', {
        season: props.season,
        position: 1,
    });
    races.value = MRData.RaceTable.Races.map((race) => new Race(race));
}
</script>

<template>
    <Card>
        <Table>
            <template #head>
                <Tr>
                    <Th></Th>
                    <Th>Race</Th>
                    <Th>Won by</Th>
                </Tr>
            </template>

            <template #body>
                <Tr v-for="race of races" :key="race.name">
                    <Td class="w-4">{{ race.round }}</Td>
                    <Td>
                        <div>{{ race.name }}</div>
                        <div class="text dark:text-gray-400">
                            {{ race.circuit.name }}
                        </div>
                    </Td>
                    <Td>{{
                        race.results ? race.results[0].Driver.name : 'Unknown'
                    }}</Td>
                </Tr>
            </template>
        </Table>
    </Card>
</template>
