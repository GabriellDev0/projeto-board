import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { db } from '../../../services/firebaseConnection'
import {doc, getDoc} from 'firebase/firestore'
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
      const docRef = doc(db, "users", String(token.sub))
      const lastDonate = await getDoc(docRef).then((snapshot)=>{
        if(snapshot.exists()){
          return snapshot.data().lasDonate.toDate()
        }else{
          return null
        }
      })
        try{
            return{
              ...session,
              id: token.sub,
              vip: lastDonate ? true : false,
              lastDonate: lastDonate
            }
        }catch(err){
          return{
            ...session,
            id: null,
            vip: false,
            lastDonate: null
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