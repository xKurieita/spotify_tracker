import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req: NextRequest) => {
    //Tken will exsitst if already logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //Allow request if the following is true
    // it is request for the next-auth session & provider fetching
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //Redirect to login page if token does not exist and are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.rewrite(new URL('/login', req.url))
    }
 

}

export const config = {
    matcher: "/",
  };