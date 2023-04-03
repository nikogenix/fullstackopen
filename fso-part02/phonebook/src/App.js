import { useState, useEffect } from "react";
import personsService from "./services/persons";
import "./index.css";

const Filter = ({ filter, handleFilterChange }) => (
	<div>
		<input value={filter} onChange={handleFilterChange} />
	</div>
);

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
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
);

const Numbers = ({ persons, filter, handleDelete }) => (
	<ul>
		{persons
			.filter((person) => filter === "" || person.name.toLowerCase().includes(filter.toLowerCase()))
			.map((person) => (
				<Number key={person.name} person={person} handleDelete={handleDelete} />
			))}
	</ul>
);

const Number = ({ person, handleDelete }) => (
	<li>
		{person.name}: {person.number} <DeleteButton name={person.name} handleDelete={handleDelete} />
	</li>
);

const DeleteButton = ({ name, handleDelete }) => (
	<button name={name} onClick={handleDelete}>
		delete
	</button>
);

const Notification = ({ message, error }) => {
	if (message === null) {
		return null;
	}

	return <span className={error ? "error" : "notification"}>{message}</span>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState([null, false]); // notification message; error: true/false

	useEffect(() => {
		personsService.getAll().then((res) => setPersons(res.data));
	}, []);

	const addPerson = (e) => {
		e.preventDefault();
		if (persons.filter((person) => person.name === newName).length) {
			if (
				window.confirm(
					`Phonebook already contains '${newName}'. Would you like to replace the old number with a new one?`
				)
			) {
				const person = persons.find((p) => p.name === newName);
				const newPerson = { ...person, number: newNumber };
				personsService
					.editPerson(person.id, newPerson)
					.then(() => setPersons(persons.map((p) => (p.name === newName ? newPerson : p))))
					.then(() => {
						setNotification([`Modified '${newPerson.name}'`, false]);
						setTimeout(() => {
							setNotification([null, false]);
						}, 5000);
					})
					.catch((err) => {
						const status = err.response.status;
						console.log(err);
						if (status === 404) {
							personsService.getAll().then((res) => setPersons(res.data));
							setNotification([`The entry for '${newPerson.name}' has already been removed`, true]);
							setTimeout(() => {
								setNotification([null, false]);
							}, 5000);
						}
					});
			}
		} else if (persons.filter((person) => person.number === newNumber).length) {
			alert(`Phonebook already contains '${newNumber}'`);
		} else {
			const personObj = { name: newName, number: newNumber };
			personsService
				.create(personObj)
				.then((res) => {
					setPersons(persons.concat(res.data));
					setNewName("");
					setNewNumber("");
				})
				.then(() => {
					setNotification([`Added ${personObj.name}`, false]);
					setTimeout(() => {
						setNotification([null, false]);
					}, 5000);
				});
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

	const handleDelete = (e) => {
		const person = persons.find((p) => p.name === e.target.name);
		if (window.confirm(`Delete '${person.name}' from phonebook?`)) {
			personsService
				.deletePerson(person.id)
				.then(() => setPersons(persons.filter((p) => p.id !== person.id)))
				.then(() => {
					setNotification([`Deleted ${person.name}`, false]);
					setTimeout(() => {
						setNotification([null, false]);
					}, 5000);
				});
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={notification[0]} error={notification[1]} />
			<h2>Add someone new</h2>
			<Form
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Search by name</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h2>Numbers</h2>
			<Numbers persons={persons} filter={filter} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
