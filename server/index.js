const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });
const schema = buildSchema(schemaString);


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



const root = {


    getAllUsers: () => {
        return allUsers;
        },


    getUser: params => {
        return allUsers.find(
            ({ id }) => params.id === id
        )
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




const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: true

}))


app.listen(5000, () => console.log('Server started on port 5000'))