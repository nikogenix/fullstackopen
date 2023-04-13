const Notification = ({ message, error }) => {
	if (message === null) {
		return null;
	}

	return <span className={error ? "error" : "notification"}>{message}</span>;
};

export default Notification;
