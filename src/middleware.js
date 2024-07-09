import { NextResponse } from "next/server";

export function middleware(request) {
    let token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;
    const authRoute = pathname === "/login" || pathname === "/register";
    const protectedRoute = ["/cars", "/contact", "/profile"].includes(pathname);

    // If the token is not present and is protected route, redirect to login
    if (!token && protectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If the token is present and is auth route, redirect to home
    if (token && authRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/", "/cars", "/contact", "/profile"],
};
