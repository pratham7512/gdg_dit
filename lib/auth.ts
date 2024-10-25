import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from '@/app/firebase/config'
import { 
  signInWithEmailAndPassword, 
  UserCredential
} from "firebase/auth";
import { NextAuthOptions } from "next-auth"; 

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      
      async authorize(credentials: Record<"username" | "password", string> | undefined) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        
        try {
          const userCredential: UserCredential = await signInWithEmailAndPassword(auth, credentials.username, credentials.password);
          const user = userCredential.user;
          
          if (user) {
            return {
              id: user.uid,
              email: user.email,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
