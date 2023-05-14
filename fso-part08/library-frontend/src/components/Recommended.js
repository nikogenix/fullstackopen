const Recommended = ({ show, books, user }) => {
	const genre = user.data.me.favoriteGenre;
	if (!show) {
		return null;
	}

	if (books.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>recommended</h2>

			<table>
				<tbody>
					<tr>
						<th>based on your favourite genre: {genre}</th>
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

export default Recommended;
