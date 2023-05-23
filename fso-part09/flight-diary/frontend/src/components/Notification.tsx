const Entry = ({ message }: { message: string }) => {
	if (!message) return null;
	return <div style={{ color: "red", border: "2px solid red", padding: 5, marginBottom: 5 }}>{message} </div>;
};

export default Entry;
