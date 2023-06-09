import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS, USER_INFO, FILTERED_BOOKS, BOOK_ADDED } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
	const [token, setToken] = useState(
		localStorage.getItem("library-user-token") ? localStorage.getItem("library-user-token") : null
	);
	const [page, setPage] = useState("authors");
	const [errorMessage, setErrorMessage] = useState(null);
	const [message, setMessage] = useState(null);

	const authors = useQuery(ALL_AUTHORS);
	const [genre, setGenre] = useState("all");
	const books = useQuery(FILTERED_BOOKS, { variables: { genre: genre === "all" ? null : genre } });
	const user = useQuery(USER_INFO);
	const client = useApolloClient();

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};
	const success = (message) => {
		setMessage(message);
		setTimeout(() => {
			setMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const addedBook = data.data.bookAdded;
			success(`new book added: ${addedBook.title}`);

			if (addedBook.genre === genre) {
				client.cache.updateQuery({ query: FILTERED_BOOKS, variables: { genre } }, (data) => {
					if (data) {
						return {
							...data,
							allBooks: data.allBooks.concat(addedBook),
						};
					}
					return data;
				});
			}

			if (genre !== user.data.me.favoriteGenre && addedBook.genre === user.data.me.favoriteGenre) {
				client.cache.updateQuery(
					{ query: FILTERED_BOOKS, variables: { genre: user.data.me.favoriteGenre } },
					(data) => {
						if (data) {
							return {
								...data,
								allBooks: data.allBooks.concat(addedBook),
							};
						}
						return data;
					}
				);
			}
		},
	});

	if (!token) {
		return (
			<div>
				<div>
					<button onClick={() => setPage("authors")}>authors</button>
					<button onClick={() => setPage("books")}>books</button>
					<button onClick={() => setPage("login")}>login</button>
				</div>

				<Notification errorMessage={errorMessage} message={message} />

				<Authors show={page === "authors"} authors={authors} />

				<Books show={page === "books"} books={books} genre={genre} setGenre={setGenre} />

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

			<Notification errorMessage={errorMessage} message={message} />

			<Authors show={page === "authors"} authors={authors} />

			<Books show={page === "books"} books={books} genre={genre} setGenre={setGenre} />

			<Recommended show={page === "recommended"} user={user} />

			<NewBook show={page === "add"} setError={notify} user={user} selectedGenre={genre} />
		</div>
	);
};

export default App;
