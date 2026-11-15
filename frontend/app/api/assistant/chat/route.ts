import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const { message, language, userId = 'usr-demo-01' } = await req.json();

    // Verify AI Question credits before generating response
    const userCredits = store.getUserCredits(userId);
    if (userCredits.aiQuestions <= 0) {
      return NextResponse.json({
        success: false,
        outOfCredits: true,
        error: 'तपाईंको AI प्रश्न सोध्ने कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।',
        errorEn: 'Your AI assistant question credits have been exhausted. Please upgrade your plan.'
      }, { status: 403 });
    }

    const isNe = language === 'ne' || /[\u0900-\u097F]/.test(message || '');
    const queryLower = (message || '').toLowerCase();

    let reply = '';
    if (isNe) {
      if (queryLower.includes('जीवन रेखा') || queryLower.includes('आयु')) {
        reply = 'जीवन रेखाले शारीरिक जीवन्तता, स्वास्थ्य र जीवनको ऊर्जा स्तरलाई संकेत गर्छ। यदि जीवन रेखा स्पष्ट, गहिरो र शुक्र पर्वतलाई राम्ररी घेरेको छ भने यसले उत्तम सहनशीलता र सकारात्मक जीवन ऊर्जा देखाउँछ। दैनिक ध्यान र स्वस्थ खानपानले ऊर्जालाई सन्तुलित राख्न सकिन्छ।';
      } else if (queryLower.includes('भाग्य रेखा') || queryLower.includes('करियर')) {
        reply = 'हस्तरेखा शास्त्रमा भाग्य रेखा (कर्म रेखा) हत्केलाको फेदबाट सुरु भएर शनि पर्वततर्फ अघि बढ्छ। यसले तपाईंको व्यक्तिगत प्रयास, समर्पण र कार्यक्षेत्रमा हुने प्रगतिको दिशा निर्धारण गर्छ। आफ्नै निर्णय र लगनशीलतामा विश्वास गर्दा तपाईंले २८ वर्षको उमेरपछि उल्लेखनीय सफलता प्राप्त गर्न सक्नुहुन्छ।';
      } else if (queryLower.includes('हृदय रेखा') || queryLower.includes('प्रेम') || queryLower.includes('विवाह')) {
        reply = 'हृदय रेखाले तपाईंको भावनात्मक संवेदनशीलता, आत्मीय सम्बन्ध र प्रेमप्रतिको दृष्टिकोण व्यक्त गर्छ। बृहस्पति र शनिको बीचमा पुग्ने हृदय रेखाले आदर्शवादी, विश्वासी र परिपक्व प्रेम सम्बन्धको संकेत गर्दछ।';
      } else {
        reply = 'नमस्ते! म Nyoria चिनाको सहायक हुँ। हस्तरेखा (जीवन रेखा, मस्तिष्क रेखा, हृदय रेखा, भाग्य रेखा), वैदिक कुण्डली (लग्न, राशि, नक्षत्र, दशा), वा दैनिक आध्यात्मिक शान्तिका बारेमा तपाईं कुनै पनि प्रश्न सोध्न सक्नुहुन्छ।';
      }
    } else {
      if (queryLower.includes('life line') || queryLower.includes('vitality')) {
        reply = 'The Life Line reflects physical vitality, stamina, and resilience rather than a fixed life span. A smoothly curved, deep line encircling the thumb mount indicates robust health, zest for living, and steady recuperative power.';
      } else if (queryLower.includes('career') || queryLower.includes('fate line')) {
        reply = 'The Fate Line (Karma Rekha) ascends toward the Mount of Saturn. A crisp, unbroken line highlights self-made ambition, professional purpose, and career milestones that consolidate after your mid-20s.';
      } else {
        reply = 'Greetings! I am your Nyoria चिना spiritual and astrological assistant. Feel free to ask about your palm lines (Life, Head, Heart, Fate), planetary positions, Kundali dashas, or traditional remedies.';
      }
    }

    // Deduct credit only on successful reply generation
    const deduction = store.checkAndDeductCredit(userId, 'ai_question');

    return NextResponse.json({
      success: true,
      data: {
        conversationId: `conv-${Date.now()}`,
        userMessage: { id: `msg-${Date.now()}-u`, text: message },
        assistantMessage: { id: `msg-${Date.now()}-a`, text: reply }
      },
      remainingCredits: deduction.remaining
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
