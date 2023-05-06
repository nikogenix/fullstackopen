const UserView = ({ user }) => {
	if (!user) return <div>no user found</div>;
	return (
		<>
			<h3>{user.name}</h3>
			<h4>added blogs</h4>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	);
};

export default UserView;
