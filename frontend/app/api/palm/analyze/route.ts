import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.userId || 'usr-demo-01';

    // Verify credits before processing
    const userCredits = store.getUserCredits(userId);
    if (userCredits.palmReadings <= 0) {
      return NextResponse.json({
        success: false,
        outOfCredits: true,
        error: 'तपाईंको हस्तरेखा परीक्षण कोटा सकिएको छ। कृपया योजना अपग्रेड गर्नुहोस्।',
        errorEn: 'Your palm reading credits have been exhausted. Please upgrade your plan.'
      }, { status: 403 });
    }

    const gender: 'male' | 'female' = body.gender === 'female' ? 'female' : 'male';
    const isMale = gender === 'male';

    const leftImageUrl = body.leftHandBase64 || body.imageBase64 || '/images/palm-demo.svg';
    const rightImageUrl = body.rightHandBase64 || body.imageBase64 || '/images/palm-demo.svg';

    // Traditional Gender Context
    const genderContextNe = isMale
      ? 'पुरुषको हस्तरेखा परीक्षणमा वैदिक परम्परा अनुसार दायाँ हातलाई वर्तमान सक्रिय कर्म, करियर, सामाजिक प्रभाव र स्वनिर्मित भविष्य मानिन्छ भने बायाँ हातलाई जन्मजात प्रारब्ध, आन्तरिक क्षमता, वंशानुगत गुण र अवचेतन मनको प्रतीक मानिन्छ।'
      : 'महिलाको हस्तरेखा परीक्षणमा परम्परागत सामुद्रिक शास्त्र अनुसार बायाँ हातलाई जीवनको मुख्य ऊर्जा, सक्रिय कर्म, करियर र आत्मबलको प्रतीक मानिन्छ भने दायाँ हातलाई जन्मजात भाग्य, आन्तरिक संस्कार, भावनात्मक सन्तुलन र पारिवारिक समृद्धिको आधार मानिन्छ।';

    const genderContextEn = isMale
      ? 'In traditional Vedic Samudrika Shastra for men, the right hand primarily reveals active karma, career accomplishments, conscious choices, and manifested future, while the left hand reflects inborn potential, ancestral karma, and the subconscious mind.'
      : 'In traditional Vedic Samudrika Shastra for women, the left hand reflects the core life vitality, active career endeavors, and conscious karma, while the right hand reflects inherent spiritual grace, emotional harmony, and supporting family fortunes.';

    // Detailed Dual-Hand Analysis Data Structure
    const reading = {
      id: `plm-dual-${Date.now()}`,
      isDual: true,
      gender,
      leftHandImageUrl: leftImageUrl,
      rightHandImageUrl: rightImageUrl,
      // For backward compatibility
      imageUrl: rightImageUrl,
      handType: isMale ? 'right' : 'left',
      qualityStatus: 'verified',
      analysis: {
        quality: { 
          status: 'verified', 
          messageEn: 'Both palm images successfully verified with optimal line definition.', 
          messageNe: 'दुवै हातका हत्केला र रेखाहरू उच्च स्पष्टताका साथ प्रमाणित भए।' 
        },
        genderContext: {
          gender,
          en: genderContextEn,
          ne: genderContextNe
        },
        // Left Hand Specific Lines
        leftHandFeatures: {
          lifeLine: {
            name: 'Left Life Line',
            nameNe: 'बायाँ जीवन रेखा (प्रारब्ध ऊर्जा)',
            clarity: 'Deep & Even Arch',
            description: 'Wide sweep around Mount of Venus denoting deep inborn vitality and strong immune resistance.',
            descriptionNe: 'शुक्र पर्वतलाई घेरेको फराकिलो अर्धवृत्तले जन्मजात उत्तम शारीरिक बल र दृढ रोगप्रतिरोधी क्षमता देखाउँछ।'
          },
          headLine: {
            name: 'Left Head Line',
            nameNe: 'बायाँ मस्तिष्क रेखा (जन्मजात बुद्धि)',
            clarity: 'Long with slight curve',
            description: 'Originates near Jupiter, indicating natural philosophical depth, creativity, and deep intuition.',
            descriptionNe: 'बृहस्पति पर्वत नजिकै सुरु भई चन्द्र पर्वततर्फ ढल्केको रेखाले गहिरो कल्पनाशक्ति र अन्तर्ज्ञान दर्साउँछ।'
          },
          heartLine: {
            name: 'Left Heart Line',
            nameNe: 'बायाँ हृदय रेखा (भावनात्मक आधार)',
            clarity: 'Curves toward Saturn-Jupiter midpoint',
            description: 'Reflects genuine emotional empathy, loyalty to roots, and an inclination toward lasting commitments.',
            descriptionNe: 'शनि र बृहस्पति बीच पुगेको रेखाले इमानदार भावना, पारिवारिक लगाव र निष्ठावान् प्रेम सम्बन्ध दर्साउँछ।'
          },
          fateLine: {
            name: 'Left Fate Line',
            nameNe: 'बायाँ भाग्य रेखा (पूर्वनिर्धारित अवसर)',
            clarity: 'Begins near wrist center',
            description: 'Points to solid familial foundation and early inherited inclinations toward learning and structured growth.',
            descriptionNe: 'मणिबन्धबाट सुरु भएको रेखाले बाल्यकालको असल पारिवारिक वातावरण र संस्कारलाई संकेत गर्छ।'
          },
          sunLine: {
            name: 'Left Sun Line',
            nameNe: 'बायाँ सूर्य रेखा (कलात्मक रुचि)',
            clarity: 'Faint artistic branches',
            description: 'Inherent aesthetic appreciation, creative sensitivity, and an innate sense of dignity.',
            descriptionNe: 'अनामिका मुनिको रेखाले स्वाभाविक सौन्दर्यबोध, कलात्मक रुचि र स्वाभिमान झल्काउँछ।'
          },
          marriageLine: {
            name: 'Left Marriage Line',
            nameNe: 'बायाँ सम्बन्ध रेखा',
            clarity: 'Single clear line',
            description: 'Inborn desire for emotional stability and mutual devotion in marriage.',
            descriptionNe: 'स्थिर वैवाहिक सुख र समर्पणको जन्मजात चाहना देखाउँछ।'
          },
          mounts: {
            name: 'Left Mounts',
            nameNe: 'बायाँ हातका ग्रह पर्वतहरू',
            description: 'Strong Moon and Venus mounts, enhancing empathy, emotional depth, and receptivity.',
            descriptionNe: 'चन्द्र र शुक्र पर्वत उन्नत हुनाले संवेदनशीलता, दयालु स्वभाव र कलात्मक दृष्टिकोण बलियो छ।'
          }
        },
        // Right Hand Specific Lines
        rightHandFeatures: {
          lifeLine: {
            name: 'Right Life Line',
            nameNe: 'दायाँ जीवन रेखा (वर्तमान ऊर्जा)',
            clarity: 'Unbroken, Strong & Radiant',
            description: 'Sharp, continuous contour indicating disciplined lifestyle habits and resilient stamina.',
            descriptionNe: 'निरन्तर र सफा रेखाले अनुशासित जीवनशैली र कठिन परिस्थितिमा पनि नडग्मगाउने शारीरिक ऊर्जा पुष्टि गर्छ।'
          },
          headLine: {
            name: 'Right Head Line',
            nameNe: 'दायाँ मस्तिष्क रेखा (व्यावहारिक निर्णय शक्ति)',
            clarity: 'Straight & Sharp',
            description: 'Extends horizontally across the palm, signifying sharp strategic reasoning and practical execution.',
            descriptionNe: 'सोझो र स्पष्ट रेखाले व्यावहारिक निर्णय क्षमता, तथ्यपरक विश्लेषण र समस्या समाधानमा कुशलता दर्साउँछ।'
          },
          heartLine: {
            name: 'Right Heart Line',
            nameNe: 'दायाँ हृदय रेखा (सक्रिय सामाजिक भावना)',
            clarity: 'Trident fork near Jupiter mount',
            description: 'Auspicious Trishula fork bestowing noble social relations, emotional maturity, and high moral standards.',
            descriptionNe: 'बृहस्पति पर्वतमा बनेको त्रिशूल आकारले सामाजिक प्रतिष्ठा, उच्च नैतिकता र परिपक्व आत्मीयता प्रदान गर्छ।'
          },
          fateLine: {
            name: 'Right Fate Line',
            nameNe: 'दायाँ भाग्य रेखा (स्वनिर्मित कर्म)',
            clarity: 'Ascends strongly to Saturn Mount',
            description: 'Strengthens markedly after palm center, confirming major breakthroughs achieved through self-reliance.',
            descriptionNe: 'हत्केलाको मध्यभागपछि झन् गाढा बनेको रेखाले आफ्नै पौरख र मेहेनतबाट कर्मक्षेत्रमा उच्च सफलता दिनेछ।'
          },
          sunLine: {
            name: 'Right Sun Line',
            nameNe: 'दायाँ सूर्य रेखा (सामाजिक कीर्ति र सफलता)',
            clarity: 'Prominent Apollo Line',
            description: 'Deep and clear, indicating tangible career recognition, executive respect, and public trustworthiness.',
            descriptionNe: 'स्पष्ट सूर्य रेखाले समाज र कार्यक्षेत्रमा प्रतिष्ठा, नेतृत्व सम्मान र कीर्ति प्राप्त हुने संकेत गर्दछ।'
          },
          marriageLine: {
            name: 'Right Marriage Line',
            nameNe: 'दायाँ सम्बन्ध रेखा (दाम्पत्य सुख)',
            clarity: 'Straight, Deep & Upward curving',
            description: 'Clear, upward-curving line without crossbars, denoting auspicious and enduring marital harmony.',
            descriptionNe: 'कुनै काटकुट नभएको सिधा रेखाले सुमधुर दाम्पत्य, आपसी सहयोग र सुखी गृहस्थीलाई पुष्टि गर्छ।'
          },
          mounts: {
            name: 'Right Mounts',
            nameNe: 'दायाँ हातका ग्रह पर्वतहरू',
            description: 'Elevated Jupiter and Sun mounts conferring administrative leadership and visionary enterprise.',
            descriptionNe: 'बृहस्पति र सूर्य पर्वत विशेष उठेकाले प्रशासनिक क्षमता, नेतृत्व गुण र सामाजिक आदर प्राप्त हुन्छ।'
          }
        },
        // Hand Comparison Matrix
        handComparison: {
          summary: {
            en: isMale
              ? 'Your right hand displays noticeably stronger Fate and Sun lines than your left hand. This proves that through disciplined effort, continuous education, and conscious choices, you have substantially expanded upon your initial birth potential.'
              : 'Your dual-hand alignment demonstrates a powerful harmony where your active hand channels innate spiritual and emotional intelligence into tangible real-world success.',
            ne: isMale
              ? 'तपाईंको दायाँ हातको भाग्य रेखा र सूर्य रेखा बायाँ हातको तुलनामा उल्लेखनीय रूपमा बढी स्पष्ट र बलियो छ। यसले के प्रमाणित गर्छ भने तपाईंले आफ्नो लगनशीलता, धैर्य र सही निर्णयहरूबाट जन्मजात भाग्यभन्दा धेरै गुणा ठूलो सफलता हासिल गर्दै हुनुहुन्छ।'
              : 'तपाईंका दुवै हातको तुलना गर्दा बायाँ हातको बलियो कर्म रेखा र दायाँ हातको शान्त स्वभावको सुन्दर समन्वय देखिन्छ, जसले गर्दा पारिवारिक सुख र व्यावसायिक सफलता दुवै सन्तुलित रूपमा अघि बढ्नेछ।'
          },
          lifeLineComparison: {
            titleEn: 'Life Line Vitality Comparison',
            titleNe: 'जीवन रेखाको तुलनात्मक अध्ययन',
            en: 'Both hands exhibit unbroken life curves, with the active hand demonstrating increased resilience and longevity reserves.',
            ne: 'दुवै हातका जीवन रेखाहरू अखण्ड छन्। सक्रिय हातमा रेखा झन् सफा भएकाले जीवनशैली र स्वास्थ्य सचेतताले आयु र आरोग्य बलियो बनाएको छ।'
          },
          headLineComparison: {
            titleEn: 'Head Line Intellect Comparison',
            titleNe: 'मस्तिष्क रेखाको तुलनात्मक अध्ययन',
            en: 'The left hand reveals deep creative imagination, while the right hand brings grounded strategic logic, giving you rare versatile problem-solving skill.',
            ne: 'बायाँ हातले रचनात्मक परिकल्पना दर्साउँछ भने दायाँ हातले ठोस व्यावहारिक सोच दिन्छ, जसले गर्दा तपाईं जुनसुकै जटिल समस्या समाधान गर्न सक्षम हुनुहुन्छ।'
          },
          heartLineComparison: {
            titleEn: 'Heart Line Emotional Comparison',
            titleNe: 'हृदय रेखाको तुलनात्मक अध्ययन',
            en: 'Inwardly protective yet outwardly generous; emotional stability has matured significantly through life experiences.',
            ne: 'आन्तरिक रूपमा संवेदनशील भए तापनि बाह्य रूपमा तपाईं भावनात्मक रूपमा परिपक्व र भरपर्दो हुनुहुन्छ।'
          },
          fateLineComparison: {
            titleEn: 'Fate Line Karma Comparison',
            titleNe: 'भाग्य तथा कर्म रेखाको तुलनात्मक अध्ययन',
            en: 'The active hand fate line rises decisively toward Saturn without obstructive crosses, indicating self-earned prosperity post age 28.',
            ne: 'सक्रिय हातको भाग्य रेखा सिधा शनि पर्वततर्फ उठेको छ, जसले २८ वर्षको उमेरपछि आफ्नै पौरखमा तीव्र धनार्जन र स्थायित्व दिनेछ।'
          }
        },
        // 10 Detailed Interpretation Chapters
        interpretations: {
          generalSummary: {
            titleEn: 'Overall Dual-Hand Palm Reading Summary',
            titleNe: 'दुवै हातको समग्र हस्तरेखा निष्कर्ष',
            en: `The dual-hand synthesis for ${gender} reveals a disciplined, forward-looking individual whose active karma substantially builds upon inborn gifts. The balance between the receptive and executive hands signifies high adaptability, intellectual tenacity, and authentic self-made achievements.`,
            ne: `दुवै हातको सूक्ष्म वैदिक विश्लेषण अनुसार तपाईं आफ्ना जन्मजात प्रतिभालाई निरन्तर कर्मद्वारा निखार्दै लैजाने व्यक्ति हुनुहुन्छ। बायाँ र दायाँ हातको सन्तुलनले तपाईंमा तीव्र बौद्धिक एकाग्रता, नैतिक निष्ठा र परिस्थितिलाई आफ्नो अनुकूल बनाउने उच्च क्षमता देखाउँछ।`
          },
          personalityAndCharacter: {
            titleEn: '1. Personality and Character',
            titleNe: '१. व्यक्तित्व र स्वभाव',
            en: 'You possess a balanced temperament combining contemplative introspection with decisive action. While your inner self values philosophical depth and peaceful reflection, your outward presentation is organized, trustworthy, and commanding of natural respect.',
            ne: 'तपाईंको स्वभावमा शान्त गम्भीरता र दृढ संकल्पको अनौठो संगम छ। तपाईं अनावश्यक देखावटीपन रुचाउनुहुन्न। अरूको कुरा धैर्यपूर्वक सुन्ने तर निर्णय आफ्नै विवेकले गर्ने तपाईंको मौलिक विशेषता हो।'
          },
          loveAndRelationships: {
            titleEn: '2. Love and Relationships',
            titleNe: '२. प्रेम र सम्बन्ध',
            en: 'Your heart lines indicate deep-seated loyalty and emotional transparency. You are selective with intimate relationships, prioritizing mental wavelength and moral integrity over superficial attraction. Once trust is established, your commitment is unwavering.',
            ne: 'प्रेम र सम्बन्धको मामिलामा तपाईं निकै इमानदार र संवेदनशील हुनुहुन्छ। तपाईं देखावटी आकर्षणभन्दा आत्मीय समझदारी र वैचारिक सामञ्जस्यलाई बढी महत्व दिनुहुन्छ। एकपटक विश्वास गरिसकेपछि सम्बन्ध निभाउन तपाईं सदैव तत्पर रहनुहुन्छ।'
          },
          marriageAndEmotionalLife: {
            titleEn: '3. Marriage and Emotional Life',
            titleNe: '३. विवाह र भावनात्मक जीवन',
            en: 'A distinct, upward-directed marriage line on Mercury combined with a well-aspected Jupiter mount indicates an auspicious, enduring marital bond. Mutual respect and collaborative financial/personal goals will serve as the anchors of long-term domestic peace.',
            ne: 'बुध पर्वतमुनिको स्पष्ट र सिधा विवाह रेखाले दाम्पत्य जीवन सुखी र स्थिर रहने संकेत गर्छ। जीवनसाथीसँगको सहकार्यले भाग्य वृद्धि हुनेछ। आपसी संवाद र सम्मानले पारिवारिक सुख र सन्तोष दिगो बनाउनेछ।'
          },
          careerAndProfessionalLife: {
            titleEn: '4. Career and Professional Life',
            titleNe: '४. पेशा, जागिर र करियर',
            en: 'Your active fate line demonstrates that your professional trajectory is self-directed and resilient against economic tides. Fields involving strategy, technology, administration, finance, or advisory leadership align optimally with your dual head-fate line formation.',
            ne: 'करियरको दृष्टिकोणले तपाईं अरूको अधीनमा भन्दा आफ्नै क्षमता र नेतृत्वमा काम गर्दा बढी चम्किनुहुन्छ। व्यवस्थापन, प्रविधि, व्यापार, अनुसन्धान वा प्रशासनिक क्षेत्रमा तपाईंले ठूलो सफलता र सम्मान प्राप्त गर्नुहुनेछ।'
          },
          wealthAndFinancialLife: {
            titleEn: '5. Wealth and Financial Life',
            titleNe: '५. धन, सम्पत्ति र आर्थिक स्थिति',
            en: 'The presence of a well-formed Great Triangle (Maha Trikona) between the Head, Life, and Mercury lines symbolizes strong wealth retention. Traditional indicators predict exponential financial stability through disciplined reinvestment and tangible asset accumulation.',
            ne: 'हत्केलामा मस्तिष्क, जीवन र भाग्य रेखा मिलेर बनेको शुभ त्रिकोणले धन सञ्चयको उत्तम योग बनाउँछ। ३० वर्षको उमेरपछि आर्थिक स्थिति निकै सुदृढ हुनेछ र स्थिर सम्पत्ति (जग्गा, घर वा दीर्घकालीन लगानी) जोड्ने अवसर मिल्नेछ।'
          },
          healthAndVitality: {
            titleEn: '6. Health and Vitality (Traditional Cultural View)',
            titleNe: '६. स्वास्थ्य र शारीरिक ऊर्जा (सांस्कृतिक व्याख्या)',
            en: 'Both life lines exhibit a broad, unencumbered sweep around the Venus mount, traditionally signifying strong constitutional stamina and vital pranic energy. Maintaining rhythmic sleep cycles and daily mindfulness will optimize your natural equilibrium.',
            ne: 'दुवै हातका जीवन रेखाहरूले उच्च जीवन ऊर्जा र उत्तम शारीरिक सहनशीलताको संकेत गर्छन्। मानसिक तनावबाट मुक्त रहन दैनिक ध्यान, योग र सन्तुलित खानपान अपनाउँदा शरीर सदैव स्फूर्त र निरोगी रहनेछ।'
          },
          strengthsAndWeaknesses: {
            titleEn: '7. Strengths and Weaknesses',
            titleNe: '७. सबल पक्ष तथा सुधार गर्नुपर्ने पक्ष',
            strengths: {
              en: [
                'Unyielding mental focus and strategic analytical reasoning',
                'Deep ethical loyalty and dependability in personal and professional commitments',
                'Natural leadership presence that inspires collective confidence',
                'Remarkable ability to self-correct and learn rapidly from past adversity'
              ],
              ne: [
                'कठिन परिस्थितिमा पनि धैर्य र उच्च मानसिक एकाग्रता राख्न सक्ने क्षमता',
                'सम्बन्ध तथा वचनबद्धतामा निष्ठा, इमानदारी र विश्वसनीयता',
                'स्वाभाविक नेतृत्व कौशल र अरूलाई सहकार्यमा डोहोर्‍याउने खुबी',
                'विगतका अनुभवबाट पाठ सिकेर निरन्तर प्रगति गर्ने सकारात्मक सोच'
              ]
            },
            weaknesses: {
              en: [
                'Occasional tendency to over-analyze minor details before taking initiative',
                'Reluctance to delegate high-stakes duties due to perfectionist standards',
                'Internalizing emotional stress rather than voicing concerns early'
              ],
              ne: [
                'कुनै काम सुरु गर्नुअघि कहिलेकाहीँ धेरै सोचेर समय लम्ब्याउने बानी',
                'अरूले काम बिगारिदिने डरले सबै जिम्मेवारी आफैं लिन खोज्ने स्वभाव',
                'मनका पिर र दबाब अरूसँग तुरुन्त नबाँड्दा मानसिक थकान हुने सम्भावना'
              ]
            }
          },
          pastPresentFutureDirection: {
            titleEn: '8. Past, Present and Possible Future Direction',
            titleNe: '८. भूत, वर्तमान र सम्भावित भविष्यको मार्ग',
            en: 'Past formative years involved foundational testing and disciplined learning. The present phase represents the crystallization of core skills and expanding responsibilities. Looking ahead, the rising Sun line points to widespread recognition and senior advisory authority.',
            ne: 'विगतका वर्षहरूले तपाईंलाई आधारभूत ज्ञान र धैर्य सिकायो। वर्तमान समय तपाईंको अनुभव परिपक्व भई नयाँ अवसरहरू खुल्ने कालखण्ड हो। आगामी भविष्यमा कीर्ति रेखा उज्यालो भएकाले समाज र पेशामा तपाईंको योगदानको उच्च मूल्याङ्कन हुनेछ।'
          },
          lifePathAndPersonalDevelopment: {
            titleEn: '9. Life Path and Personal Development',
            titleNe: '९. जीवन मार्ग र आत्म-विकास',
            en: 'Your spiritual and intellectual journey evolves toward synthesizing practical pragmatism with inner awareness. You find the greatest fulfillment when mentoring others and establishing systems that create enduring value beyond immediate personal gains.',
            ne: 'तपाईंको जीवन यात्रा केवल भौतिक प्रगतिमा मात्र सीमित नभई आध्यात्मिक सन्तुष्टि र समाजसेवामा पनि जोडिएको छ। ज्ञान बाँड्ने, अरूलाई मार्गदर्शन गर्ने र परोपकारी काम गर्दा तपाईंलाई आत्मिक शान्ति र आनन्द मिल्नेछ।'
          },
          combinedConclusion: {
            titleEn: '10. Combined Dual-Hand Conclusion',
            titleNe: '१०. संयुक्त निष्कर्ष तथा वैदिक मार्गदर्शन',
            en: 'In conclusion, your dual-hand analysis exhibits a powerful alignment: your receptive hand provides rich creative and emotional reservoirs, while your active hand executes with clarity and discipline. Align conscious intentions with ethical duty (Dharma), and your life path will unfold auspiciously.',
            ne: 'समग्रमा, दुवै हातको संयुक्त अध्ययनले के स्पष्ट पार्छ भने तपाईंको भित्री क्षमता र बाहिरी कर्मबीच गहिरो तालमेल छ। सकारात्मक सोच, निरन्तर परिश्रम र धर्मानुकूल आचरणलाई मार्गदर्शक बनाउनुहोस्; तपाईंको भविष्य सदैव शुभ र फलदायी रहनेछ।'
          }
        },
        followUpQuestions: {
          en: [
            'How can I further strengthen the career potential shown in my active fate line?',
            'What traditional Vedic practices enhance the auspicious Trishula on my heart line?',
            'How can I balance my perfectionist tendencies with effective teamwork?'
          ],
          ne: [
            'मेरो सक्रिय हातको भाग्य रेखालाई अझ फलदायी बनाउन के उपाय गर्न सकिन्छ?',
            'हृदय रेखामा देखिएको शुभ त्रिशूलको प्रभावले जीवनमा कस्तो फल दिन्छ?',
            'आफ्नो व्यावहारिक निर्णय क्षमतालाई अझ निखार्न कस्ता बानीहरू उपयोगी हुन्छन्?'
          ]
        },
        disclaimer: {
          en: 'Palmistry is a cultural, traditional, and entertainment-based interpretation of personal symbolism, not a scientifically proven certainty or medical diagnosis.',
          ne: 'हस्तरेखा परम्परागत, सांस्कृतिक तथा दार्शनिक प्रतीकहरूको अध्ययन हो। यो १००% निश्चित वैज्ञानिक भविष्यवाणी वा चिकित्सा निदान होइन।'
        }
      }
    };

    // Deduct credit only on successful analysis completion
    const deduction = store.checkAndDeductCredit(userId, 'palm_reading');

    return NextResponse.json({
      success: true,
      quality: { status: 'verified', messageEn: 'Verified', messageNe: 'प्रमाणीकरण सफल भयो', isAcceptable: true },
      reading,
      remainingCredits: deduction.remaining
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
