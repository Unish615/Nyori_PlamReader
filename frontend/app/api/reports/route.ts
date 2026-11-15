import { NextResponse } from 'next/server';

export async function GET() {
  const reports = [
    {
      id: 'kun-01',
      type: 'kundali',
      title: 'कुण्डली: Sujan Sharma (शिव प्रसाद)',
      date: new Date().toISOString(),
      details: { lagna: 'वृष', rashi: 'मीन', nakshatra: 'रेवती' }
    },
    {
      id: 'plm-01',
      type: 'palm',
      title: 'हस्तरेखा परीक्षण (दायाँ हात)',
      date: new Date(Date.now() - 86400000).toISOString(),
      details: { handType: 'right', quality: 'verified' }
    }
  ];
  return NextResponse.json({ success: true, data: reports });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
