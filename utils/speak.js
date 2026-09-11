// utils/speak.js

let audioCache = new Map();
let currentAudio = null;
let isPlaying = false;

export async function speak(text, dialect = 'msa') {
  if (typeof window === 'undefined') return;
  if (!text || !text.trim()) return;

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  // Stop and clean up current audio
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentAudio.src && currentAudio.src.startsWith('blob:')) {
        URL.revokeObjectURL(currentAudio.src);
      }
    } catch (e) { /* ignore */ }
    currentAudio = null;
  }

  // Prevent overlapping requests
  if (isPlaying) {
    console.warn('Already playing, skipping duplicate request');
    return;
  }

  try {
    isPlaying = true;
    await speakWithHakim(text, dialect);
  } catch (error) {
    console.warn('Hakim AI failed, falling back to browser TTS:', error);
    fallbackSpeak(text);
  } finally {
    isPlaying = false;
  }
}

async function speakWithHakim(text, dialect) {
  const cacheKey = `${text}|${dialect}`;

  if (audioCache.has(cacheKey)) {
    const audioUrl = audioCache.get(cacheKey);
    // Small delay before playing
    await new Promise(resolve => setTimeout(resolve, 50));
    playAudio(audioUrl);
    return;
  }

  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dialect }),
  });

  if (response.status === 503) {
    throw new Error('TTS service unavailable');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'TTS API failed');
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);

  audioCache.set(cacheKey, audioUrl);
  if (audioCache.size > 100) {
    const oldestKey = audioCache.keys().next().value;
    URL.revokeObjectURL(audioCache.get(oldestKey));
    audioCache.delete(oldestKey);
  }

  await new Promise(resolve => setTimeout(resolve, 50));
  playAudio(audioUrl);
}

function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.preload = 'auto';
  currentAudio = audio;

  audio.onended = () => {
    if (currentAudio === audio) {
      currentAudio = null;
    }
  };

  audio.onerror = (e) => {
    console.warn('Audio playback error:', e);
    if (currentAudio === audio) {
      currentAudio = null;
    }
  };

  audio.play().catch((err) => {
    console.warn('Audio play failed:', err);
    if (currentAudio === audio) {
      currentAudio = null;
    }
  });
}

// Fallback function remains the same
function fallbackSpeak(text) {
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported');
    return;
  }
  window.speechSynthesis.cancel();
  let voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      doFallbackSpeak(text, voices);
    };
    return;
  }
  doFallbackSpeak(text, voices);
}

function doFallbackSpeak(text, voices) {
  const arabicVoice =
    voices.find(v => v.lang.startsWith('ar') && v.name.includes('Neural')) ||
    voices.find(v => v.lang.startsWith('ar') && v.name.includes('Google')) ||
    voices.find(v => v.lang.startsWith('ar') && v.name.includes('Premium')) ||
    voices.find(v => v.lang.startsWith('ar'));
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  utterance.pitch = 1;
  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }
  window.speechSynthesis.speak(utterance);
}