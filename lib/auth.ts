import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { auth } from '@/app/firebase/config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      
      async authorize(credentials: any) {
        if (!credentials.username || !credentials.password) {
          return null;
        }
        
        try {
          const userCredential: UserCredential = await signInWithEmailAndPassword(auth, credentials.username, credentials.password);
          const user = userCredential.user;
          
          if (user) {
            return {
              id: user.uid,
              email: user.email,
              // Add any additional user info if needed
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "google") {
        try {
          // Use Google provider to sign in with Firebase
          const googleProvider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, googleProvider);
          user.id = result.user.uid;
        } catch (error) {
          console.error("Error signing in with Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};