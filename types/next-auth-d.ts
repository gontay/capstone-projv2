import { UserRole,Coach } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth"

export type ExtendedUser =  DefaultSession["user"] & {
    role: UserRole
    isOAuth: boolean;
    coach: Coach;
    bio: string | null;
};

declare module "next-auth"{
    interface Session {
      user: ExtendedUser;
    }
}