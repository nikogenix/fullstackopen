import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS, ALL_BOOKS, USER_INFO } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
	const [token, setToken] = useState(null);
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);

	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);
	const user = useQuery(USER_INFO);
	const client = useApolloClient();

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	if (!token) {
		return (
			<div>
				<div>
					<button onClick={() => setPage("authors")}>authors</button>
					<button onClick={() => setPage("books")}>books</button>
					<button onClick={() => setPage("login")}>login</button>
				</div>

				<Notification errorMessage={errorMessage} />

				<Authors show={page === "authors"} authors={authors} />

				<Books show={page === "books"} books={books} />

				<NewBook show={page === "add"} setError={notify} />

				<LoginForm show={page === "login"} setToken={setToken} setError={notify} setPage={setPage} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("recommended")}>recommended</button>
				<button onClick={() => setPage("add")}>add book</button>
				<button onClick={logout}>logout</button>
			</div>

			<Notification errorMessage={errorMessage} />

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} />

			<Recommended show={page === "recommended"} books={books} user={user} />

			<NewBook show={page === "add"} setError={notify} />
		</div>
	);
};

export default App;
