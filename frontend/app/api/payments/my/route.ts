import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr-demo-01';

    const payments = store.getUserPayments(userId);
    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
