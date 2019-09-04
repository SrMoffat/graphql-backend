import { GraphQLServer } from 'graphql-yoga';

const users = [
    {
        id: 1234,
        username: 'Afro',
        email: '4fr0@mail.com',
        age: 20,
        posts: []
    },
    {
        id: 56789,
        username: 'Code',
        email: 'c0d3@mail.com',
        age: 22,
        posts: []
    },
    {
        id: 98765,
        username: 'Yes',
        email: '!@mail.com',
        age: 24,
        posts: []
    } 
]

const posts = [
    {
        id: 1234,
        title: 'Afro',
        body: 'afr0@mail.com',
        published: true,
        author: 1234
    },
    {
        id: 56789,
        title: 'Code',
        body: 'coddd@mail.com',
        published: true,
        author: 56789
    },
    {
        id: 98765,
        title: 'Yes',
        body: 'coddd@mail.com',
        published: true,
        author: 98765
    } 
]

const comments = [
    {
        id: 1,
        text: 'This is comment 1',
        author: 56789,
        post: 1234
    },
    {
        id: 2,
        text: 'This is comment 2',
        author: 98765,
        post: 56789
    },
    {
        id: 3,
        text: 'This is comment 3',
        author: 1234,
        post: 98765
    } 
]

// TypeDefs
const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
        post: Post!
        posts(query: String): [Post!]!
        greeting(name: String): String!
        add(numbers: [Int!]!): Int!
        comments: [Comment!]!
    }

<<<<<<< HEAD
    type Mutation {
        createUser(username: String!, email: String!, age: Int): User!
    }

=======
>>>>>>> d47ee9e6bc0f212211b388699f7a8c779bf74a80
    type User {
        id: ID!
        username: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

`

// Resolvers
const resolvers = {
    Query: {
        me: () => ({
            id: 1234,
            username: '4fr0c0d3',
            email: '4fr0c0d3@mail.com',
            age: 400
        }),
        users: (root, { query }, ctx, info) => {
            if(query){
                return users.filter((user) => {
                    return user.username.toLowerCase().includes(query.toLowerCase())
                })
            }
            return users;
        },
        post: () => ({
            id: 54321,
            title: '4fr0c0d3 is 0n',
            body: '4fr0c0d3 i5 4n 4m4z1ng th1ng',
            published: true
        }),
        posts: (root, { query }, ctx, info) => {
            if(query){
                return posts.filter((post) => {
                    return post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase());
                })

            }
            return posts;
        },
        greeting: (root, {name}, ctx, info) => `Hi, ${name}`,
        add: (root, { numbers }, ctx, info) => numbers.reduce((acc, cur) => { return acc + cur }),
        comments: () => {return comments}
        
    },
    Mutation: {
        createUser(root, { username, email: mail, age }, ctx, info){
          const emailExists = users.some(({ email}) => (email === mail));

          if(emailExists){
              throw new Error('Email Exists!');
          }

          const user = {
              id: Math.floor(Math.random() * 10),
              username,
              email: mail,
              age
          }
          users.push(user);
          return user;
        }
    },
    Post: {
        author({ author }, args, ctx, info){
            return users.find(({ id }) => {
                return id === author;
            });
        },
        comments({ id }, args, ctx, info){
            return comments.filter(({ post }) => {
                return id === post;
            });
        }
    },
    User: {
        posts({ id }, args, ctx, info){
            return posts.filter(({ author }) => {
                return author === id;
            });
        },
        comments({ id }, args, ctx, info){
            return comments.filter(({ author }) => {
                return author === id;
            })
        }
    },
    Comment: {
        author({ author }, args, ctx, info){
            return users.find(({ id }) => {
                return id === author;
            });
        },
        post({ post }, args, ctx, info){
            return posts.find(({ id }) => {
                return id === post;
            });
        }
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