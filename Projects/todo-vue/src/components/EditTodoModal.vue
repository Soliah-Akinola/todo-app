<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white rounded p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">✏️ Edit Todo</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="title" class="w-full p-2 border rounded" required />
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
import { ref, defineComponent, watch } from 'vue';
import { Todo, useTodos } from '../composables/useTodos';

export default defineComponent({
  name: 'EditTodoModal',
  props: { todo: { type: Object as () => Todo, required: true } },
  emits: ['close'],
  setup(props, { emit }) {
    const title = ref(props.todo.title);
    const completed = ref(props.todo.completed);
    const saving = ref(false);
    const { updateTodo } = useTodos();

    watch(() => props.todo, val => {
      title.value = val.title;
      completed.value = val.completed;
    });

    const handleSubmit = async () => {
      saving.value = true;
      await updateTodo({ ...props.todo, title: title.value, completed: completed.value });
      saving.value = false;
      emit('close');
    };

    return { title, completed, saving, handleSubmit };
  },
});
</script>
