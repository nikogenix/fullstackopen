import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
	switch (action.type) {
		case "SET": {
			const token = action.payload.token;
			const username = action.payload.username;
			const name = action.payload.name;
			return { token, username, name };
		}
		case "REMOVE": {
			return null;
		}
		default: {
			return state;
		}
	}
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
	const [user, userDispatch] = useReducer(userReducer, null);

	return <UserContext.Provider value={[user, userDispatch]}>{props.children}</UserContext.Provider>;
};

export default UserContext;
