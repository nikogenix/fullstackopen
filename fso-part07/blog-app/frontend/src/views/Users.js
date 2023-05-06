import User from "../components/User";

const UsersView = ({ users }) => {
	if (!users) {
		return null;
	}

	return (
		<div>
			<h2>users</h2>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<User key={user.id} userId={user.id} name={user.name} blogCount={user.blogs.length} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsersView;
