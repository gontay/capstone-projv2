import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "@/data/auth/user"
import authConfig from "./auth.config"
import { Coach, UserRole } from "@prisma/client"
import { getAccountByUserId } from "./data/auth/account"
import { getCoachByUserId } from "./data/coach/coach"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
    pages:{
      signIn: "/auth/login",
      error: "/auth/error",
    },
    events: {
      async linkAccount({user}) {
        await db.user.update({
          where: {id: user.id},
          data:{emailVerified: new Date()}
        })
      }
    },
    callbacks: {
      async signIn({user, account}){
        //Allow OAuth without email verification
        if (account?.provider!== "credentials") return true;

        const existingUser = await getUserById(user.id);

        //Prevent sign in without email verification
        if(!existingUser?.emailVerified)return false;

        
        return true;
      },
      async session({ session, token }) {
        console.log({
          sessionToken : token,
          session,
        })
        if (token.sub && session.user){
          session.user.id = token.sub;
        }
        if (token.role && session.user){
          session.user.role = token.role as UserRole;
        }

        if (session.user){
          session.user.name=token.name;
          session.user.email=token.email;
          session.user.bio = token.bio;
          session.user.isOAuth= token.isOAuth as boolean;
          session.user.image = token.picture;
          if (session.user.role === UserRole.COACH){
            session.user.coach = token.coach as Coach;
          }
        }



        return session;
      },
      async jwt({ token }) {
        if(!token.sub) return token;

        const existingUser = await getUserById(token.sub);

        if(!existingUser) return token;

        const existingAccount = await getAccountByUserId(existingUser.id);
        const userCoach = await getCoachByUserId(existingUser.id)

        token.isOAuth = !!existingAccount;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.picture = existingUser.image;
        token.bio = existingUser.bio;
        
        if(existingUser.role === UserRole.COACH){
          token.coach = userCoach;
        }


        return token
      }
    },
    adapter: PrismaAdapter(db),
    session: {strategy:"jwt"},
    ...authConfig,
});