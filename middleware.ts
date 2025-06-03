import { clerkMiddleware ,createRouteMatcher} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    "/signin",
    "/signup",
    "/",
    "/home"
])

const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware((auth,req)=>{
      const {userId} = auth()
      const currentURL = new URL(req.url)
      const isAccessingDashBoard = currentURL.pathname === "/home"
      const isApiRequest = currentURL.pathname.startsWith("/api")

      if(userId && isPublicRoute(req) && !isAccessingDashBoard){
        return NextResponse.redirect(new URL("/home",req.url))
      }
      
      if(!userId){
        if(!isPublicRoute(req) && !isPublicApiRoute(req)){
        return NextResponse.redirect(new URL("/signin",req.url)) 
        }
        if(isApiRequest && !isPublicApiRoute(req)){
        return NextResponse.redirect(new URL("/signin",req.url))
        }
      }
      return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}