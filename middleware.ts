import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define the middleware function
export async function middleware(req: NextRequest) {
    // Extract the token using next-auth's JWT utility
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Ensure the token exists and user has admin privileges
    if (!token || !token.admin) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/'; // Redirect to the sign-in page
        return NextResponse.redirect(redirectUrl);
    }

    // Proceed to the requested page if the user is an admin
    return NextResponse.next();
}

// Apply the middleware to admin routes
export const config = {
    matcher: ['/ditgdgadmin/:path*'], 
};
