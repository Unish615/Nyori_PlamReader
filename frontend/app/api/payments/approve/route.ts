import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentId, adminId = 'usr-admin-01' } = body;

    if (!paymentId) {
      return NextResponse.json({ success: false, error: 'Payment ID is required' }, { status: 400 });
    }

    const result = store.approvePayment(paymentId, adminId);
    return NextResponse.json({
      success: true,
      message: 'Payment approved. Subscription plan and credits activated immediately.',
      payment: result.payment,
      credits: result.credits
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
