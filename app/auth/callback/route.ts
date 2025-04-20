import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      
      // Exchange the code for a session
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      if (sessionError) {
        console.error('Session error:', sessionError)
        return NextResponse.redirect(new URL('/?error=auth', request.url))
      }

      // Verify the user is actually authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('User verification error:', userError)
        return NextResponse.redirect(new URL('/?error=auth', request.url))
      }

      // Successfully authenticated
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // No code provided
    return NextResponse.redirect(new URL('/?error=no_code', request.url))
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/?error=unknown', request.url))
  }
} 