import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTodos } from "../redux/todos/useTodos";
import { ModalForm } from "./ModalForm";

export const TodoCard = ({ data }) => {
	const { title, describe, taskStatus, id } = data;
	const { updateTaskStatus, deleteTodo } = useTodos();
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(prevState => !prevState);

	return (
		<Card
			border="success"
			variant="light"
			bg={taskStatus ? "light" : "warning"}
			style={{ width: "250px", height: "250px", padding: "0" }}
		>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<span>{title}</span>
				<Form.Check
					reverse
					type="checkbox"
					checked={taskStatus}
					id="reverse-checkbox-1"
					onChange={() => updateTaskStatus(id)}
				/>
			</Card.Header>
			<Card.Body>
				<Card.Text>{describe}</Card.Text>
			</Card.Body>
			<Card.Body>
				<Card.Text className={taskStatus ? "text-success" : "text-primary"}>
					{taskStatus ? "Completed" : "In process"}
				</Card.Text>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-between">
				<Button variant="outline-primary" type="button" size="sm" onClick={toggleShow}>
					Edit
				</Button>
				<Button variant="outline-danger" type="button" size="sm" onClick={() => deleteTodo(id)}>
					Delete
				</Button>
			</Card.Footer>

			{show && <ModalForm show={show} handleClose={toggleShow} dataCard={data} />}
		</Card>
	);
};

TodoCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		describe: PropTypes.string,
		taskStatus: PropTypes.bool.isRequired,
		id: PropTypes.string.isRequired,
	}).isRequired,
};
