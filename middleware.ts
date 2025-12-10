import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Public paths
  const isPublic = pathname.startsWith('/auth/login') || pathname === '/' || pathname.startsWith('/api');
  if (isPublic) return NextResponse.next();

  const token = await getToken({ req });

  // Not authenticated
  if (!token) {
    const url = new URL('/auth/login', req.url);
    if (pathname.startsWith('/scan')) {
      url.searchParams.set('from', `${pathname}${nextUrl.search}`);
    }
    return NextResponse.redirect(url);
  }

  const roleFromToken = (token as any).role as string | undefined;
  const roleFromCookie = req.cookies.get('role')?.value;
  const role = roleFromToken || roleFromCookie;

  const roleAllowed = (
    (pathname.startsWith('/doctor') && /doctor/i.test(role || '')) ||
    (pathname.startsWith('/pharmacist') && /pharmacist/i.test(role || '')) ||
    (pathname.startsWith('/patient') && /patient/i.test(role || '')) ||
    (pathname.startsWith('/trainee') && /trainee/i.test(role || ''))
  );

  if (
    pathname.startsWith('/doctor') ||
    pathname.startsWith('/pharmacist') ||
    pathname.startsWith('/patient') ||
    pathname.startsWith('/trainee')
  ) {
    if (!roleAllowed) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Protect admin area: require admin or doctor
  if (pathname.startsWith('/admin')) {
    const accessToken = req.cookies.get('access_token')?.value;
    const isAdminDoctor = /^(admin|doctor)$/i.test(role || '');
    if (!accessToken || !isAdminDoctor) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Allow other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
