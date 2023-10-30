<template>
  <div class="font-sans">
    <input
      v-model="newTodo"
      placeholder="Add new todo..."
      class="input__todo"
      v-on:keyup.enter = "handleAddTodo"
    />
    <button class="add--btn" @click="handleAddTodo">Add Todo</button>
    <select v-model="selectedType" class="select__type">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
    <ul class="flex flex-row p-200 todo__list" v-if="!!allTodos.length">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <p>
          <span :class="{ completed: todo.completed }">{{ todo.todo }}</span>
          <span class="action">
            <span
              :style="{ cursor: 'pointer' }"
              @click="handleRemoveTodo(todo.id)"
              >❌</span
            >
            <span
              :style="{ cursor: 'pointer' }"
              @click="handleCompleteTodo(todo.id)"
              >✔</span
            >
          </span>
        </p>
      </li>
    </ul>
    <div class="nothing" v-else>Great ✨✨✨, u don't have a task today!</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Todos } from "../interface";
import store from "../store";

enum TypeSelect {
  ALL = "all",
  COMPLETED = "completed",
  INCOMPLETED = "incomplete"
}

const newTodo = ref<string>("");
const selectedType = ref(TypeSelect.ALL);
const allTodos = computed(() => store.getters.allTodos);
const completeTodo = computed(() => store.getters.completedTodo);
const incompleteTodo = computed(() => store.getters.incompleteTodo);

const filteredTodos = computed(() => {
  switch (selectedType.value) {
    case TypeSelect.ALL:
      return allTodos.value;
    case TypeSelect.COMPLETED:
      return completeTodo.value;
    case TypeSelect.INCOMPLETED:
      return incompleteTodo.value;
    default:
      return allTodos.value;
  }
});

const handleAddTodo = () => {
  if (newTodo.value.trim() !== "") {
    const newTodoItem: Todos = {
      id: Date.now(),
      todo: newTodo.value,
      completed: false,
    };

    store.dispatch("addTodo", newTodoItem);
    newTodo.value = "";
  }
};

const handleRemoveTodo = (todoId: number) => {
  store.dispatch("removeTodo", todoId);
};

const handleCompleteTodo = (todoId: number) => {
  store.dispatch("completedTodo", todoId);
};
</script>

<style scoped>
.input__todo,
.select__type {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgb(52, 187, 164);
}
.add--btn {
  margin: 0 10px;
}

.todo__list {
  padding: 0;
}
.todo__list li {
  list-style: none;
}

p {
  display: flex;
  justify-content: space-between;
}

.action {
  display: flex;
  gap: 15px;
}
.completed {
  text-decoration: line-through;
}

.nothing {
  text-align: center;
  margin-top: 16px;
}
</style>

