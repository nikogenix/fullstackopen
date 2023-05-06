import LoginForm from "../components/Login";

const LoginView = ({ login }) => {
	return (
		<div>
			<h2>log in to application</h2>
			<LoginForm login={login} />
		</div>
	);
};

export default LoginView;
