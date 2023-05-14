import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show, setError }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
		onError: (error) => {
			if (error?.graphQLErrors[0]?.message) {
				setError(error?.graphQLErrors[0]?.message);
			} else {
				console.log(error);
			}
		},
		onCompleted: () => {
			setTitle("");
			setPublished("");
			setAuthor("");
			setGenres([]);
			setGenre("");
		},
	});

	if (!show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		addBook({ variables: { title, author, published: Number(published), genres } });
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input required value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div>
					author
					<input required value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div>
					published
					<input
						required
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input value={genre} onChange={({ target }) => setGenre(target.value)} />
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;