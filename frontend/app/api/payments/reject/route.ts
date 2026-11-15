import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentId, reason = 'Payment receipt could not be verified in eSewa/Khalti account.', adminId = 'usr-admin-01' } = body;

    if (!paymentId) {
      return NextResponse.json({ success: false, error: 'Payment ID is required' }, { status: 400 });
    }

    const payment = store.rejectPayment(paymentId, reason, adminId);
    return NextResponse.json({
      success: true,
      message: 'Payment request rejected with notice to user.',
      payment
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
