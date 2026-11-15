import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalUsers: 24,
        totalKundalis: 48,
        totalPalms: 62,
        totalChats: 130,
        systemHealth: '100% Operational',
        astronomyEngine: 'Lahiri Ayanamsa v2026 Active',
        aiVisionEngine: 'Gemini Vision & Vedic Rules Active'
      },
      recentActivity: []
    }
  });
}
