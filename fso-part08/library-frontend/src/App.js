import { useState } from "react";
import { useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";

import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);

	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
			</div>

			<Notification errorMessage={errorMessage} />

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} />

			<NewBook show={page === "add"} setError={notify} />
		</div>
	);
};

export default App;
