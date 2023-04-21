import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation(voteAnecdote, {
		onSuccess: (votedAnecdote) => {
			queryClient.setQueryData(
				"anecdotes",
				anecdotes.map((a) => (a.id === votedAnecdote.id ? votedAnecdote : a))
			);
			notificationDispatch({ type: "SET", payload: `successfully voted "${votedAnecdote.content}"` });
			setTimeout(() => {
				notificationDispatch({ type: "REMOVE" });
			}, 5000);
		},
	});

	const handleVote = (anecdote) => {
		newAnecdoteMutation.mutate({ ...anecdote, votes: ++anecdote.votes });
	};

	const result = useQuery("anecdotes", getAnecdotes, {
		refetchOnWindowFocus: false,
	});

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
