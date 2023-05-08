import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
const UserView = ({ user }) => {
	if (!user) return <div>no user found</div>;
	return (
		<>
			<h3>{user.name}</h3>
			<h4>added blogs</h4>
			<List>
				{user.blogs.map((blog) => (
					<ListItem key={blog.id}>
						<ListItemIcon>
							<BookmarkBorderOutlinedIcon />
						</ListItemIcon>
						<ListItemText>{blog.title}</ListItemText>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default UserView;
