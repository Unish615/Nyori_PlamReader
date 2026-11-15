import { checkImageQuality, analyzePalmWithAI, generateTraditionalPalmReading, PalmAnalysisOutput } from '../utils/palmAnalyzer.js';
import { store, PalmRecord } from './store.js';

export class PalmService {
  static async processPalmReading(params: {
    userId?: string;
    handType: 'left' | 'right';
    imageBuffer: Buffer;
    mimeType: string;
    fileName?: string;
  }) {
    // 1. Verify quality
    const quality = checkImageQuality(params.imageBuffer, params.mimeType);
    if (!quality.isAcceptable) {
      return {
        success: false,
        quality,
        reading: null
      };
    }

    // 2. Perform AI / Traditional Palm Analysis
    const base64Data = params.imageBuffer.toString('base64');
    const analysis: PalmAnalysisOutput = await analyzePalmWithAI(base64Data, params.mimeType, params.handType);

    const reportId = `plm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const effectiveUserId = params.userId || 'usr-demo-01';
    const simulatedImageUrl = `data:${params.mimeType};base64,${base64Data}`;

    const record: PalmRecord = {
      id: reportId,
      userId: effectiveUserId,
      handType: params.handType,
      imageUrl: simulatedImageUrl,
      qualityStatus: quality.status,
      analysis,
      createdAt: new Date().toISOString()
    };

    store.palmReadings.set(reportId, record);
    store.logActivity(effectiveUserId, 'PALM_READING_ANALYZED', { reportId, handType: params.handType });

    return {
      success: true,
      quality,
      reading: record
    };
  }

  static getHistory(userId: string) {
    const records = Array.from(store.palmReadings.values())
      .filter(r => r.userId === userId || userId === 'usr-demo-01')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return records;
  }

  static getById(id: string) {
    const record = store.palmReadings.get(id);
    if (!record) {
      // Return a synthesized sample if not found
      const fallbackAnalysis = generateTraditionalPalmReading('right');
      return {
        id,
        userId: 'usr-demo-01',
        handType: 'right' as const,
        imageUrl: '/images/palm-demo.svg',
        qualityStatus: 'verified',
        analysis: fallbackAnalysis,
        createdAt: new Date().toISOString()
      };
    }
    return record;
  }

  static delete(id: string, userId: string) {
    const record = store.palmReadings.get(id);
    if (!record) return false;
    store.palmReadings.delete(id);
    store.logActivity(userId, 'PALM_READING_DELETED', { reportId: id });
    return true;
  }
}
