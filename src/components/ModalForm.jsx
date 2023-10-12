import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { createPortal } from "react-dom";
import { useTodos } from "../redux/todos/useTodos";
import { useState } from "react";

const modalRoot = document.querySelector("#modal-root");

export const ModalForm = ({ show, handleClose, dataCard }) => {
	const [title, setTitle] = useState(dataCard ? dataCard.title : "");
	const [describe, setDescribe] = useState(dataCard ? dataCard.describe : "");
	const [taskStatus, setTaskStatus] = useState(dataCard ? dataCard.taskStatus : false);
	const { addNewTodo, updateTodo } = useTodos();

	const onSubmit = e => {
		e.preventDefault();

		const newTodo = {
			title: title.trim(),
			describe: describe.trim(),
			taskStatus,
		};

		if (dataCard) {
			updateTodo({ ...newTodo, id: dataCard.id });
		} else {
			addNewTodo(newTodo);
		}
		handleClose();
	};
	return createPortal(
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title bg="light-bg-subtle">Create new task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Task name</Form.Label>
						<Form.Control
							name="title"
							type="text"
							placeholder="title for new todo"
							value={title}
							onChange={e => setTitle(e.target.value)}
							autoFocus
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="describe">
						<Form.Label>Describe task</Form.Label>
						<Form.Control
							name="describe"
							as="textarea"
							rows={3}
							value={describe}
							onChange={e => setDescribe(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="taskStatus">
						<Form.Check
							checked={taskStatus}
							name="taskStatus"
							type="switch"
							id="custom-switch"
							label="The status of task execution"
							onChange={e => setTaskStatus(e.target.checked)}
						/>
					</Form.Group>
					<Button variant="secondary" onClick={handleClose}>
						Clear
					</Button>
					<Button variant="primary" type="submit">
						Save Changes
					</Button>
				</Form>
			</Modal.Body>
		</Modal>,
		modalRoot,
	);
};

ModalForm.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	dataCard: PropTypes.shape({
		title: PropTypes.string.isRequired,
		describe: PropTypes.string,
		taskStatus: PropTypes.bool.isRequired,
		id: PropTypes.string.isRequired,
	}),
};
