import { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { ModalForm } from "./ModalForm";
import { FilterGroup } from "./FilterGroup";

export const Header = () => {
	const [show, setShow] = useState(false);

	const toggleShow = () => setShow(prevState => !prevState);

	return (
		<>
			<Navbar variant="light" bg="warning">
				<Container fluid>
					<Navbar.Brand>ToDo</Navbar.Brand>
					<Button variant="outline-success" type="button" size="lg" onClick={toggleShow}>
						Add TASK
					</Button>
					<FilterGroup />
				</Container>
			</Navbar>
			{show && <ModalForm show={show} handleClose={toggleShow} />}
		</>
	);
};
