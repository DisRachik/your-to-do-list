import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useTodos } from "../redux/todos/useTodos";

export const FilterGroup = () => {
	const { filter, filterTodos } = useTodos();
	const radios = [
		{ name: "All", value: "", variant: "outline-primary" },
		{ name: "Completed", value: "true", variant: "outline-success" },
		{ name: "Do it", value: "false", variant: "outline-danger" },
	];

	return (
		<ButtonGroup size="sm">
			{radios.map((radio, idx) => (
				<ToggleButton
					key={idx}
					id={`radio-${idx}`}
					type="radio"
					variant={radio.variant}
					name="radio"
					value={radio.value}
					checked={filter === radio.value}
					onChange={e => filterTodos(e.currentTarget.value)}
				>
					{radio.name}
				</ToggleButton>
			))}
		</ButtonGroup>
	);
};
