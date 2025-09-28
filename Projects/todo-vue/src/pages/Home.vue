<template>
  <section class="min-h-screen bg-gray-100 py-16 px-6">
    <div class="w-full px-6">

      <!-- Header -->
      <header class="mb-14 text-center">
        <h1 class="text-6xl font-extrabold text-gray-900 tracking-tight mb-4">📋 Task Dashboard</h1>
        <p class="text-xl text-gray-600">Stay productive and organized with your personal todo list</p>
        <button
          @click="auth.logout(); router.push('/login')"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <!-- Controls -->
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          v-model="searchTerm"
          class="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full max-w-xs"
        />
        <select
          v-model="statusFilter"
          class="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </select>
        <button
          @click="showCreate = true"
          class="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          ➕ Add New Task
        </button>
      </div>

      <!-- Todo List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-if="loading" class="col-span-full text-center text-gray-500">Loading tasks...</div>
        <div v-else-if="paginatedTodos.length === 0" class="col-span-full text-center text-gray-500">No tasks found</div>
        <TodoCard
          v-for="todo in paginatedTodos"
          :key="todo.id"
          :todo="todo"
          @edit="editingTodo = $event"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-16 flex justify-center items-center gap-8">
        <button @click="prevPage" class="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">← Previous</button>
        <span class="text-gray-700 text-lg font-medium">Page {{ page }}</span>
        <button @click="nextPage" class="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Next →</button>
      </div>
    </div>

    <!-- Modals -->
    <CreateTodoModal v-if="showCreate" @close="showCreate = false" />
    <EditTodoModal v-if="editingTodo" :todo="editingTodo" @close="editingTodo = null" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TodoCard from '../components/TodoCard.vue';
import CreateTodoModal from '../components/CreateTodoModal.vue';
import EditTodoModal from '../components/EditTodoModal.vue';
import { Todo, useTodos } from '../composables/useTodos';

const ITEMS_PER_PAGE = 10;

export default defineComponent({
  name: 'Home',
  components: { TodoCard, CreateTodoModal, EditTodoModal },
  setup() {
    const router = useRouter();
    const auth = { logout: () => console.log('Logged out') };

    const { todos, fetchTodos, loading } = useTodos();

    const page = ref(1);
    const searchTerm = ref('');
    const statusFilter = ref('all');
    const editingTodo = ref<Todo | null>(null);
    const showCreate = ref(false);

    onMounted(fetchTodos);

    // Filtered todos
    const filteredTodos = computed(() =>
      todos.value.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesStatus =
          statusFilter.value === 'all' ||
          (statusFilter.value === 'completed' && todo.completed) ||
          (statusFilter.value === 'not_completed' && !todo.completed);
        return matchesSearch && matchesStatus;
      })
    );

    // Pagination
    const paginatedTodos = computed(() => {
      const start = (page.value - 1) * ITEMS_PER_PAGE;
      return filteredTodos.value.slice(start, start + ITEMS_PER_PAGE);
    });

    const prevPage = () => (page.value = Math.max(page.value - 1, 1));
    const nextPage = () => (page.value = page.value + 1);

    return {
      todos,
      loading,
      page,
      searchTerm,
      statusFilter,
      editingTodo,
      showCreate,
      paginatedTodos,
      prevPage,
      nextPage,
      auth,
      router,
    };
  },
});
</script>

<style scoped>
/* Optional: add some spacing for modals */
</style>
