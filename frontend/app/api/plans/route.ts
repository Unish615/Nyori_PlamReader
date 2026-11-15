import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const plans = store.getPlans();
    return NextResponse.json({ success: true, plans });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Plan ID is required' }, { status: 400 });
    }
    const updated = store.updatePlan(id, updates);
    return NextResponse.json({ success: true, plan: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
