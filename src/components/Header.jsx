import { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { ModalForm } from "./ModalForm";

export const Header = () => {
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(prevState => !prevState);

	return (
		<>
			<Navbar variant="light" bg="warning">
				<Container>
					<Navbar.Brand>ToDo</Navbar.Brand>
					<Button variant="outline-success" size="lg" onClick={toggleShow}>
						Add TASK
					</Button>
				</Container>
			</Navbar>
			<ModalForm show={show} handleClose={toggleShow} />
		</>
	);
};
