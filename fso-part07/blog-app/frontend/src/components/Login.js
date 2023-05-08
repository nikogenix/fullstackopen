import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const LoginForm = ({ login }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		await login(username, password);
		navigate("/blogs");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<FloatingLabel className="mb-3" label="username" controlId="username">
					<Form.Control
						type="username"
						placeholder="username"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</FloatingLabel>
			</Form.Group>
			<Form.Group>
				<FloatingLabel className="mb-3" label="password" controlId="password">
					<Form.Control
						type="password"
						placeholder="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</FloatingLabel>
			</Form.Group>
			<Button id="login-button" type="submit">
				login
			</Button>
		</Form>
	);
};

export default LoginForm;
