import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const path = request.nextUrl.pathname;
  
  if (user) {
    if (path.startsWith('/admin')) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      
      if (!profile || profile.role !== 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    }
    
    if (path.startsWith('/login') || path.startsWith('/register')) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        const url = request.nextUrl.clone();
        
        if (profile?.role === 'admin') {
          url.pathname = '/admin/dashboard';
        } else {
          url.pathname = '/dashboard';
        }
        return NextResponse.redirect(url);
    }
  } else {
    // allow public access to auth callbacks, login, register, public assets or root if applicable
    if (
        !path.startsWith('/login') && 
        !path.startsWith('/register') && 
        !path.startsWith('/auth') &&
        path !== '/' // assuming root is public, if not remove this line. Wait, root is public landing page? By default maybe.
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
