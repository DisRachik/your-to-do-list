import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Button, Modal, Form, Overlay, Tooltip } from "react-bootstrap";
import { createPortal } from "react-dom";
import * as Yup from "yup";
import { useTodos } from "../redux/todos/useTodos";

const modalRoot = document.querySelector("#modal-root");

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Task name is required"),
	describe: Yup.string(),
	taskStatus: Yup.bool(),
});

export const ModalForm = ({ show, handleClose, dataCard }) => {
	const [title, setTitle] = useState(dataCard ? dataCard.title : "");
	const [describe, setDescribe] = useState(dataCard ? dataCard.describe : "");
	const [taskStatus, setTaskStatus] = useState(dataCard ? dataCard.taskStatus : false);
	const [error, setError] = useState(null);
	const inputRef = useRef();
	const { addNewTodo, updateTodo } = useTodos();

	const onSubmit = async e => {
		e.preventDefault();

		try {
			await validationSchema.validate({ title, describe });

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
			setError(null);
			handleClose();
		} catch (error) {
			setError(error.message);
		}
	};
	return createPortal(
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton bg="warning" style={{ backgroundColor: "#b7e4c7" }}>
				<Modal.Title>Create new task</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: "#b7e4c7" }}>
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
							ref={inputRef}
						/>
					</Form.Group>
					{error && (
						<Overlay show={true} target={inputRef.current} placement="top">
							{props => (
								<Tooltip id="overlay-error" {...props}>
									{error}
								</Tooltip>
							)}
						</Overlay>
					)}
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
					<Modal.Footer>
						<Button variant="primary" type="submit" style={{ width: "100%" }}>
							Save Changes
						</Button>
					</Modal.Footer>
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
