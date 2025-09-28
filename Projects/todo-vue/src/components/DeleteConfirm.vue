<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white rounded p-6 w-full max-w-sm text-center">
      <p class="mb-4">Are you sure you want to delete this task?</p>
      <div class="flex justify-center gap-4">
        <button @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button @click="handleDelete" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTodos } from '../composables/useTodos';

export default defineComponent({
  name: 'DeleteConfirm',
  props: { id: { type: Number, required: true } },
  emits: ['close'],
  setup(props, { emit }) {
    const { deleteTodo } = useTodos();

    const handleDelete = async () => {
      await deleteTodo(props.id);
      emit('close');
    };

    return { handleDelete };
  },
});
</script>
