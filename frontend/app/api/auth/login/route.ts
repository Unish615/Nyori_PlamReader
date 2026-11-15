import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    return NextResponse.json({
      success: true,
      user: {
        id: 'usr-demo-01',
        email: email || 'demo@nyoriachina.com',
        fullName: email ? email.split('@')[0] : 'Sujan Sharma',
        nwaranName: 'शिव प्रसाद',
        role: email?.includes('admin') ? 'admin' : 'user',
        preferredLanguage: 'ne'
      },
      token: 'jwt-session-token'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
