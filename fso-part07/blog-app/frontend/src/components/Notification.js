import Alert from "react-bootstrap/Alert";

const Notification = ({ info }) => {
	if (!info.message) {
		return;
	}

	const type = info.type === "error" ? "warning" : "success";

	return (
		<Alert key={type} variant={type}>
			{info.message}
		</Alert>
	);
};

export default Notification;
