import { NextResponse } from 'next/server';
import { calculateVedicKundali } from '@/lib/astronomy';
import { resolveCoordinates } from '@/lib/nepalLocations';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr-demo-01';

    // Verify credits before generating full Kundali
    const userCredits = store.getUserCredits(userId);
    if (userCredits.kundalis <= 0) {
      return NextResponse.json({
        success: false,
        outOfCredits: true,
        error: 'तपाईंको कुण्डली निकाल्ने कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।',
        errorEn: 'Your Kundali generation credits have been exhausted. Please upgrade your plan.'
      }, { status: 403 });
    }

    const coords = (body.latitude && body.longitude)
      ? {
          district: body.district,
          city: body.city || body.district,
          latitude: body.latitude,
          longitude: body.longitude,
          timezone: body.timezone || 5.75
        }
      : resolveCoordinates(body.district, body.city || body.birthplace);

    const calculation = calculateVedicKundali({
      fullName: body.fullName,
      nwaranName: body.nwaranName,
      dateOfBirth: body.dateOfBirth,
      timeOfBirth: body.timeOfBirth,
      latitude: coords.latitude,
      longitude: coords.longitude,
      timezone: coords.timezone
    });

    const record = {
      id: `kun-${Date.now()}`,
      profile: {
        ...body,
        district: coords.district,
        city: coords.city,
        latitude: coords.latitude,
        longitude: coords.longitude,
        timezone: coords.timezone
      },
      report: calculation,
      createdAt: new Date().toISOString()
    };

    // Deduct credit only on successful calculation
    const deduction = store.checkAndDeductCredit(userId, 'kundali');

    return NextResponse.json({ success: true, data: record, remainingCredits: deduction.remaining });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
