
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_COACH_REDIRECT,
    authRoutes,
    apiAuthPrefix,
    publicRoutes,
    coachRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isCoachRoute = !!coachRoutes.includes(nextUrl.pathname);
    const isPublicCoachRoute =  nextUrl.pathname.includes("coach/");

    if(isPublicCoachRoute && !isCoachRoute){
        return null
    }

    if (isApiAuthRoute){
        return null;
    }

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    //console.log(nextUrl.pathname)
    return null;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",]
  };