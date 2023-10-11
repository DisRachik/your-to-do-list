import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "./selectors";

import * as actions from "./todosSlice";

export const useTodos = () => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);

	const addNewTodo = newTodo => {
		dispatch(actions.addNewTodo(newTodo));
	};

	const deleteTodo = id => {
		dispatch(actions.deleteTodo(id));
	};

	return { todos, addNewTodo, deleteTodo };
};
