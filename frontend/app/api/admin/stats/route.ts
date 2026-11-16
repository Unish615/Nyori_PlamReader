import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalUsers: 1,
        totalKundalis: 0,
        totalPalms: 0,
        totalChats: 0,
        systemHealth: '100% Operational',
        astronomyEngine: 'Lahiri Ayanamsa Active',
        aiVisionEngine: 'Vedic AI Vision Active'
      },
      recentActivity: []
    }
  });
}
