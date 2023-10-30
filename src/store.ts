import { createStore } from "vuex";
import { Todos } from "./interface";

const initState: Todos[] = JSON.parse(localStorage.getItem('todoList') || '[]') 
export default createStore({
    state: {
        todoList: initState
    },
    mutations: {
        addTodo(state, newTodo: Todos) {
            state.todoList.unshift(newTodo);
            localStorage.setItem('todoList', JSON.stringify(state.todoList)); 
        },
        removeTodo(state, todoId: number) {
            state.todoList = state.todoList.filter(todo => todo.id !== todoId);
            localStorage.setItem('todoList', JSON.stringify(state.todoList)); 
        },
        completedTodo(state, todoId: number) {
            const todo = state.todoList.find(todo => todo.id === todoId);
            if(todo) {
                todo.completed = !todo.completed;
            }
            localStorage.setItem('todoList', JSON.stringify(state.todoList)); 
        }
    },
    actions: {
        addTodo({commit}, newTodo: Todos) {
            commit('addTodo', newTodo);
        },
        removeTodo({commit}, todoId: Todos) {
            commit('removeTodo', todoId);
        },
        completedTodo({commit}, todoId: Todos) {
            commit('completedTodo', todoId);
        },
    },
    getters: {
        allTodos(state) {
            return state.todoList
        },
        completedTodo(state) {
            return state.todoList.filter(todo => todo.completed);
        },
        incompleteTodo(state) {
            return state.todoList.filter(todo => !todo.completed);
        }
    }
})
