const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) return Book.find({}).populate("author");
			else if (args.author && !args.genre) {
				const author = await Author.findOne({ name: args.author });
				const books = await Book.find({ author: author._id }).populate("author");
				return books;
			} else if (!args.author && args.genre) {
				const books = await Book.find({ genres: args.genre }).populate("author");
				return books;
			} else if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author });
				const books = await Book.find({ author: author._id, genres: args.genre }).populate("author");
				return books;
			}
		},
		authorCount: async () => Author.collection.countDocuments(),
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author._id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const author = await Author.findOne({ name: args.author });
			if (author) {
				const book = new Book({ ...args, author: author._id });
				try {
					await book.save();
				} catch (error) {
					throw new GraphQLError("book title must be at least 5 characters long", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.name,
							error,
						},
					});
				}
				await book.populate("author");
				pubsub.publish("BOOK_ADDED", { bookAdded: book });
				return book;
			} else {
				const newAuthor = new Author({ name: args.author });
				try {
					await newAuthor.save();
				} catch (error) {
					throw new GraphQLError("author name must be at least 4 characters long", {
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
					throw new GraphQLError("book title must be at least 5 characters long", {
						extensions: {
							code: "BAD_USER_INPUT",
							invalidArgs: args.name,
							error,
						},
					});
				}
				await book.populate("author");
				pubsub.publish("BOOK_ADDED", { bookAdded: book });
				return book;
			}
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new GraphQLError("not authenticated", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const updatedAuthor = await Author.findOneAndUpdate(
				{ name: args.name },
				{ born: args.setBornTo },
				{ new: true }
			);
			return updatedAuthor;
		},
		createUser: async (root, args) => {
			const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

			return user.save().catch((error) => {
				throw new GraphQLError("creating the user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new GraphQLError("wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
};

module.exports = resolvers;
