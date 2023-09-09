// Without a defined matcher, this one line applies next-auth 
// to the entire project
// export { default } from "next-auth/middleware"

// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/staff/settings")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/staff")
            && request.nextauth.token?.role !== "admin"
            && request.nextauth.token?.role !== "manager") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
    },
    {
      // if the following function returns true 
      // the above middleware will execute
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)


// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/staff"] }