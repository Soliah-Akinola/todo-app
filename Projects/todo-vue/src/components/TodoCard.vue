<template>
  <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
    <h2 class="font-semibold text-lg mb-2">{{ todo.title }}</h2>
    <p class="text-gray-500 mb-4">{{ todo.completed ? '✅ Completed' : '⏳ Incomplete' }}</p>

    <div class="flex gap-4">
      <button @click="$emit('edit', todo)" class="text-blue-600 hover:underline">Edit</button>
      <button @click="showDelete = true" class="text-red-600 hover:underline">Delete</button>
    </div>

    <DeleteConfirm v-if="showDelete" :id="todo.id" @close="showDelete = false" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import DeleteConfirm from './DeleteConfirm.vue';
import { Todo } from '../composables/useTodos';

export default defineComponent({
  name: 'TodoCard',
  components: { DeleteConfirm },
  props: { todo: { type: Object as () => Todo, required: true } },
  setup() {
    const showDelete = ref(false);
    return { showDelete };
  },
});
</script>
