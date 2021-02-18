const gql = require('graphql-tag');
const typeDefs = gql`


input RegisterInput{
    username: String!
    password:String!
    confirmPassword: String!
    email:String!
}

type User{
    id:ID!
    email:String!
    token:String!
    username:String!
    createdAt: String!
}
type Comment{
    id:ID!
    body:String!
    createdAt:String!
    username:String!
}
type Like{
    id:ID!
    createdAt:String!
    username:String!
}


type Post{
    id:ID!
    body:String!
    createdAt:String!
    username:String!
    comments:[Comment]!
    likes:[Like]!
    likeCount: Int!
    commentCount:Int!
}
type Query{
    getAllPosts: [Post]
    getPost(postId:ID!):Post
}

type Mutation{
    register(registerInput: RegisterInput):User!,
    login(username:String!, password:String!):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:String!, body:String!):Post!
    deleteComment(postId:ID!, commentId:ID!):Post!
    likePost(postId:ID!):Post!

}

type Subscription{
    newPost:Post!
}

`

module.exports = typeDefs