import { useState } from "react";

export const useField = (name) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		name,
		value,
		onChange,
	};
};

export const useReset = (...args) => {
	const fields = [...args];
	const event = { target: { value: "" } };
	const reset = () => fields.forEach((field) => field.onChange(event));
	return { reset };
};
