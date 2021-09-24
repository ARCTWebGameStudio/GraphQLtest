let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

const allUsers = [
    {
        id: '1',
        username: 'Gunplank',
        age: '22',
        post: 'JBP'
    },
    {
        id: '2',
        username: 'Brand',
        age: '24',
        post: 'ANS'
    },
    {
        id: '3',
        username: 'Warwick',
        age: '21',
        post: 'KLP'
    },
]

let schema = buildSchema(`
  type User {
        id: ID!
        username: String!
        age: Int
        posts: [Post]
},

    type Post {
        id: ID
        title: String
        content: String
},
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
},

    input PostInput {
        id: ID
        title: String!
        content: String!
},

    type Query{
        getAllUsers: [User]
        getUser(id: ID): User
 },
    
    type Mutation {
        createUser(input: UserInput): User
 }
`);

const createUser = (input) => {
    const id = Date.now()
    return { id, ...input}
}

let root = {
    getAllUsers: () => {
        return allUsers;
    },
    getUser: params => {
        return allUsers.find(
            ({ id }) => params.id === id
        )
    },

    createUser: ({ input }) => {
        const user = createUser(input)
        allUsers.push(user)
        return user
    },


    addUser: params => {
        allUsers.push(
            {
                id: allUsers.length + 1,
                username: params.username,
                age: params.age,
                post: params.post
            }
        )

        return true;
    }

};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));