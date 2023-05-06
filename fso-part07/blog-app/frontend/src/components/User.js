import { Link } from "react-router-dom";

const User = ({ name, blogCount, userId }) => {
	return (
		<tr>
			<td>
				<Link to={`/users/${userId}`}>{name}</Link>
			</td>
			<td>{blogCount}</td>
		</tr>
	);
};

export default User;
