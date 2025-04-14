<script setup lang="ts">
import Card from '@/components/Card.vue';
import FormatSeconds from '@/components/FormatSeconds.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import Table from '@/components/table/Table.vue';
import Td from '@/components/table/Td.vue';
import Th from '@/components/table/Th.vue';
import Tr from '@/components/table/Tr.vue';
import { collect, localStorageRef } from '@/utils';
import dayjs from 'dayjs';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface Record {
    startTime: number;
    endTime: number;
}

const status = localStorageRef('cube.status', 'idle');

const startTime = localStorageRef<number>('cube.startTime');
const endTime = ref<number>();

const outputDuration = computed(() =>
    Math.max(
        0,
        endTime.value && startTime.value
            ? (endTime.value - startTime.value) / 1000
            : 0,
    ),
);

const records = localStorageRef<Record[]>('cube.records', []);

const perPage = 10;
const currentPage = ref(0);

const pages = computed(() => collect(records.value).chunk(perPage));

let timerIntervalId: number;

onMounted(() => {
    if (status.value === 'running') {
        timerIntervalId = setInterval(() => {
            endTime.value = Date.now();
        });
    } else {
        status.value = 'idle';
    }
});

function start() {
    if (status.value !== 'idle') {
        return;
    }

    status.value = 'running';
    startTime.value = Date.now();

    timerIntervalId = setInterval(() => {
        endTime.value = Date.now();
    });
}

function stop() {
    status.value = 'idle';

    clearInterval(timerIntervalId);
}

function toggle() {
    if (status.value === 'idle') {
        start();
    } else {
        stop();
    }
}

eventListener('keydown', ({ code }) => {
    if (code === 'Space') {
        toggle();
    }
});

function eventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
): void {
    onMounted(() => {
        document.body.addEventListener(type, listener);
    });
    onBeforeUnmount(() => {
        document.body.removeEventListener(type, listener);
    });
}
</script>

<template>
    <div class="grid gap-4">
        <div>
            <Card
                @click="toggle"
                :class="{
                    'text-red-500': status === 'waiting_for_start_delay',
                    'text-green-500': status === 'ready',
                }"
                class="flex justify-center p-4"
            >
                <FormatSeconds
                    :seconds="outputDuration"
                    class="select-none font-mono text-8xl 2xl:text-9xl"
                />
            </Card>
        </div>

        <div class="grid gap-4 sm:grid-cols-12">
            <Card class="col-span-6 p-4">
                <button
                    @click="toggle"
                    :class="[
                        'rounded-lg px-4 py-2 text-lg uppercase text-white hover:opacity-75 active:opacity-50',
                        status === 'running'
                            ? ['bg-red-500']
                            : ['bg-green-500'],
                        'button-3d',
                    ]"
                >
                    <div>
                        <font-awesome-icon
                            :icon="[
                                'fas',
                                status === 'running' ? 'stop' : 'play',
                            ]"
                        />
                    </div>
                </button>
            </Card>

            <Card class="col-span-6">
                <template #header>
                    <div class="flex justify-between">
                        <div class="text-xl">Times</div>
                        <SecondaryButton
                            :disabled="records.length === 0"
                            @click="records = []"
                        >
                            Reset
                        </SecondaryButton>
                    </div>
                </template>

                <Table>
                    <template #head>
                        <Tr>
                            <Th>Start</Th>
                            <Th>End</Th>
                            <Th>Time</Th>
                        </Tr>
                    </template>

                    <template #body>
                        <Tr
                            v-for="record of pages[currentPage]"
                            :key="record.startTime"
                        >
                            <Td>
                                {{ dayjs(record.startTime).format('lll') }}
                            </Td>
                            <Td>
                                {{ dayjs(record.endTime).format('lll') }}
                            </Td>
                            <Td>
                                {{ (record.endTime - record.startTime) / 1000 }}
                            </Td>
                        </Tr>
                    </template>
                </Table>

                <div class="flex justify-between p-4">
                    <SecondaryButton
                        :disabled="currentPage <= 0"
                        @click="currentPage--"
                    >
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </SecondaryButton>

                    <div class="flex flex-col items-center text-sm">
                        <div>
                            Page
                            <b>{{ currentPage + 1 }}</b>
                            of
                            <b>{{ pages.length }}</b>
                        </div>
                        <div>
                            Total: <b>{{ records.length }}</b>
                        </div>
                    </div>

                    <SecondaryButton
                        :disabled="currentPage + 1 >= pages.length"
                        @click="currentPage++"
                    >
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                    </SecondaryButton>
                </div>
            </Card>
        </div>
    </div>
</template>
