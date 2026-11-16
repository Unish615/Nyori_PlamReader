import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const isAdmin = email?.toLowerCase().includes('admin');
    
    return NextResponse.json({
      success: true,
      user: {
        id: isAdmin ? 'usr-admin-01' : `usr-${Date.now()}`,
        email: email || '',
        fullName: isAdmin ? 'Admin Jyotish' : (email ? email.split('@')[0] : 'User'),
        nwaranName: '',
        role: isAdmin ? 'admin' : 'user',
        preferredLanguage: 'ne'
      },
      token: isAdmin ? 'jwt-admin-token' : 'jwt-session-token'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
