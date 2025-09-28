<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white rounded p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">➕ Create New Todo</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="title" placeholder="Enter task title" class="w-full p-2 border rounded" required />
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="completed" /> Completed
        </label>
        <div class="flex justify-end gap-4">
          <button type="button" @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useTodos } from '../composables/useTodos';

export default defineComponent({
  name: 'CreateTodoModal',
  emits: ['close'],
  setup(_, { emit }) {
    const title = ref('');
    const completed = ref(false);
    const saving = ref(false);
    const { createTodo } = useTodos();

    const handleSubmit = async () => {
      saving.value = true;
      await createTodo(title.value, completed.value);
      saving.value = false;
      emit('close');
    };

    return { title, completed, saving, handleSubmit };
  },
});
</script>
