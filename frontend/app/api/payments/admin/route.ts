import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const payments = store.getAllPayments();
    return NextResponse.json({ success: true, payments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
