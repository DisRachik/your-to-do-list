import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { useTodos } from "../redux/useTodos";

export const ModalForm = ({ show, handleClose }) => {
	const { addNewTodo } = useTodos();
	const onSubmit = e => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const newTodo = {
			title: formData.get("title").trim(),
			describe: formData.get("describe").trim(),
			taskStatus: formData.get("taskStatus") === "on",
		};

		addNewTodo(newTodo);
	};
	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title bg="light-bg-subtle">Create new task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Task name</Form.Label>
						<Form.Control name="title" type="text" placeholder="title for new todo" autoFocus />
					</Form.Group>
					<Form.Group className="mb-3" controlId="describe">
						<Form.Label>Describe task</Form.Label>
						<Form.Control name="describe" as="textarea" rows={3} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="taskStatus">
						<Form.Check name="taskStatus" type="switch" id="custom-switch" label="The status of task execution" />
					</Form.Group>
					<Button variant="secondary" onClick={handleClose}>
						Clear
					</Button>
					<Button variant="primary" type="submit">
						Save Changes
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

ModalForm.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};
