import { GraphQLServer } from 'graphql-yoga';

// TypeDefs
const typeDefs = `
    type Query {
        hello: String!
    }

`

// Resolvers
const resolvers = {
    Query: {
        hello: () => '4fr0c0d3'
    }
}

// Server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log(`👽 Server running 👽`);
});