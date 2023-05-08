import User from "../components/User";
import Table from "react-bootstrap/Table";

const UsersView = ({ users }) => {
	if (!users) {
		return null;
	}

	return (
		<div>
			<h2 style={{ fontSize: 26 }}>users</h2>
			<Table striped hover>
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
			</Table>
		</div>
	);
};

export default UsersView;
