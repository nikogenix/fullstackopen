import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes.filter((a) => a.content.includes(state.filter)));
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(addVote(id));
		dispatch(setNotification(`you voted "${anecdotes.find((c) => c.id === id).content}"`, 5));
	};

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
