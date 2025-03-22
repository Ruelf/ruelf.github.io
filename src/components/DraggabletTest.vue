<script setup lang="ts" generic="T">
export type DraggableEvent<T> = {
    moved?: {
        element: T;
        oldIndex: number;
        newIndex: number;
    };
    added?: {
        element: T;
        oldIndex: number;
    };
    removed?: {
        element: T;
        newIndex: number;
    };
};

const model = defineModel<T[]>();

const emit = defineEmits<{
    (type: 'change', event: DraggableEvent<T>): void;
}>();

if (model.value) {
    emit('change', { added: { element: model.value[0], oldIndex: 9 } });
}
</script>
