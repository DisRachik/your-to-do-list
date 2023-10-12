import { Col, Container, Row } from "react-bootstrap";
import { useTodos } from "../redux/todos/useTodos";
import { TodoCard } from "./TodoCard";

export const TodoList = () => {
	const { todos, filter } = useTodos();

	const displayContacts = (() => {
		if (filter === "") {
			return todos;
		}
		return todos.filter(({ taskStatus }) => taskStatus.toString() === filter);
	})();

	return (
		<Container>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-4 justify-content-center" style={{ marginTop: "2rem" }}>
				{displayContacts &&
					displayContacts.map(todo => (
						<Col key={todo.id} className="d-flex justify-content-center">
							<TodoCard data={todo} />
						</Col>
					))}
			</Row>
		</Container>
	);
};
