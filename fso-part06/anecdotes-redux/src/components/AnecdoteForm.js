import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const add = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = "";
		dispatch(addAnecdote(content));
	};

	// const add = (e) => {
	// 	e.preventDefault();
	// 	const content = e.target.anecdote.value;
	// 	e.target.anecdote.value = "";
	// 	dispatch({ type: "ADD", payload: content });
	// };

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={(e) => add(e)}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
