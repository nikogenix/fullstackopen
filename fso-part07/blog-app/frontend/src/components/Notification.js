import { Alert } from "@mui/material";

const Notification = ({ info }) => {
	if (!info.message) {
		return;
	}

	const severity = info.type === "error" ? "warning" : "success";

	return <Alert severity={severity}>{info.message}</Alert>;
};

export default Notification;
