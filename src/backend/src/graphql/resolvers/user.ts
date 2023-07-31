import { prisma } from "../../../db";
import user from "@/graphql/typeDefs/user";
import User from "@/graphql/typeDefs/user";

export const userResolvers = {
  Query: {
    users: (_parent, _args, _context) => {
      return prisma.user.findMany({});
    },

    // user: () => {
    //     return prisma.user.findUnique(
    //         {
    //             where: {
    //                 id: _args.id,
    //             }
    //         }
    //     )
    // }
  },
  Mutation: {
    createUser:
     (_parent: User, _args: {
        data: {
          CreateUserInput
        }
        }, _context, _info) => {

        return prisma.user.create({
          data: {
            name: _args.data.CreateUserInput.name,
            username: _args.data.CreateUserInput.username,
            email: _args.data.CreateUserInput.email,
            emailVerified: _args.data.CreateUserInput.emailVerified,
            password: _args.data.CreateUserInput.password,
            image: _args.data.CreateUserInput.image,
            createdAt: new Date(),
          },
        });
      },
    },
    // createUsername: () => {},

};

// const typeDefs = `#graphql
// # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//
//
//
// # This "Book" type defines the queryable fields for every book in our data source.
// type Book {
//     title: String
//     author: String
// }
//
// # The "Query" type is special: it lists all of the available queries that
// # clients can execute, along with the return type for each. In this
// # case, the "books" query returns an array of zero or more Books (defined above).
// type Query {
//     books: [Book]
// }
// `
// const books = [
//     {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
// ];
// // Resolvers define how to fetch the types defined in your schema.
// // This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };
export default userResolvers;
