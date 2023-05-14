import { useEffect, useState } from "react";

const Books = ({ show, books }) => {
	const [genre, setGenre] = useState("all");
	let [genres, setGenres] = useState(["all"]);

	useEffect(() => {
		const newGenres = ["all"];

		if (!books.loading && books.data.allBooks) {
			books.data.allBooks.forEach((b) => {
				b.genres.forEach((g) => {
					if (!newGenres.includes(g)) newGenres.push(g);
				});
			});
		}
		setGenres([...newGenres]);
	}, [books]);

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
							<select name="genres" id="genres" onChange={(e) => setGenre(e.target.value)}>
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
					{books.data.allBooks
						.filter((b) => (genre === "all" ? b : b.genres.includes(genre)))
						.map((b) => (
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
