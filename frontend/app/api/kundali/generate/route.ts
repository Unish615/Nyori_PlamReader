import { NextResponse } from 'next/server';
import { calculateVedicKundali } from '@/lib/astronomy';
import { resolveCoordinates } from '@/lib/nepalLocations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    return NextResponse.json({ success: true, data: record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
