import { TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import User from "../components/User";

const UsersView = ({ users }) => {
	if (!users) {
		return null;
	}

	return (
		<div>
			<h2>users</h2>
			<TableContainer>
				<TableHead>
					<TableRow>
						<TableCell>name</TableCell>
						<TableCell>blogs created</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<User key={user.id} userId={user.id} name={user.name} blogCount={user.blogs.length} />
					))}
				</TableBody>
			</TableContainer>
		</div>
	);
};

export default UsersView;
