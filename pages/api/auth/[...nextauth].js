import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

let loginURL = `${process.env.BASE_API_URL}/User/Login`
let getToken = `${process.env.BASE_API_URL}/User/GetToken`


const providers = [
  Providers.Credentials({
    async authorize(credentials) {
      try {
        const user = await axios.all([
          axios.get(loginURL, {
            headers: { "Content-Type": "application/json", 
            accept: '*/*',
             "Access-Control-Allow-Origin": "*",
             "userName": credentials.username,
             "password": credentials.password
          }
        }),
         axios.get(getToken, 
            {
              headers: { "Content-Type": "application/json", 
              accept: '*/*',
               "Access-Control-Allow-Origin": "*",
               "userName": credentials.username,
               "password": credentials.password
            }
          })
        ]).then(axios.spread((...responses) => {
            const resOne = JSON.parse(responses[0].data.d)
            const token = responses[1].data
            let userInfo = []
            let roleInfo = ''

            resOne.forEach(e => {
              if(e.iType === 111){
                userInfo = JSON.parse(e.iInfo)
              }
              if(e.iType === 121){
                roleInfo = JSON.parse(e.iInfo)
              }
            })

            return {token, userInfo, roleInfo }
            
        }))
        if (user) {
          return user
        } else {
            return null
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }),
]


const callbacks = {
  jwt: async (token, user) => {
    if (user) {
      token.jwt = user.token
      token.accessToken = user.token
      token.role = user.roleInfo
    }
   
    return token;
  },
  session: async (session, token) => {
    session.jwt = token.accessToken;
    session.accessToken = token.accessToken
    session.role = token.role;    
    return session;
  }
}

const options = {
  providers,
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 1 * 60 * 60 
  },
  callbacks,
  pages: {
    signIn: '/',
    error: '/' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)



