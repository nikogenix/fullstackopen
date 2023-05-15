import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_BOOK, ALL_AUTHORS, FILTERED_BOOKS } from "../queries";

const NewBook = ({ show, setError, user, selectedGenre }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: ALL_AUTHORS }],
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
		update: (cache, response) => {
			cache.updateQuery({ query: FILTERED_BOOKS, variables: { genre: selectedGenre } }, (data) => {
				if (data) {
					return {
						...data,
						allBooks: data.allBooks.concat(response.data.addBook),
					};
				}
				return data;
			});

			if (selectedGenre !== user.data.me.favoriteGenre) {
				cache.updateQuery(
					{ query: FILTERED_BOOKS, variables: { genre: user.data.me.favoriteGenre } },
					(data) => {
						if (data) {
							return {
								...data,
								allBooks: data.allBooks.concat(response.data.addBook),
							};
						}
						return data;
					}
				);
			}
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
