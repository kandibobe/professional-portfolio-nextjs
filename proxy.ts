import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect dashboard routes
  // Matches /dashboard, /admin, /en/dashboard, /it/admin, etc.
  const isProtected = pathname.match(/^(\/(en|it))?\/(dashboard|admin)/);

  if (isProtected) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const localeMatch = pathname.match(/^\/(en|it)/);
      const locale = localeMatch ? localeMatch[1] : 'en';

      const url = new URL(`/${locale}/login`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(it|en)/:path*'],
};
