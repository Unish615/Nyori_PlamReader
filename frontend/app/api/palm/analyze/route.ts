import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const handType = body.handType === 'left' ? 'left' : 'right';
    const isRight = handType === 'right';

    // Structured traditional palmistry analysis
    const reading = {
      id: `plm-${Date.now()}`,
      handType,
      imageUrl: body.imageBase64 || '/images/palm-demo.svg',
      qualityStatus: 'verified',
      analysis: {
        quality: { status: 'verified', messageEn: 'Verified', messageNe: 'प्रमाणीकरण सफल भयो' },
        features: {
          lifeLine: {
            name: 'Life Line',
            nameNe: 'जीवन रेखा (आयु रेखा)',
            clarity: 'Clear & Defined',
            description: 'Strong arch denoting vibrant physical endurance and positive adaptability.',
            descriptionNe: 'शुक्र पर्वतलाई घेरेको स्पष्ट जीवन रेखाले उत्तम शारीरिक बल, जीवन्त उत्साह र जीवन ऊर्जा दर्शाउँछ।'
          },
          headLine: {
            name: 'Head Line',
            nameNe: 'मस्तिष्क रेखा (बुद्धि रेखा)',
            clarity: 'Long & Sloping',
            description: 'Gently sloping toward Mount of Moon, balancing logic with creative intuition.',
            descriptionNe: 'चन्द्र पर्वततर्फ झुकेको रेखाले तार्किक सोच र रचनात्मक कल्पनाशक्तिको सुन्दर तालमेल देखाउँछ।'
          },
          heartLine: {
            name: 'Heart Line',
            nameNe: 'हृदय रेखा (भावना रेखा)',
            clarity: 'Curves to Jupiter',
            description: 'Harmonious emotional depth, loyalty in affection, and discerning values.',
            descriptionNe: 'बृहस्पति पर्वततर्फ गएको रेखाले गहिरो निष्ठा, सहानुभूति र भरपर्दो सम्बन्धलाई प्रकट गर्छ।'
          },
          fateLine: {
            name: 'Fate Line',
            nameNe: 'भाग्य रेखा (कर्म रेखा)',
            clarity: 'Direct toward Saturn',
            description: 'Ascends steadily, pointing to success built upon self-directed determination.',
            descriptionNe: 'शनि पर्वततर्फ सोझिएको रेखाले आफ्नै पौरख र लगनशीलताबाट बन्ने भविष्यलाई संकेत गर्छ।'
          },
          sunLine: {
            name: 'Sun Line',
            nameNe: 'सूर्य रेखा (कीर्ति रेखा)',
            clarity: 'Prominent Apollo mark',
            description: 'Indicates public goodwill, artistic appreciation, and intellectual respect.',
            descriptionNe: 'अनामिका औंलामुनि रहेको सूर्य रेखाले समाजमा यश, कीर्ति र सम्मानको संकेत दिन्छ।'
          },
          marriageLine: {
            name: 'Relationship / Marriage Line',
            nameNe: 'विवाह रेखा',
            clarity: 'Single distinct line',
            description: 'Signifies an enduring and mutually supportive romantic commitment.',
            descriptionNe: 'बुध पर्वतमुनिको स्पष्ट रेखाले सुखद र दिगो वैवाहिक जीवनलाई संकेत गर्दछ।'
          },
          palmShape: {
            name: 'Palm Shape',
            nameNe: 'हातको बनोट',
            type: 'Earth-Air Blend',
            typeNe: 'पृथ्वी-वायु मिश्रित',
            description: 'Firm, balanced structure reflecting both pragmatism and intellectual curiosity.',
            descriptionNe: 'बलियो हत्केला र सन्तुलित औंलाहरूले व्यावहारिक सोच र सिक्ने चाहना दर्साउँछ।'
          },
          fingers: {
            name: 'Fingers',
            nameNe: 'औंलाहरूको बनोट',
            description: 'Well-aligned knuckles with strong Jupiter index finger indicating natural leadership.',
            descriptionNe: 'सुगठित औंलाहरू तथा तर्जनी बलियो हुनुले नेतृत्व क्षमतालाई पुष्टि गर्छ।'
          },
          mounts: {
            name: 'Planetary Mounts',
            nameNe: 'ग्रह पर्वतहरू',
            description: 'Prominent Jupiter and Venus mounts bestowing charisma and executive optimism.',
            descriptionNe: 'उठेको बृहस्पति र शुक्र पर्वतले व्यक्तित्वमा आकर्षण र सकारात्मक सोच दिन्छ।'
          }
        },
        interpretations: {
          generalSummary: {
            en: `This ${handType} hand reveals a resilient, principled personality with strong mental clarity and steady perseverance.`,
            ne: `यो ${isRight ? 'दायाँ' : 'बायाँ'} हातले उद्देश्यप्रति दृढ, सिद्धान्तवादी र ऊर्जावान् व्यक्तित्व दर्साउँछ। तपाईंसँग योजनाहरूलाई व्यवहारमा बदल्ने क्षमता र बौद्धिक दक्षता छ।`
          },
          personality: {
            en: 'You are naturally observant, empathetic, and hold steadfast personal boundaries.',
            ne: 'तपाईं संवेदनशील, विश्वासी र स्पष्ट सोचाइ भएको व्यक्ति हुनुहुन्छ। आफ्ना मूल्य-मान्यतामा तपाईं दृढ रहनुहुन्छ।'
          },
          career: {
            en: 'Your fate line points toward steady self-made accomplishment in strategic or analytical roles post age 27.',
            ne: 'भाग्य रेखाले आफ्नै पौरखबाट प्रगति हुने स्पष्ट संकेत गर्छ। २७ वर्षपछि कर्मक्षेत्रमा ठूलो स्थिरता र प्रतिष्ठा आउनेछ।'
          },
          loveAndRelationships: {
            en: 'You value transparency, mutual respect, and intellectual companionship in romantic partnerships.',
            ne: 'सम्बन्धमा तपाईं देखावटीपनभन्दा साँचो भावना र आपसी विश्वासलाई बढी महत्व दिनुहुन्छ।'
          },
          financialSymbolism: {
            en: 'Traditional indicators show sustained growth through structured savings and prudent long-term investments.',
            ne: 'हस्तरेखा अनुसार नियमित बचत र व्यवस्थित लगानीमार्फत धनसम्पत्तिमा निरन्तर वृद्धि हुनेछ।'
          },
          strengths: {
            en: ['High mental focus', 'Natural leadership', 'Empathy in relationships', 'Fast adaptability'],
            ne: ['उच्च मानसिक एकाग्रता', 'स्वाभाविक नेतृत्व क्षमता', 'सम्बन्धमा इमानदारी', 'नयाँ परिस्थितिमा अनुकूल हुने क्षमता']
          },
          weaknesses: {
            en: ['Over-analyzing minor details', 'Hesitation in delegating key tasks'],
            ne: ['साना कुरामा धेरै सोच्ने बानी', 'काम अरूलाई सुम्पिन हिचकिचाउने स्वभाव']
          },
          traditionalGuidance: {
            en: 'Mindful reflection, ethical habits, and daily balance nurture favorable line growth over time.',
            ne: 'दैनिक ध्यान, सकारात्मक कर्म र स्वास्थ्यप्रतिको सचेतताले हस्तरेखाहरूलाई अझ शुभ र फलदायी बनाउँछ।'
          }
        },
        followUpQuestions: {
          en: [
            'What career sectors align best with my fate line?',
            'How does my left hand compare with my right hand?',
            'What traditional Vedic practices enhance the Sun line?'
          ],
          ne: [
            'मेरो भाग्य रेखा अनुसार कुन क्षेत्रको पेशा अनुकूल छ?',
            'दायाँ र बायाँ हातका रेखाहरूमा के फरक हुन्छ?',
            'सूर्य रेखाको प्रभाव बलियो बनाउन कुन उपाय उपयुक्त हुन्छ?'
          ]
        },
        disclaimer: {
          en: 'Palmistry is a cultural interpretation system, not a scientifically proven certainty.',
          ne: 'हस्तरेखा परम्परागत तथा सांस्कृतिक व्याख्या हो, १००% निश्चित वैज्ञानिक वा चिकित्सा निदान होइन।'
        }
      }
    };

    return NextResponse.json({
      success: true,
      quality: { status: 'verified', messageEn: 'Verified', messageNe: 'प्रमाणीकरण सफल भयो', isAcceptable: true },
      reading
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
