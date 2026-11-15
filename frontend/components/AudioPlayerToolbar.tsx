'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Square, FastForward, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AudioPlayerToolbarProps {
  textToSpeak: string;
  title?: string;
  language?: 'en' | 'ne';
}

export function AudioPlayerToolbar({ textToSpeak, title, language: overrideLang }: AudioPlayerToolbarProps) {
  const { language: currentLang } = useLanguage();
  const effectiveLang = overrideLang || currentLang;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Find appropriate voice
        if (effectiveLang === 'ne') {
          const neVoice = voices.find(v => v.lang.startsWith('ne') || v.lang.startsWith('hi'));
          if (neVoice) setSelectedVoice(neVoice.name);
          else if (voices.length > 0) setSelectedVoice(voices[0].name);
        } else {
          const enVoice = voices.find(v => v.lang.startsWith('en'));
          if (enVoice) setSelectedVoice(enVoice.name);
          else if (voices.length > 0) setSelectedVoice(voices[0].name);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [effectiveLang]);

  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare clean text (strip markdown asterisks or symbols)
    const cleanText = textToSpeak
      .replace(/[#*_`]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = rate;
    utter.lang = effectiveLang === 'ne' ? 'ne-NP' : 'en-US';

    const chosen = availableVoices.find(v => v.name === selectedVoice);
    if (chosen) {
      utter.voice = chosen;
    }

    utter.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utter.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const cycleRate = () => {
    const rates = [0.85, 1.0, 1.25, 1.5];
    const currentIndex = rates.indexOf(rate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setRate(nextRate);
    if (isPlaying && utteranceRef.current) {
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-royal-600/10 dark:bg-navy-800/80 border border-royal-600/20 dark:border-navy-700 rounded-xl text-xs backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg ${isPlaying ? 'bg-gold-500 text-navy-900 animate-pulse' : 'bg-royal-600 text-white'}`}>
          <Volume2 className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {title || (effectiveLang === 'ne' ? 'वाचन सुन्नुहोस् (TTS)' : 'Audio Reader (TTS)')}
          </span>
          <span className="block text-[10px] text-gray-500 dark:text-gray-400">
            {effectiveLang === 'ne' ? 'नेपाली उच्चारण सहित' : 'Clear English pronunciation'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Play/Pause Button */}
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-royal-600 hover:bg-royal-700 text-white rounded-lg font-medium shadow-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPaused ? (effectiveLang === 'ne' ? 'पुनः सुरु' : 'Resume') : (effectiveLang === 'ne' ? 'सुन्नुहोस्' : 'Play')}</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium shadow-sm transition-colors"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>{effectiveLang === 'ne' ? 'रोक्नुहोस्' : 'Pause'}</span>
          </button>
        )}

        {/* Stop Button */}
        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="p-1.5 rounded-lg border border-gray-300 dark:border-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 disabled:opacity-40 transition-colors"
          title="Stop"
        >
          <Square className="w-3.5 h-3.5" />
        </button>

        {/* Speed Multiplier Button */}
        <button
          onClick={cycleRate}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-navy-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-700 font-mono text-[11px]"
          title="Playback Speed"
        >
          <FastForward className="w-3 h-3 text-gold-500" />
          <span>{rate}x</span>
        </button>
      </div>
    </div>
  );
}
