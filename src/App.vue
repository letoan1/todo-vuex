<script setup lang="ts">
import TodoList from './components/TodoList.vue';
</script>

<template>
  <div>
    <h1 class="lg-title">Todo lỏ with Vuex</h1>
   <todo-list></todo-list>
  </div>
</template>

<style scoped>

.lg-title {
  text-align: center;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
