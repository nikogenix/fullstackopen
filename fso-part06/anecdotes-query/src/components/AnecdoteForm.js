import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes");
			queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
			notificationDispatch({ type: "SET", payload: `successfully added "${newAnecdote.content}"` });
			setTimeout(() => {
				notificationDispatch({ type: "REMOVE" });
			}, 5000);
		},
		onError: () => {
			notificationDispatch({
				type: "SET",
				payload: `submission failed. anecdote must be 5 characters long or more`,
			});
			setTimeout(() => {
				notificationDispatch({ type: "REMOVE" });
			}, 5000);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
