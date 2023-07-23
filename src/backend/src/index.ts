import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import pkg from 'body-parser';
import cors from 'cors';
import {makeExecutableSchema} from "@graphql-tools/schema";

const { json } = pkg;



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const app = express();
const httpServer = http.createServer(app);


const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.



# This "Book" type defines the queryable fields for every book in our data source.
type Book {
    title: String
    author: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    books: [Book]
}
`
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

const schema = makeExecutableSchema(
    {
        typeDefs,
        resolvers
    }
)

// interface MyContext {
//     token?: String;
// }



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] as any,
});

// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);
await new Promise<void>((resolve) => httpServer.listen({ port: 4000}, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);