import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isLoginPage = req.nextUrl.pathname.startsWith('/login');

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));  // Allow login if no token
  }
  

  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};