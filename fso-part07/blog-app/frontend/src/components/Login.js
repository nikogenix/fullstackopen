import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
		<form onSubmit={handleSubmit}>
			<div>
				<TextField label="username" value={username} onChange={({ target }) => setUsername(target.value)} />
			</div>
			<div>
				<TextField
					label="password"
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<Button id="login-button" type="submit">
				login
			</Button>
		</form>
	);
};

export default LoginForm;
