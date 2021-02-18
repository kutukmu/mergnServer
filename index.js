const {ApolloServer, PubSub} = require('apollo-server')
const mongoose  = require('mongoose')
const {MONGODB}  = require('./config.js')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')


const pubsub = new PubSub()


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req, pubsub})
})
const PORT = process.env.port || 5000
mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    return server.listen({port:PORT})
}).then(res =>{
    console.log(`Server runnig at ${res.url}`)
}).catch(err =>{
    console.log(err)
})

