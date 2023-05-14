const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Book = require("./models/Book");
const Author = require("./models/Author");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

const typeDefs = `
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        authorCount: Int!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) return Book.find({});
			else if (args.author && !args.genre) {
				const author = await Author.findOne({ name: args.author });
				const books = await Book.find({ author: author._id });
				return books;
			} else if (!args.author && args.genre) {
				const books = await Book.find({ genres: args.genre });
				return books;
			} else if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author });
				const books = await Book.find({ author: author._id, genres: args.genre });
				return books;
			}
		},
		authorCount: async () => Author.collection.countDocuments(),
		allAuthors: async () => Author.find({}),
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author._id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const author = await Author.findOne({ name: args.author });
			if (author) {
				const book = new Book({ ...args, author: author._id });
				try {
					await book.save();
				} catch (error) {
					throw new GraphQLError("Book title must be at least 5 characters long", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.name,
							error,
						},
					});
				}
				return book;
			} else {
				const newAuthor = new Author({ name: args.author });
				try {
					await newAuthor.save();
				} catch (error) {
					throw new GraphQLError("Author name must be at least 4 characters long", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.author,
							error,
						},
					});
				}

				const book = new Book({ ...args, author: newAuthor._id });
				try {
					await book.save();
				} catch (error) {
					throw new GraphQLError("Book title must be at least 5 characters long", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.name,
							error,
						},
					});
				}
				return book;
			}
		},
		editAuthor: async (root, args) => {
			const updatedAuthor = await Author.findOneAndUpdate(
				{ name: args.name },
				{ born: args.setBornTo },
				{ new: true }
			);
			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
