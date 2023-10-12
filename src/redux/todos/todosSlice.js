import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
	todos: [],
	filter: "",
};

export const todosSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addNewTodo: {
			reducer: (state, { payload }) => {
				state.todos.push(payload);
			},
			prepare: newTodo => ({ payload: { ...newTodo, id: nanoid() } }),
		},
		deleteTodo: (state, { payload }) => {
			state.todos = state.todos.filter(({ id }) => id !== payload);
		},
		updateTaskStatus: (state, { payload }) => {
			state.todos = state.todos.map(todo => (todo.id === payload ? { ...todo, taskStatus: !todo.taskStatus } : todo));
		},
		updateTodo: (state, { payload }) => {
			state.todos = state.todos.map(todo => (todo.id === payload.id ? { ...todo, ...payload } : todo));
		},
		filterTodos: (state, { payload }) => {
			state.filter = payload;
		},
	},
});

export const { addNewTodo, deleteTodo, updateTaskStatus, updateTodo, filterTodos } = todosSlice.actions;
