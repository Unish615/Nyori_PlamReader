import { NextResponse } from 'next/server';

export async function GET() {
  // Empty initial reports list so clean fresh users have no dummy data
  return NextResponse.json({ success: true, data: [] });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
