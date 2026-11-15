import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      user: {
        id: `usr-${Date.now()}`,
        email: body.email,
        fullName: body.fullName,
        nwaranName: body.nwaranName,
        role: 'user',
        preferredLanguage: body.preferredLanguage || 'ne'
      },
      token: 'jwt-session-token'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
