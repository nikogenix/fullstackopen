import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from "../queries";
import { useEffect, useState } from "react";
import Select from "react-select";

const Authors = ({ show, authors }) => {
	const [born, setBorn] = useState("");
	const [selectedOption, setSelectedOption] = useState(null);

	const [options, setOptions] = useState([]);

	useEffect(() => {
		const newOptions = authors.loading
			? []
			: authors.data.allAuthors.map((author) => ({
					value: author.name,
					label: author.name,
			  }));
		setOptions(newOptions);
	}, [authors]);

	const [changeBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			console.log(error);
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		await changeBirth({ variables: { name: selectedOption.value, setBornTo: Number(born) } });

		setSelectedOption(null);
		setBorn("");
	};

	if (!show) {
		return null;
	}

	if (authors.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>set birth year</h2>

			<form onSubmit={submit}>
				<div>
					<Select
						value={selectedOption}
						onChange={setSelectedOption}
						options={options}
						placeholder={"select the author"}
					/>
				</div>

				<div>
					<input
						value={born}
						type="number"
						placeholder="year"
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">change year</button>
			</form>
		</div>
	);
};

export default Authors;
