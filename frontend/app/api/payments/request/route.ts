import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId = 'usr-demo-01',
      userName = 'Unish Gautam',
      userEmail = 'unish@nyoriachina.com',
      planId,
      paymentMethod,
      transactionReference,
      screenshotUrl,
      note
    } = body;

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Subscription plan is required' }, { status: 400 });
    }
    if (!paymentMethod || !['esewa', 'khalti'].includes(paymentMethod)) {
      return NextResponse.json({ success: false, error: 'Valid payment method (eSewa or Khalti) is required' }, { status: 400 });
    }
    if (!transactionReference || !transactionReference.trim()) {
      return NextResponse.json({ success: false, error: 'Transaction Reference ID is required' }, { status: 400 });
    }
    if (!screenshotUrl) {
      return NextResponse.json({ success: false, error: 'Payment screenshot is required' }, { status: 400 });
    }

    const transaction = store.submitPaymentRequest({
      userId,
      userName,
      userEmail,
      planId,
      paymentMethod,
      transactionReference,
      screenshotUrl,
      note
    });

    return NextResponse.json({
      success: true,
      transaction,
      message: 'Payment request submitted successfully. It will be verified by admin.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
