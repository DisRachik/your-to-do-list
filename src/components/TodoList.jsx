import { Col, Container, Row } from "react-bootstrap";
import { useTodos } from "../redux/useTodos";
import { TodoCard } from "./TodoCard";

export const TodoList = () => {
	const { todos } = useTodos();

	return (
		<Container>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-4 justify-content-center" style={{ marginTop: "2rem" }}>
				{todos.map(todo => (
					<Col key={todo.id} className="d-flex justify-content-center">
						<TodoCard data={todo} />
					</Col>
				))}
			</Row>
		</Container>
	);
};
