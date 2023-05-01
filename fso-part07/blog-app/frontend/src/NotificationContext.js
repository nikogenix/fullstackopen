import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "ADD": {
			const message = action.payload.message;
			const type = action.payload.type;
			return { message, type };
		}
		case "REMOVE": {
			return { message: null, type: null };
		}
		default: {
			return state;
		}
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, type: null });

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
