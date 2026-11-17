import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr-demo-01';

    const credits = store.getUserCredits(userId);
    const subscription = store.getUserSubscription(userId);

    return NextResponse.json({
      success: true,
      credits,
      subscription
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = 'usr-client', subscription, credits } = body;

    let updatedSub = null;
    let updatedCredits = null;

    if (subscription) {
      updatedSub = store.setUserSubscription(userId, subscription);
    }
    if (credits) {
      updatedCredits = store.setUserCredits(userId, credits);
    }

    return NextResponse.json({
      success: true,
      subscription: updatedSub,
      credits: updatedCredits
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
