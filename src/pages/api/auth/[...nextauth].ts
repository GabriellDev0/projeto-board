import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"



export default NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      // authorization: { params:{
      //   scope: 'read:user'
      // }}
    }), 
  ],
  callbacks:{
    async session({session,token}){
        try{
            return{
              ...session,
              id: token.sub
            }
        }catch(err){
          return{
            ...session,
            id: null
          }
        }
    },
    async signIn({user, email, account, profile}){
      
        try{
            return true;
        }catch(err){
          console.log('DEU ERRO: ',err);
          return false
        }
    }
  }
})