
const postResolver = require('./post.js')
const usersResolver = require('./user.js')
const commentsResolver = require('./comments.js')

const resolvers = {
    Post:{
        likeCount:(parent) =>{
            return parent.likes.length
        },
        commentCount: (parent) => parent.comments.length
    },
    Query:{
        ...postResolver.Query
    },
    Mutation:{
        ...usersResolver.Mutation,
        ...postResolver.Mutation,
        ...commentsResolver.Mutation
    },
    Subscription:{
        ...postResolver.Subscription
    }
}


module.exports = resolvers




