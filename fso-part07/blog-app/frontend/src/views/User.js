import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const UserView = ({ user }) => {
	if (!user) return <div>no user found</div>;
	return (
		<Card>
			<Card.Body>
				<Card.Title>{user.name}</Card.Title>
			</Card.Body>

			<Card.Body>
				<Card.Subtitle>added blogs</Card.Subtitle>
			</Card.Body>
			<ListGroup className="list-group-flush">
				{user.blogs.map((blog) => (
					<ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
				))}
			</ListGroup>
		</Card>
	);
};

export default UserView;
