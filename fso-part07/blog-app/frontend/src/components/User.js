const User = ({ name, blogCount }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{blogCount}</td>
		</tr>
	);
};

export default User;
