const User = require('../../models/User.js')
const bcrypt  = require('bcryptjs')
const {UserInputError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const {SECRETE_KEY} = require('../../config')
const {userRegisterValidate, userLoginValidate} = require('../../utils/validatetors')


const generateToken = (user) =>{
    const token = jwt.sign({
        id:user._id,
        email:user.email,
        username:user.username
    }, SECRETE_KEY, {expiresIn: '1h'})

    return token
}

const resolver = { 
    Query:{},
    Mutation:{

        async login(_, {username, password}, context, info){
            const {errors, valid} = userLoginValidate(username, password)
            const user = await User.findOne({username})

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }

            const match = await bcrypt.compare(password,user.password)

            if(!match){
                errors.general = 'Wrong Credentials'
                throw new UserInputError('Wrong Credentials', {errors})
            }



            const token = generateToken(user)

            return {
                ...user._doc,
                id:user._id,
                token
            }



        },
        async register(_, {registerInput:{username, email, password, confirmPassword}}, context, info){
            // TODO validate user data
            // Make sure user doenst already exist
            // hashPassword and create auth token

            const {valid, errors} = userRegisterValidate(username, email, password, confirmPassword)

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            const user = await User.findOne({username})

            if (user){
                throw new UserInputError('Username is taken',{
                    errors:{
                        username:'This username is taken'
                    }
                })
            }


            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = generateToken(res)
            

            return {
                ...res._doc,
                id:res._id,
                token
            }

        }
    }
}

module.exports = resolver