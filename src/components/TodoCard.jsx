import PropTypes from "prop-types";
import { Button, Card, Form } from "react-bootstrap";
import { useTodos } from "../redux/useTodos";

export const TodoCard = ({ data }) => {
	const { title, describe, taskStatus, id } = data;
	const { updateTaskStatus } = useTodos();

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
				<Button variant="outline-secondary" size="sm">
					Edit
				</Button>
				<Button variant="outline-danger" size="sm">
					Delete
				</Button>
			</Card.Footer>
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
