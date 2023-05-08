import LoginForm from "../components/Login";

const LoginView = ({ login }) => {
	return (
		<div>
			<h4 style={{ marginTop: 10 }}>log in to application</h4>
			<LoginForm login={login} />
		</div>
	);
};

export default LoginView;
