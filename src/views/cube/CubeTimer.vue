<script setup lang="ts">
import Card from '@/components/Card.vue';
import InputField from '@/components/InputField.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import Table from '@/components/table/Table.vue';
import Td from '@/components/table/Td.vue';
import Th from '@/components/table/Th.vue';
import Tr from '@/components/table/Tr.vue';
import { collect, localStorageRef } from '@/utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface Record {
    startTime: number;
    endTime: number;
}

const startDelayTime = localStorageRef('cube.startDelay', 500);

const status = localStorageRef('cube.status', 'idle');

const startTime = localStorageRef<number>('cube.startTime');
const endTime = ref<number>();

const records = localStorageRef<Record[]>('cube.records', []);

const perPage = 10;
const currentPage = ref(0);

const pages = computed(() => collect(records.value).chunk(perPage));

let startDelayTimeoutId: number;
let timerIntervalId: number;

onMounted(() => {
    switch (status.value) {
        case 'waiting_for_start_delay':
        case 'ready':
            status.value = 'idle';
            break;

        case 'running':
            timerIntervalId = setInterval(() => {
                endTime.value = Date.now();
            });
            break;
    }
});

function down() {
    switch (status.value) {
        case 'idle':
            status.value = 'waiting_for_start_delay';

            startDelayTimeoutId = setTimeout(() => {
                status.value = 'ready';
            }, startDelayTime.value);
            break;

        case 'running':
            const now = Date.now();
            clearInterval(timerIntervalId);
            endTime.value = now;
            status.value = 'finished';

            if (startTime.value) {
                records.value.unshift({
                    startTime: startTime.value,
                    endTime: endTime.value,
                });
            }

            break;
    }
}

function up() {
    switch (status.value) {
        case 'waiting_for_start_delay':
            if (startDelayTimeoutId) {
                clearTimeout(startDelayTimeoutId);
            }

            status.value = 'idle';
            break;

        case 'ready':
            status.value = 'running';
            startTime.value = Date.now();

            timerIntervalId = setInterval(() => {
                endTime.value = Date.now();
            });
            break;

        case 'finished':
            status.value = 'idle';
            break;
    }
}

eventListener('keydown', ({ code }) => {
    if (code === 'Space') {
        down();
    }
});

eventListener('keyup', ({ code }) => {
    if (code === 'Space') {
        up();
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
    <div class="flex flex-col gap-1">
        <label for="start_delay">Start delay</label>
        <div>
            <InputField
                v-model="startDelayTime"
                type="number"
                id="start_delay"
                class="max-w-24"
            />
            ms
        </div>
    </div>

    <div class="flex flex-col-reverse">
        <Card class="bottom-0 right-0 m-0 bg-red-500 2xl:absolute 2xl:m-8">
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
                        <Td class="text-right">
                            {{ record.startTime }}
                        </Td>
                        <Td class="text-right">
                            {{ record.endTime }}
                        </Td>
                        <Td class="text-right">
                            {{
                                (
                                    (record.endTime - record.startTime) /
                                    1000
                                ).toFixed(3)
                            }}
                        </Td>
                    </Tr>
                </template>
            </Table>

            <div class="flex justify-between p-4">
                <SecondaryButton
                    :disabled="currentPage <= 0"
                    @click="currentPage--"
                >
                    <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
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
                    <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
                </SecondaryButton>
            </div>
        </Card>

        <div
            @mousedown="down"
            @mouseup="up"
            @touchstart.prevent="down"
            @touchend="up"
            class="flex flex-col items-center justify-center p-52"
        >
            <span
                :class="{
                    'text-red-500': status === 'waiting_for_start_delay',
                    'text-green-500': status === 'ready',
                }"
                class="select-none text-9xl"
            >
                {{
                    Math.max(
                        0,
                        endTime && startTime ? (endTime - startTime) / 1000 : 0,
                    ).toFixed(3)
                }}
            </span>
        </div>
    </div>
</template>
