import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired
  await supabase.auth.getSession()

  // Get the pathname
  const path = request.nextUrl.pathname

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/history']
  
  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.includes(path) && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is authenticated and trying to access auth pages
  if (session && path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Specify which routes this middleware should run for
export const config = {
  matcher: ['/', '/dashboard', '/profile', '/history'],
} 