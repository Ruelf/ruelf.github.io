<script setup lang="ts">
import DraggabletTest, {
    type DraggableEvent,
} from '@/components/DraggabletTest.vue';
import { ref } from 'vue';

interface Foo {
    bar: string;
}

const test = ref<Foo[]>();

function onChange(event: DraggableEvent<Foo>): void {
    console.log(event);
}
</script>

<template>
    <DraggabletTest v-model="test" @change="onChange" />
</template>
