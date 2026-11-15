import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env.js';
import { store, ChatConversationRecord, ChatMessageRecord } from './store.js';

export class AssistantService {
  static async handleChat(params: {
    userId?: string;
    conversationId?: string;
    message: string;
    language?: 'en' | 'ne';
  }) {
    const effectiveUserId = params.userId || 'usr-demo-01';
    let conversationId = params.conversationId;

    if (!conversationId || !store.chatConversations.has(conversationId)) {
      conversationId = `conv-${Date.now()}`;
      const title = params.message.slice(0, 30) + '...';
      const conv: ChatConversationRecord = {
        id: conversationId,
        userId: effectiveUserId,
        title,
        language: params.language || 'ne',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.chatConversations.set(conversationId, conv);
      store.chatMessages.set(conversationId, []);
    }

    const messages = store.chatMessages.get(conversationId) || [];

    // Record user message
    const userMsg: ChatMessageRecord = {
      id: `msg-${Date.now()}-u`,
      conversationId,
      sender: 'user',
      text: params.message,
      createdAt: new Date().toISOString()
    };
    messages.push(userMsg);

    // Generate AI response
    let assistantReply = '';
    const isNepali = params.language === 'ne' || /[\u0900-\u097F]/.test(params.message);

    if (ENV.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const systemPrompt = `
You are the spiritual and scientific AI Assistant for "Nyoria चिना" (AI Palm Reading & Vedic Kundali Platform).
You are an expert in Vedic Astrology (वैदिक ज्योतिष), Palmistry (हस्तरेखा शास्त्र), Kundali interpretation, and spiritual guidance.
Always maintain a respectful, compassionate, culturally authentic tone.
Clarify that traditional interpretations serve for self-awareness and spiritual reflection rather than rigid fatalism.
Reply in ${isNepali ? 'Nepali (नेपाली)' : 'English'}, matching the user's language smoothly.
`;
        const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${params.message}`);
        assistantReply = result.response.text();
      } catch (err) {
        console.error('Gemini chat error:', err);
      }
    }

    if (!assistantReply) {
      // Deterministic intelligent knowledge-base response
      const queryLower = params.message.toLowerCase();
      if (isNepali) {
        if (queryLower.includes('जीवन रेखा') || queryLower.includes('आयु')) {
          assistantReply = 'जीवन रेखाले शारीरिक जीवन्तता, स्वास्थ्य र जीवनको ऊर्जा स्तरलाई संकेत गर्छ। यदि जीवन रेखा स्पष्ट, गहिरो र शुक्र पर्वतलाई राम्ररी घेरेको छ भने यसले उत्तम सहनशीलता र सकारात्मक जीवन ऊर्जा देखाउँछ। कुनै आकस्मिक रेखा वा अवरोध आएमा दैनिक ध्यान र स्वस्थ खानपानले ऊर्जालाई सन्तुलित राख्न सकिन्छ।';
        } else if (queryLower.includes('भाग्य रेखा') || queryLower.includes('करियर')) {
          assistantReply = 'हस्तरेखा शास्त्रमा भाग्य रेखा (कर्म रेखा) हत्केलाको फेदबाट सुरु भएर शनि पर्वततर्फ अघि बढ्छ। यसले तपाईंको व्यक्तिगत प्रयास, समर्पण र कार्यक्षेत्रमा हुने प्रगतिको दिशा निर्धारण गर्छ। आफ्नै निर्णय र लगनशीलतामा विश्वास गर्दा तपाईंले २८ वर्षको उमेरपछि उल्लेखनीय सफलता प्राप्त गर्न सक्नुहुन्छ।';
        } else if (queryLower.includes('हृदय रेखा') || queryLower.includes('प्रेम') || queryLower.includes('विवाह')) {
          assistantReply = 'हृदय रेखाले तपाईंको भावनात्मक संवेदनशीलता, आत्मीय सम्बन्ध र प्रेमप्रतिको दृष्टिकोण व्यक्त गर्छ। बृहस्पति र शनिको बीचमा पुग्ने हृदय रेखाले आदर्शवादी, विश्वासी र परिपक्व प्रेम सम्बन्धको संकेत गर्दछ।';
        } else if (queryLower.includes('कुण्डली') || queryLower.includes('लग्न') || queryLower.includes('राशि')) {
          assistantReply = 'कुण्डलीमा लग्नले तपाईंको बाह्य व्यक्तित्व र शारीरिक बनावटलाई जनाउँछ भने चन्द्र राशिले तपाईंको मानसिक अवस्था, विचार र भावनाको प्रतिनिधित्व गर्छ। तपाईं हाम्रो "मेरो कुण्डली" पृष्ठमा गएर जन्म विवरण राखी आफ्नो सम्पूर्ण १२ भाव, नवमांश र दशाको विस्तृत व्याख्या हेर्न सक्नुहुन्छ।';
        } else {
          assistantReply = `नमस्ते! म Nyoria चिनाको सहायक हुँ। हस्तरेखा (जीवन रेखा, मस्तिष्क रेखा, हृदय रेखा, भाग्य रेखा), वैदिक कुण्डली (लग्न, राशि, नक्षत्र, दशा), वा दैनिक आध्यात्मिक शान्तिका बारेमा तपाईं कुनै पनि प्रश्न सोध्न सक्नुहुन्छ।`;
        }
      } else {
        if (queryLower.includes('life line') || queryLower.includes('vitality')) {
          assistantReply = 'The Life Line reflects physical vitality, stamina, and resilience rather than a fixed life span. A smoothly curved, deep line encircling the thumb mount indicates robust health, zest for living, and steady recuperative power.';
        } else if (queryLower.includes('career') || queryLower.includes('fate line')) {
          assistantReply = 'The Fate Line (Karma Rekha) ascends toward the Mount of Saturn. A crisp, unbroken line highlights self-made ambition, professional purpose, and career milestones that consolidate after your mid-20s.';
        } else if (queryLower.includes('heart line') || queryLower.includes('love') || queryLower.includes('marriage')) {
          assistantReply = 'The Heart Line governs emotional openness, loyalty, and empathy. When it curves gently toward the Jupiter mount, it denotes thoughtful affection, integrity in romantic bonds, and high emotional standards.';
        } else if (queryLower.includes('kundali') || queryLower.includes('chart') || queryLower.includes('lagna')) {
          assistantReply = 'In Vedic astrology, your Lagna (Ascendant) represents physical demeanor and life approach, while your Rashi (Moon sign) reflects emotional constitution and mental reflexes. You can generate your full Vedic chart on our "My Kundali" page!';
        } else {
          assistantReply = `Greetings! I am your Nyoria चिना spiritual and astrological assistant. Feel free to ask about your palm lines (Life, Head, Heart, Fate), planetary positions, Kundali dashas, or traditional remedies.`;
        }
      }
    }

    const assistantMsg: ChatMessageRecord = {
      id: `msg-${Date.now()}-a`,
      conversationId,
      sender: 'assistant',
      text: assistantReply,
      createdAt: new Date().toISOString()
    };
    messages.push(assistantMsg);
    store.chatMessages.set(conversationId, messages);

    const conv = store.chatConversations.get(conversationId)!;
    conv.updatedAt = new Date().toISOString();

    return {
      conversationId,
      userMessage: userMsg,
      assistantMessage: assistantMsg
    };
  }

  static getConversations(userId: string) {
    return Array.from(store.chatConversations.values())
      .filter(c => c.userId === userId || userId === 'usr-demo-01')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static getMessages(conversationId: string) {
    return store.chatMessages.get(conversationId) || [];
  }
}
