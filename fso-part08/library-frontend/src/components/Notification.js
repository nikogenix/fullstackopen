const Notification = ({ errorMessage, message }) => {
	if (!errorMessage && !message) return null;

	if (errorMessage) return <div style={{ color: "red" }}>{errorMessage}</div>;
	if (message) return <div style={{ color: "green" }}>{message}</div>;
};

export default Notification;
