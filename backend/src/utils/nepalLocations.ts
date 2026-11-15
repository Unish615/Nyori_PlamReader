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
  // Province 1 (Koshi)
  { district: 'Bhojpur', districtNe: 'भोजपुर', city: 'Bhojpur', cityNe: 'भोजपुर', latitude: 27.1722, longitude: 87.0456, timezone: 5.75 },
  { district: 'Dhankuta', districtNe: 'धनकुटा', city: 'Dhankuta', cityNe: 'धनकुटा', latitude: 26.9833, longitude: 87.3333, timezone: 5.75 },
  { district: 'Ilam', districtNe: 'इलाम', city: 'Ilam', cityNe: 'इलाम', latitude: 26.9089, longitude: 87.9269, timezone: 5.75 },
  { district: 'Jhapa', districtNe: 'झापा', city: 'Bhadrapur / Damak', cityNe: 'भद्रपुर / दमक', latitude: 26.5445, longitude: 88.0777, timezone: 5.75 },
  { district: 'Khotang', districtNe: 'खोटाङ', city: 'Diktel', cityNe: 'दिक्तेल', latitude: 27.2167, longitude: 86.7833, timezone: 5.75 },
  { district: 'Morang', districtNe: 'मोरङ', city: 'Biratnagar', cityNe: 'विराटनगर', latitude: 26.4525, longitude: 87.2718, timezone: 5.75 },
  { district: 'Okhaldhunga', districtNe: 'ओखलढुङ्गा', city: 'Okhaldhunga', cityNe: 'ओखलढुङ्गा', latitude: 27.3167, longitude: 86.5000, timezone: 5.75 },
  { district: 'Panchthar', districtNe: 'पाँचथर', city: 'Phidim', cityNe: 'फिदिम', latitude: 27.1500, longitude: 87.7667, timezone: 5.75 },
  { district: 'Sankhuwasabha', districtNe: 'सङ्खुवासभा', city: 'Khandbari', cityNe: 'खाँदबारी', latitude: 27.3744, longitude: 87.2064, timezone: 5.75 },
  { district: 'Solukhumbu', districtNe: 'सोलुखुम्बु', city: 'Salleri / Namche', cityNe: 'सल्लेरी / नाम्चे', latitude: 27.5000, longitude: 86.5833, timezone: 5.75 },
  { district: 'Sunsari', districtNe: 'सुनसरी', city: 'Dharan / Inaruwa', cityNe: 'धरान / इनरुवा', latitude: 26.8124, longitude: 87.2835, timezone: 5.75 },
  { district: 'Taplejung', districtNe: 'ताप्लेजुङ', city: 'Fungling', cityNe: 'फुङलिङ', latitude: 27.3500, longitude: 87.6667, timezone: 5.75 },
  { district: 'Terhathum', districtNe: 'तेह्रथुम', city: 'Myanglung', cityNe: 'म्याङ्लुङ', latitude: 27.1333, longitude: 87.5333, timezone: 5.75 },
  { district: 'Udayapur', districtNe: 'उदयपुर', city: 'Gaighat', cityNe: 'गाईघाट', latitude: 26.7917, longitude: 86.6944, timezone: 5.75 },

  // Madhesh Province
  { district: 'Bara', districtNe: 'बारा', city: 'Kalaiya', cityNe: 'कलैया', latitude: 27.0306, longitude: 85.0028, timezone: 5.75 },
  { district: 'Dhanusha', districtNe: 'धनुषा', city: 'Janakpurdham', cityNe: 'जनकपुरधाम', latitude: 26.7271, longitude: 85.9407, timezone: 5.75 },
  { district: 'Mahottari', districtNe: 'महोत्तरी', city: 'Jaleshwor', cityNe: 'जलेश्वर', latitude: 26.6472, longitude: 85.8011, timezone: 5.75 },
  { district: 'Parsa', districtNe: 'पर्सा', city: 'Birgunj', cityNe: 'वीरगञ्ज', latitude: 27.0133, longitude: 84.8773, timezone: 5.75 },
  { district: 'Rautahat', districtNe: 'रौतहट', city: 'Gaur', cityNe: 'गौर', latitude: 26.7644, longitude: 85.2778, timezone: 5.75 },
  { district: 'Saptari', districtNe: 'सप्तरी', city: 'Rajbiraj', cityNe: 'राजविराज', latitude: 26.5414, longitude: 86.7533, timezone: 5.75 },
  { district: 'Sarlahi', districtNe: 'सर्लाही', city: 'Malangwa', cityNe: 'मलङ्गवा', latitude: 26.8589, longitude: 85.5583, timezone: 5.75 },
  { district: 'Siraha', districtNe: 'सिराहा', city: 'Siraha / Lahan', cityNe: 'सिराहा / लहान', latitude: 26.6547, longitude: 86.2081, timezone: 5.75 },

  // Bagmati Province
  { district: 'Bhaktapur', districtNe: 'भक्तपुर', city: 'Bhaktapur', cityNe: 'भक्तपुर', latitude: 27.6710, longitude: 85.4298, timezone: 5.75 },
  { district: 'Chitwan', districtNe: 'चितवन', city: 'Bharatpur / Narayangarh', cityNe: 'भरतपुर / नारायणगढ', latitude: 27.6833, longitude: 84.4333, timezone: 5.75 },
  { district: 'Dhading', districtNe: 'धादिङ', city: 'Dhading Besi', cityNe: 'धादिङ बेसी', latitude: 27.8667, longitude: 84.9000, timezone: 5.75 },
  { district: 'Dolakha', districtNe: 'दोलखा', city: 'Charikot', cityNe: 'चरिकोट', latitude: 27.6683, longitude: 86.0469, timezone: 5.75 },
  { district: 'Kathmandu', districtNe: 'काठमाडौँ', city: 'Kathmandu', cityNe: 'काठमाडौँ', latitude: 27.7172, longitude: 85.3240, timezone: 5.75 },
  { district: 'Kavrepalanchok', districtNe: 'काभ्रेपलाञ्चोक', city: 'Dhulikhel / Banepa', cityNe: 'धुलिखेल / बनेपा', latitude: 27.6253, longitude: 85.5561, timezone: 5.75 },
  { district: 'Lalitpur', districtNe: 'ललितपुर', city: 'Patan / Lalitpur', cityNe: 'पाटन / ललितपुर', latitude: 27.6710, longitude: 85.3188, timezone: 5.75 },
  { district: 'Makwanpur', districtNe: 'मकवानपुर', city: 'Hetauda', cityNe: 'हेटौँडा', latitude: 27.4289, longitude: 85.0336, timezone: 5.75 },
  { district: 'Nuwakot', districtNe: 'नुवाकोट', city: 'Bidur', cityNe: 'बिदुर', latitude: 27.9133, longitude: 85.1633, timezone: 5.75 },
  { district: 'Ramechhap', districtNe: 'रामेछाप', city: 'Manthali', cityNe: 'मन्थली', latitude: 27.3889, longitude: 86.0639, timezone: 5.75 },
  { district: 'Rasuwa', districtNe: 'रसुवा', city: 'Dhunche', cityNe: 'धुन्चे', latitude: 28.1133, longitude: 85.2961, timezone: 5.75 },
  { district: 'Sindhuli', districtNe: 'सिन्धुली', city: 'Sindhulimadhi', cityNe: 'सिन्धुलीमाढी', latitude: 27.2500, longitude: 85.9667, timezone: 5.75 },
  { district: 'Sindhupalchok', districtNe: 'सिन्धुपाल्चोक', city: 'Chautara', cityNe: 'चौतारा', latitude: 27.7719, longitude: 85.7178, timezone: 5.75 },

  // Gandaki Province
  { district: 'Baglung', districtNe: 'बागलुङ', city: 'Baglung', cityNe: 'बागलुङ', latitude: 28.2719, longitude: 83.5936, timezone: 5.75 },
  { district: 'Gorkha', districtNe: 'गोरखा', city: 'Gorkha', cityNe: 'गोरखा', latitude: 28.0000, longitude: 84.6333, timezone: 5.75 },
  { district: 'Kaski', districtNe: 'कास्की', city: 'Pokhara', cityNe: 'पोखरा', latitude: 28.2096, longitude: 83.9856, timezone: 5.75 },
  { district: 'Lamjung', districtNe: 'लमजुङ', city: 'Besisahar', cityNe: 'बेसीसहर', latitude: 28.2333, longitude: 84.4167, timezone: 5.75 },
  { district: 'Manang', districtNe: 'मनाङ', city: 'Chame', cityNe: 'चामे', latitude: 28.5500, longitude: 84.2333, timezone: 5.75 },
  { district: 'Mustang', districtNe: 'मुस्ताङ', city: 'Jomsom / Muktinath', cityNe: 'जोमसोम / मुक्तिनाथ', latitude: 28.7833, longitude: 83.7333, timezone: 5.75 },
  { district: 'Myagdi', districtNe: 'म्याग्दी', city: 'Beni', cityNe: 'बेनी', latitude: 28.3431, longitude: 83.5647, timezone: 5.75 },
  { district: 'Nawalpur', districtNe: 'नवलपुर', city: 'Kawasoti', cityNe: 'कावासोती', latitude: 27.6500, longitude: 84.1167, timezone: 5.75 },
  { district: 'Parbat', districtNe: 'पर्वत', city: 'Kusma', cityNe: 'कुश्मा', latitude: 28.2167, longitude: 83.6833, timezone: 5.75 },
  { district: 'Syangja', districtNe: 'स्याङ्जा', city: 'Putalibazar', cityNe: 'पुतलीबजार', latitude: 28.1000, longitude: 83.8667, timezone: 5.75 },
  { district: 'Tanahun', districtNe: 'तनहुँ', city: 'Damauli', cityNe: 'दमौली', latitude: 27.9719, longitude: 84.2831, timezone: 5.75 },

  // Lumbini Province
  { district: 'Arghakhanchi', districtNe: 'अर्घाखाँची', city: 'Sandhikharka', cityNe: 'सन्धिखर्क', latitude: 27.9947, longitude: 83.1256, timezone: 5.75 },
  { district: 'Banke', districtNe: 'बाँके', city: 'Nepalgunj / Kohalpur', cityNe: 'नेपालगञ्ज / कोहलपुर', latitude: 28.0500, longitude: 81.6167, timezone: 5.75 },
  { district: 'Bardiya', districtNe: 'बर्दिया', city: 'Gulariya', cityNe: 'गुलरिया', latitude: 28.2333, longitude: 81.3333, timezone: 5.75 },
  { district: 'Dang', districtNe: 'दाङ', city: 'Ghorahi / Tulsipur', cityNe: 'घोराही / तुलसीपुर', latitude: 28.0333, longitude: 82.4833, timezone: 5.75 },
  { district: 'Gulmi', districtNe: 'गुल्मी', city: 'Tamghas', cityNe: 'तम्घास', latitude: 28.0667, longitude: 83.2500, timezone: 5.75 },
  { district: 'Kapilvastu', districtNe: 'कपिलवस्तु', city: 'Taulihawa', cityNe: 'तौलिहवा', latitude: 27.5500, longitude: 83.0500, timezone: 5.75 },
  { district: 'Parasi', districtNe: 'परासी', city: 'Ramgram', cityNe: 'रामग्राम', latitude: 27.5333, longitude: 83.6667, timezone: 5.75 },
  { district: 'Palpa', districtNe: 'पाल्पा', city: 'Tansen', cityNe: 'तानसेन', latitude: 27.8667, longitude: 83.5500, timezone: 5.75 },
  { district: 'Pyuthan', districtNe: 'प्युठान', city: 'Pyuthan', cityNe: 'प्युठान', latitude: 28.1000, longitude: 82.8833, timezone: 5.75 },
  { district: 'Rolpa', districtNe: 'रोल्पा', city: 'Liwang', cityNe: 'लिवाङ', latitude: 28.3000, longitude: 82.6333, timezone: 5.75 },
  { district: 'Eastern Rukum', districtNe: 'पूर्वी रुकुम', city: 'Rukumkot', cityNe: 'रुकुमकोट', latitude: 28.6000, longitude: 82.6333, timezone: 5.75 },
  { district: 'Rupandehi', districtNe: 'रुपन्देही', city: 'Butwal / Siddharthanagar / Lumbini', cityNe: 'बुटवल / भैरहवा / लुम्बिनी', latitude: 27.7000, longitude: 83.4500, timezone: 5.75 },

  // Karnali Province
  { district: 'Dailekh', districtNe: 'दैलेख', city: 'Narayan', cityNe: 'नारायण', latitude: 28.8333, longitude: 81.7167, timezone: 5.75 },
  { district: 'Dolpa', districtNe: 'डोल्पा', city: 'Dunai', cityNe: 'दुने', latitude: 28.9333, longitude: 82.9167, timezone: 5.75 },
  { district: 'Humla', districtNe: 'हुम्ला', city: 'Simikot', cityNe: 'सिमिकोट', latitude: 29.9667, longitude: 81.8333, timezone: 5.75 },
  { district: 'Jajarkot', districtNe: 'जाजरकोट', city: 'Khalanga', cityNe: 'खलङ्गा', latitude: 28.7000, longitude: 82.2000, timezone: 5.75 },
  { district: 'Jumla', districtNe: 'जुम्ला', city: 'Chandannath', cityNe: 'चन्दननाथ', latitude: 29.2747, longitude: 82.1839, timezone: 5.75 },
  { district: 'Kalikot', districtNe: 'कालिकोट', city: 'Manma', cityNe: 'मान्म', latitude: 29.1333, longitude: 81.6167, timezone: 5.75 },
  { district: 'Mugu', districtNe: 'मुगु', city: 'Gamgadhi / Rara', cityNe: 'गमगढी / रारा', latitude: 29.5500, longitude: 82.1667, timezone: 5.75 },
  { district: 'Salyan', districtNe: 'सल्यान', city: 'Salyan', cityNe: 'सल्यान', latitude: 28.3667, longitude: 82.1667, timezone: 5.75 },
  { district: 'Surkhet', districtNe: 'सुर्खेत', city: 'Birendranagar', cityNe: 'वीरेन्द्रनगर', latitude: 28.6000, longitude: 81.6333, timezone: 5.75 },
  { district: 'Western Rukum', districtNe: 'पश्चिम रुकुम', city: 'Musikot', cityNe: 'मुसिकोट', latitude: 28.6333, longitude: 82.4667, timezone: 5.75 },

  // Sudurpashchim Province
  { district: 'Achham', districtNe: 'अछाम', city: 'Mangalsen', cityNe: 'मङ्गलसेन', latitude: 29.1333, longitude: 81.2667, timezone: 5.75 },
  { district: 'Baitadi', districtNe: 'बैतडी', city: 'Dasharathchand', cityNe: 'दशरथचन्द', latitude: 29.5333, longitude: 80.4667, timezone: 5.75 },
  { district: 'Bajhang', districtNe: 'बझाङ', city: 'Chainpur', cityNe: 'चैनपुर', latitude: 29.5667, longitude: 81.2000, timezone: 5.75 },
  { district: 'Bajura', districtNe: 'बाजुरा', city: 'Martadi', cityNe: 'मार्तडी', latitude: 29.5000, longitude: 81.6000, timezone: 5.75 },
  { district: 'Dadeldhura', districtNe: 'डडेल्धुरा', city: 'Amargadhi', cityNe: 'अमरगढी', latitude: 29.3000, longitude: 80.5833, timezone: 5.75 },
  { district: 'Darchula', districtNe: 'दार्चुला', city: 'Khalanga', cityNe: 'खलङ्गा', latitude: 29.8500, longitude: 80.5333, timezone: 5.75 },
  { district: 'Doti', districtNe: 'डोटी', city: 'Dipayal Silgadhi', cityNe: 'दिपायल सिलगढी', latitude: 29.2667, longitude: 80.9333, timezone: 5.75 },
  { district: 'Kailali', districtNe: 'कैलाली', city: 'Dhangadhi / Tikapur', cityNe: 'धनगढी / टीकापुर', latitude: 28.6833, longitude: 80.6000, timezone: 5.75 },
  { district: 'Kanchanpur', districtNe: 'कञ्चनपुर', city: 'Bheemdatta / Mahendranagar', cityNe: 'भीमदत्त / महेन्द्रनगर', latitude: 28.9667, longitude: 80.1833, timezone: 5.75 }
];

export function resolveCoordinates(districtName: string, cityName?: string): LocationData {
  const query = (cityName || districtName).toLowerCase().trim();
  const districtQuery = districtName.toLowerCase().trim();

  // Exact or partial match
  const match = NEPAL_DISTRICTS.find(loc => 
    loc.district.toLowerCase() === districtQuery ||
    loc.districtNe === districtName ||
    loc.city.toLowerCase().includes(query) ||
    loc.cityNe.includes(query)
  );

  if (match) {
    return match;
  }

  // Default to Kathmandu
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
