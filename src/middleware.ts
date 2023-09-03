import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';

import { LOCALE_COOKIE } from './constants/cookies';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get(LOCALE_COOKIE)?.value || 'pl';

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }
}
