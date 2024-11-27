import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

// Define the user object type
interface CustomUser {
  id: string;
  email: string;
  admin: boolean;
}

// Extend the JWT type to include custom properties
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    admin: boolean;
    token: string; // Preserve API token
    exp?: number;
  }
}

// Extend the session type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      admin: boolean;
      token: string; // Include token in the session
    };
  }
}

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        try {
          const response = await fetch(
            "https://gdg-cfw.prathameshdesai679.workers.dev/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.username,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.token) {
            if (!process.env.NEXTAUTH_SECRET) {
              throw new Error("NEXTAUTH_SECRET is not defined");
            }

            const decodedToken = jwt.verify(
              data.token,
              process.env.NEXTAUTH_SECRET
            ) as CustomUser;

            return {
              id: decodedToken.id,
              email: decodedToken.email,
              admin: decodedToken.admin,
              token: data.token, // Include the token here
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

  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = (user as CustomUser).email;
        token.admin = (user as CustomUser).admin;
        token.token = (user as any).token; // Add token from authorize to JWT
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour expiry
      }
      return token;
    },

    async session({ session, token }) {
      if (!session.user) {
        session.user = {} as any;
      }
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.admin = token.admin;
      session.user.token = token.token; // Pass token to session
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin",
  },
};
