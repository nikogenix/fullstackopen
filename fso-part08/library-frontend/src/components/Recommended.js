import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { FILTERED_BOOKS } from "../queries";

const Recommended = ({ show, user }) => {
	const [getRecommendedBooks, { loading, called, data }] = useLazyQuery(FILTERED_BOOKS);

	useEffect(() => {
		if (show) {
			getRecommendedBooks({ variables: { genre: user.data.me.favoriteGenre } });
		}
	}, [show, user]);

	if (!show) {
		return null;
	}

	if (loading || !called) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>recommended</h2>

			<table>
				<tbody>
					<tr>
						<th>based on your favourite genre: {user.data.me.favoriteGenre}</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{data.allBooks.map((b) => (
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
