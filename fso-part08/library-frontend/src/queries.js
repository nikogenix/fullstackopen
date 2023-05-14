import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

export const USER_INFO = gql`
	query {
		me {
			favoriteGenre
			id
			username
		}
	}
`;

export const ADD_BOOK = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			title
			author {
				name
			}
			published
		}
	}
`;

export const EDIT_AUTHOR_BIRTH = gql`
	mutation editBirth($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			bookCount
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
