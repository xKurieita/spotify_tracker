import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import  url  from "url";

export const middleware = async (req: NextRequest) => {
    //Tken will exsitst if already logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const url = req.nextUrl.clone();

    url.pathname = '/login';
    //Allow request if the following is true
    // it is request for the next-auth session & provider fetching
    // 2) the token exists
    if (url.pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //Redirect to login page if token does not exist and are requesting a protected route
    if (!token && url.pathname !== '/login') {
        return NextResponse.redirect(url);
    }
 

}