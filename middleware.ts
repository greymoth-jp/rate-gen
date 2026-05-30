import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/dashboard', '/estimate', '/contracts', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth gate for protected app routes
  const requiresAuth = PROTECTED.some((p) => pathname.startsWith(p));
  if (requiresAuth) {
    const session = request.cookies.get('better-auth.session_token');
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/estimate/:path*',
    '/contracts/:path*',
    '/settings/:path*',
  ],
};
