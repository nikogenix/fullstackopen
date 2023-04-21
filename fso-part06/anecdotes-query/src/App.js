import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, voteAnecdote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation(voteAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries("anecdotes");
		},
	});

	const handleVote = (anecdote) => {
		newAnecdoteMutation.mutate({ ...anecdote, votes: ++anecdote.votes });
	};

	const result = useQuery("anecdotes", getAnecdotes);

	if (result.isLoading) return <div>loading data...</div>;

	if (result.isError) return <div>service not available due to server issues</div>;

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
