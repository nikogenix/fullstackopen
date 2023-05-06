/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
