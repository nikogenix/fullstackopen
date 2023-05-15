import { useEffect, useState } from "react";

const Books = ({ show, books, genre, setGenre }) => {
	let [genres, setGenres] = useState(["all"]);

	useEffect(() => {
		if (!books.loading && books.data.allBooks && genre === "all") {
			const newGenres = ["all"];
			books.data.allBooks.forEach((b) => {
				b.genres.forEach((g) => {
					if (!newGenres.includes(g)) newGenres.push(g);
				});
			});
			setGenres([...newGenres]);
		}
	}, [books]);

	const changeGenre = (e) => {
		const selectedGenre = e.target.value;
		setGenre(selectedGenre);
		books.refetch({ genre: selectedGenre === "all" ? null : selectedGenre });
	};

	if (!show) {
		return null;
	}

	if (books.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>
							<label htmlFor="genres">genre:</label>
							<select defaultValue={genre} name="genres" id="genres" onChange={changeGenre}>
								{genres.map((g) => (
									<option key={g} value={g}>
										{g}
									</option>
								))}
							</select>
						</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.data.allBooks.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
