const Notification = (message) => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};
	return <div style={style}>{message}</div>;
};

export default Notification;
