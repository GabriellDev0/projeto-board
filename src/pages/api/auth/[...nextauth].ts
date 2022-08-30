import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { db } from '../../../services/firebaseConnection'
import {doc, getDoc} from 'firebase/firestore'
export default NextAuth({

  providers: [
    GithubProvider({
      clientId: '9a36e08b62de0775e113',
      clientSecret: '1222ba5980d436118d0c72839dc165be04ef0097',
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