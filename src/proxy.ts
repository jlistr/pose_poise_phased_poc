import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // === Subdomain Routing Logic Merge ===
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ""
  const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'poseandpoise.studio'
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')

  if (!isLocalhost) {
    const isSubdomain = 
      hostname !== baseDomain && 
      hostname !== `www.${baseDomain}` && 
      hostname.endsWith(`.${baseDomain}`)

    if (isSubdomain) {
      const username = hostname.replace(`.${baseDomain}`, '')
      
      if (
          username && 
          username !== 'www' &&
          !url.pathname.startsWith('/api') && 
          !url.pathname.startsWith('/_next')
      ) {
        // We rewrite to the dynamic profile route
        supabaseResponse = NextResponse.rewrite(new URL(`/${username}${url.pathname}`, request.url))
      }
    }
  }

  // === Supabase SSR Auth Logic ===
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 1. Core Authentication Refresh (VITAL for Supabase SSR)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define explicitly defined routing boundaries for Phase 2 Tier Security
  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup')
  const isProtectedRoute = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/onboarding')
  
  // Phase 2.5: Extremely specific locked routes that ONLY active subscribers can touch
  const isPremiumRoute = url.pathname.startsWith('/dashboard/premium') || url.pathname.startsWith('/comp-card/export')

  // Prevent users from accessing Dashboard anonymously
  if (!user && isProtectedRoute) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Prevent authed users from sitting on the login screen
  if (user && isAuthPage) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Phase 2.5 Logic: Edge Database Gating for the Stripe "Professional" logic
  if (user && isPremiumRoute) {
    // We execute a high-speed Edge-compatible REST lookup across Supabase to retrieve their exact active tier!
    const { data: featureData } = await supabase
      .from('user_features')
      .select('tier')
      .eq('id', user.id)
      .single()

    if (!featureData || featureData.tier !== 'pro') {
      url.pathname = '/upgrade'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
