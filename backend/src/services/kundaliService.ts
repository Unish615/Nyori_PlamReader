import { calculateVedicKundali, KundaliCalculationResult } from '../utils/astronomy.js';
import { resolveCoordinates } from '../utils/nepalLocations.js';
import { store, KundaliRecord } from './store.js';

export interface GenerateKundaliInput {
  userId?: string;
  fullName: string;
  nwaranName?: string;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:MM
  gender?: string;
  country?: string;
  district: string;
  city?: string;
  birthplace?: string;
  latitude?: number;
  longitude?: number;
  timezone?: number;
}

export class KundaliService {
  static generate(input: GenerateKundaliInput) {
    const coords = (input.latitude && input.longitude)
      ? {
          district: input.district,
          city: input.city || input.district,
          latitude: input.latitude,
          longitude: input.longitude,
          timezone: input.timezone || 5.75
        }
      : resolveCoordinates(input.district, input.city || input.birthplace);

    const calculation: KundaliCalculationResult = calculateVedicKundali({
      fullName: input.fullName,
      nwaranName: input.nwaranName,
      dateOfBirth: input.dateOfBirth,
      timeOfBirth: input.timeOfBirth,
      latitude: coords.latitude,
      longitude: coords.longitude,
      timezone: coords.timezone
    });

    const reportId = `kun-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const effectiveUserId = input.userId || 'usr-demo-01';

    const record: KundaliRecord = {
      id: reportId,
      userId: effectiveUserId,
      profile: {
        fullName: input.fullName,
        nwaranName: input.nwaranName || '',
        dateOfBirth: input.dateOfBirth,
        timeOfBirth: input.timeOfBirth,
        gender: input.gender || 'unspecified',
        country: input.country || 'Nepal',
        district: coords.district,
        city: coords.city,
        birthplace: input.birthplace || `${coords.city}, ${coords.district}`,
        latitude: coords.latitude,
        longitude: coords.longitude,
        timezone: coords.timezone
      },
      report: calculation,
      createdAt: new Date().toISOString()
    };

    store.kundaliRecords.set(reportId, record);
    store.logActivity(effectiveUserId, 'KUNDALI_GENERATED', { fullName: input.fullName, reportId });

    return record;
  }

  static getHistory(userId: string) {
    const records = Array.from(store.kundaliRecords.values())
      .filter(r => r.userId === userId || userId === 'usr-demo-01')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return records;
  }

  static getById(id: string) {
    const record = store.kundaliRecords.get(id);
    if (!record) {
      // If demo seed is queried, generate one on the fly
      const fallback = KundaliService.generate({
        userId: 'usr-demo-01',
        fullName: 'Sujan Sharma',
        nwaranName: 'शिव प्रसाद',
        dateOfBirth: '1996-05-14',
        timeOfBirth: '06:30',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });
      return fallback;
    }
    return record;
  }

  static delete(id: string, userId: string) {
    const record = store.kundaliRecords.get(id);
    if (!record) return false;
    store.kundaliRecords.delete(id);
    store.logActivity(userId, 'KUNDALI_DELETED', { reportId: id });
    return true;
  }
}
