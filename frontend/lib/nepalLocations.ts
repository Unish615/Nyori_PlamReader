export interface LocationData {
  district: string;
  districtNe: string;
  city: string;
  cityNe: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export const NEPAL_DISTRICTS: LocationData[] = [
  { district: 'Kathmandu', districtNe: 'काठमाडौँ', city: 'Kathmandu', cityNe: 'काठमाडौँ', latitude: 27.7172, longitude: 85.3240, timezone: 5.75 },
  { district: 'Bhaktapur', districtNe: 'भक्तपुर', city: 'Bhaktapur', cityNe: 'भक्तपुर', latitude: 27.6710, longitude: 85.4298, timezone: 5.75 },
  { district: 'Lalitpur', districtNe: 'ललितपुर', city: 'Patan', cityNe: 'पाटन', latitude: 27.6710, longitude: 85.3188, timezone: 5.75 },
  { district: 'Kaski', districtNe: 'कास्की', city: 'Pokhara', cityNe: 'पोखरा', latitude: 28.2096, longitude: 83.9856, timezone: 5.75 },
  { district: 'Morang', districtNe: 'मोरङ', city: 'Biratnagar', cityNe: 'विराटनगर', latitude: 26.4525, longitude: 87.2718, timezone: 5.75 },
  { district: 'Parsa', districtNe: 'पर्सा', city: 'Birgunj', cityNe: 'वीरगञ्ज', latitude: 27.0133, longitude: 84.8773, timezone: 5.75 },
  { district: 'Chitwan', districtNe: 'चितवन', city: 'Bharatpur', cityNe: 'भरतपुर', latitude: 27.6833, longitude: 84.4333, timezone: 5.75 },
  { district: 'Rupandehi', districtNe: 'रुपन्देही', city: 'Butwal', cityNe: 'बुटवल', latitude: 27.7000, longitude: 83.4500, timezone: 5.75 },
  { district: 'Banke', districtNe: 'बाँके', city: 'Nepalgunj', cityNe: 'नेपालगञ्ज', latitude: 28.0500, longitude: 81.6167, timezone: 5.75 },
  { district: 'Dhanusha', districtNe: 'धनुषा', city: 'Janakpurdham', cityNe: 'जनकपुरधाम', latitude: 26.7271, longitude: 85.9407, timezone: 5.75 },
  { district: 'Kailali', districtNe: 'कैलाली', city: 'Dhangadhi', cityNe: 'धनगढी', latitude: 28.6833, longitude: 80.6000, timezone: 5.75 },
  { district: 'Jhapa', districtNe: 'झापा', city: 'Damak / Bhadrapur', cityNe: 'दमक / भद्रपुर', latitude: 26.5445, longitude: 88.0777, timezone: 5.75 },
  { district: 'Sunsari', districtNe: 'सुनसरी', city: 'Dharan', cityNe: 'धरान', latitude: 26.8124, longitude: 87.2835, timezone: 5.75 },
  { district: 'Makwanpur', districtNe: 'मकवानपुर', city: 'Hetauda', cityNe: 'हेटौँडा', latitude: 27.4289, longitude: 85.0336, timezone: 5.75 },
  { district: 'Gorkha', districtNe: 'गोरखा', city: 'Gorkha', cityNe: 'गोरखा', latitude: 28.0000, longitude: 84.6333, timezone: 5.75 }
];

export function resolveCoordinates(districtName: string, cityName?: string): LocationData {
  const query = (cityName || districtName).toLowerCase().trim();
  const districtQuery = districtName.toLowerCase().trim();

  const match = NEPAL_DISTRICTS.find(loc => 
    loc.district.toLowerCase() === districtQuery ||
    loc.districtNe === districtName ||
    loc.city.toLowerCase().includes(query) ||
    loc.cityNe.includes(query)
  );

  if (match) return match;

  return {
    district: districtName || 'Kathmandu',
    districtNe: 'काठमाडौँ',
    city: cityName || 'Kathmandu',
    cityNe: 'काठमाडौँ',
    latitude: 27.7172,
    longitude: 85.3240,
    timezone: 5.75
  };
}
