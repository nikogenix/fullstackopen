import { useState, useImperativeHandle, forwardRef } from "react";

import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={{ ...showWhenVisible, position: "relative" }}>
				<div style={{ display: "inline-block" }}>{props.children}</div>
				<Button
					style={{ position: "absolute", left: 100, top: 267 }}
					variant="secondary"
					onClick={toggleVisibility}
				>
					cancel
				</Button>
			</div>
		</div>
	);
});

Togglable.displayName = "Togglable";

export default Togglable;
