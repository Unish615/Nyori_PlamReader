'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Trash2, 
  Volume2, 
  Square, 
  Sparkles, 
  User, 
  HelpCircle,
  Radio
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function AssistantPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-gray-500">Loading Assistant...</div>}>
      <AssistantContent />
    </React.Suspense>
  );
}

function AssistantContent() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const isNe = language === 'ne';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message + handle pre-filled queries from Palm Reading page
  useEffect(() => {
    const initialWelcome: ChatMessage = {
      id: 'welcome-01',
      sender: 'assistant',
      text: isNe
        ? 'नमस्ते! म Nyoria चिना को आध्यात्मिक तथा ज्योतिषीय AI सहायक हुँ। हस्तरेखा, जन्मकुण्डली, विंशोत्तरी दशा वा दैनिक शान्ति उपायबारे केही सोध्न चाहनुहुन्छ?'
        : 'Greetings! I am your Nyoria चिना spiritual and astrological AI assistant. Feel free to ask about your palm lines, kundali charts, dashas, or traditional remedies.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialWelcome]);

    // Check if query was passed in URL (e.g. /assistant?q=...)
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setInputText(queryParam);
    }
  }, [isNe, searchParams]);

  // Setup Web Speech Recognition
  const toggleSpeechRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isNe ? 'तपाईंको ब्राउजरमा आवाज पहिचान समर्थन छैन। कृपया Chrome वा Edge प्रयोग गर्नुहोस्।' : 'Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = isNe ? 'ne-NP' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Read message out loud using Text-to-Speech
  const speakMessage = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const clean = text.replace(/[*_#]/g, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = isNe ? 'ne-NP' : 'en-US';
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Handle message sending
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('nyoria_token') || 'jwt-usr-demo-01'}`
        },
        body: JSON.stringify({
          message: text,
          language
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.data?.assistantMessage) {
        const reply: ChatMessage = {
          id: data.data.assistantMessage.id,
          sender: 'assistant',
          text: data.data.assistantMessage.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
        speakMessage(reply.text);
      } else {
        throw new Error('Fallback response needed');
      }
    } catch (err) {
      // Deterministic knowledge fallback
      let replyText = isNe
        ? 'तपाईंको प्रश्नका लागि धन्यवाद। वैदिक ज्योतिष तथा हस्तरेखा शास्त्र अनुसार शुभ कर्म, सकारात्मक चिन्तन र धैर्यले जीवनमा सदैव सुख र समृद्धि ल्याउँछ।'
        : 'Thank you for your question. Traditional wisdom emphasizes that conscious ethical actions, mindfulness, and patience align favorably with auspicious planetary influences.';

      const reply: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
      speakMessage(reply.text);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([]);
  };

  const sampleQuestions = [
    t.assistant.q1,
    t.assistant.q2,
    t.assistant.q3,
    t.assistant.q4
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-royal-600 to-gold-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-devanagari">
              {t.assistant.title}
            </h1>
            <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5 font-devanagari">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {isNe ? 'नेपाली तथा अङ्ग्रेजी आवाज सक्रिय' : 'Voice & Text Active'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/20"
            >
              <Square className="w-3.5 h-3.5" />
              <span>{isNe ? 'आवाज बन्द' : 'Stop Audio'}</span>
            </button>
          )}
          <button
            onClick={clearChat}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg border border-gray-200 dark:border-navy-800"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                isUser ? 'bg-royal-600 text-white' : 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-xs sm:text-sm font-devanagari leading-relaxed ${
                isUser
                  ? 'bg-royal-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 text-gray-800 dark:text-gray-100 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <div className="mt-2 flex items-center justify-between gap-4 text-[10px] opacity-70">
                  <span>{msg.time}</span>
                  {!isUser && (
                    <button
                      onClick={() => speakMessage(msg.text)}
                      className="hover:text-gold-400 flex items-center gap-1 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isNe ? 'सुन्नुहोस्' : 'Listen'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pl-11 font-devanagari">
            <Sparkles className="w-4 h-4 text-gold-500 animate-spin" />
            <span>{isNe ? 'AI ले विश्लेषण गर्दैछ...' : 'AI Assistant is thinking...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="py-2 overflow-x-auto flex gap-2">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-full bg-royal-600/10 dark:bg-navy-800 border border-royal-600/20 dark:border-navy-700 text-royal-700 dark:text-gold-300 text-xs whitespace-nowrap hover:bg-royal-600/20 transition-all font-devanagari"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Voice Status Indicator when recording */}
      {isListening && (
        <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold animate-pulse font-devanagari">
          <Radio className="w-4 h-4 animate-ping" />
          <span>{t.assistant.voiceActive} ({isNe ? 'नेपाली स्वर रेकर्ड हुँदै' : 'Listening in English'})</span>
        </div>
      )}

      {/* Input Form */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-navy-700 rounded-2xl p-2 shadow-lg focus-within:border-royal-500"
        >
          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:text-royal-600 dark:hover:text-gold-400'
            }`}
            title={isListening ? t.assistant.stopRecording : t.assistant.clickToSpeak}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.assistant.typePlaceholder}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none font-devanagari"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white disabled:opacity-40 transition-colors shadow-md"
            title={t.assistant.sendBtn}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
