import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
	todos: [],
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
	},
});

export const { addNewTodo, deleteTodo } = todosSlice.actions;
