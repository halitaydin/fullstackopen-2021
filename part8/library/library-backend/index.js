const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");
const Author = require("./model/author");
const Book = require("./model/book");
const User = require("./model/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("🚀 connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//mongoose.set('debug', true);

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && !args.genres) {
        const authors = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: { $in: authors._id },
        }).populate("author");
        return books;
      }

      if (args.author && args.genres) {
        const authors = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: { $in: authors._id },
        }).populate("author");
        const filteredBook = books.filter((book) =>
          book.genres[0].includes(args.genres)
        );
        return filteredBook;
      }

      if (!args.author && args.genres) {
        // this is just finds the exact matching result / not useful for other scenerious

        // const books = await Book.find({ genres: { $elemMatch :  { $in: args.genres } }}).populate("author");
        // console.log(books);
        // console.log(args.genres);
        // return books

        // this is filtering all genres but still not completely good for filtering
        const books = await Book.find({}).populate("author");
        const filteredBook = books.filter((book) =>
          book.genres.includes(args.genres)
        );
        return filteredBook;
      }

      if (!args.author && !args.genres) {
        const books = await Book.find({}).populate("author");
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
        let book = new Book({ ...args, author });
        try {
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book;
      }

      let book = new Book({ ...args, author });
      try {
        await book.save();
        const bookCount = await Book.find({
          author: author._id,
        }).countDocuments()

        await Author.findOneAndUpdate(
          { name: args.author },
          { bookCount: bookCount }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!author) {
        return null;
      }
      author.born = args.born;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
});
