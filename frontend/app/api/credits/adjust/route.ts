import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = 'usr-demo-01', questions = 0, palms = 0, kundalis = 0, reason = 'Admin adjustment', adminId = 'usr-admin-01' } = body;

    const updatedCredits = store.manualAdjustCredits(
      userId,
      Number(questions),
      Number(palms),
      Number(kundalis),
      reason,
      adminId
    );

    return NextResponse.json({
      success: true,
      credits: updatedCredits,
      message: 'Credits adjusted successfully'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
