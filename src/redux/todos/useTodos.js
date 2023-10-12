import { useDispatch, useSelector } from "react-redux";
import { selectFilter, selectTodos } from "./selectors";

import * as actions from "./todosSlice";

export const useTodos = () => {
	const dispatch = useDispatch();
	const todos = useSelector(selectTodos);
	const filter = useSelector(selectFilter);

	const addNewTodo = newTodo => {
		dispatch(actions.addNewTodo(newTodo));
	};

	const deleteTodo = id => {
		dispatch(actions.deleteTodo(id));
	};

	const updateTaskStatus = id => {
		dispatch(actions.updateTaskStatus(id));
	};

	const updateTodo = id => {
		dispatch(actions.updateTodo(id));
	};

	const filterTodos = value => {
		dispatch(actions.filterTodos(value));
	};

	return { todos, filter, addNewTodo, deleteTodo, updateTaskStatus, updateTodo, filterTodos };
};
