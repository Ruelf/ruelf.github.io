<script setup lang="ts">
import Card from '@/components/Card.vue'
import InputField from '@/components/InputField.vue'
import Table from '@/components/table/Table.vue'
import Td from '@/components/table/Td.vue'
import Th from '@/components/table/Th.vue'
import Tr from '@/components/table/Tr.vue'
import type { Pdok } from '@/types/pdok'
import axios from 'axios'
import { ref } from 'vue'

const data = ref<Pdok.Address[]>()
const inputText = ref<string>()

async function onChange(): Promise<void> {
    const response = await axios.get<Pdok.Response>('https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest', {
        params: {
            q: inputText.value,
            rows: 20,
            start: 0,
            fq: 'type:adres',
            fl: '*',
        },
    })

    data.value = response.data.response.docs
}
</script>

<template>
    <Card>
        <div class="p-4">
            <InputField v-model="inputText" @keydown.enter="onChange" />
        </div>
        <div class="mt-4">
            <Table>
                <template #head>
                    <Tr>
                        <Th>Adres</Th>
                        <Th>Postcode</Th>
                        <Th>Wijk</Th>
                        <Th>Plaats</Th>
                        <Th>Gemeente</Th>
                        <Th>Provincie</Th>
                    </Tr>
                </template>
                <template #body>
                    <Tr v-for="address of data" :key="address.id">
                        <Td>{{ address.straatnaam }} {{ address.huis_nlt }}</Td>
                        <Td>{{ address.postcode }}</Td>
                        <Td>{{ address.wijknaam }}</Td>
                        <Td>{{ address.woonplaatsnaam }}</Td>
                        <Td>{{ address.gemeentenaam }}</Td>
                        <Td>{{ address.provincienaam }}</Td>
                    </Tr>
                </template>
            </Table>
        </div>
    </Card>
</template>
