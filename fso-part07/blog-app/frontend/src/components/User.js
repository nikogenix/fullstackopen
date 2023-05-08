import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const User = ({ name, blogCount, userId }) => {
	return (
		<TableRow>
			<TableCell>
				<Link to={`/users/${userId}`}>{name}</Link>
			</TableCell>
			<TableCell>{blogCount}</TableCell>
		</TableRow>
	);
};

export default User;
