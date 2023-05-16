import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
	fragment AuthorDetails on Author {
		name
		born
		bookCount
	}
`;

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
			born
		}
		published
		genres
	}
`;

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`;

export const EDIT_AUTHOR_BIRTH = gql`
	mutation editBirth($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const FILTERED_BOOKS = gql`
	query ($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
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
