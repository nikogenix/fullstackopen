import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const addPerson = (e) => {
		e.preventDefault();
		if (persons.filter((person) => person.name === newName).length)
			alert(`Phonebook already contains '${newName}'`);
		else if (persons.filter((person) => person.name === newNumber).length) {
			alert(`Phonebook already contains '${newNumber}'`);
		} else {
			const personObj = { name: newName, number: newNumber };
			setPersons(persons.concat(personObj));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<h2>Add someone new</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Search by name</h2>
			<div>
				<input value={filter} onChange={handleFilterChange} />
			</div>
			<h2>Numbers</h2>
			<ul>
				{persons
					.filter((person) => filter === "" || person.name.toLowerCase().includes(filter.toLowerCase()))
					.map((person) => (
						<li key={person.name}>
							{person.name}: {person.number}
						</li>
					))}
			</ul>
		</div>
	);
};

export default App;
