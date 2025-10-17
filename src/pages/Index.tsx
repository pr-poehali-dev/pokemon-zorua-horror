import { useState, useEffect, useRef } from 'react';

const Index = () => {
  const [glitchText, setGlitchText] = useState('');
  const [showFigure, setShowFigure] = useState(false);
  const [figureOpacity, setFigureOpacity] = useState(0);
  const [eyesPosition, setEyesPosition] = useState({ x: 50, y: 30 });
  const [whisperText, setWhisperText] = useState('');
  const [bloodDrip, setBloodDrip] = useState(false);
  const [staticNoise, setStaticNoise] = useState(0);
  const [distortion, setDistortion] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const horrorTexts = [
    'Ты не один здесь',
    'Оно наблюдает',
    'Беги',
    'Они голодны',
    'Ты не должен был приходить сюда',
    'Слышишь их шепот?',
    'Оно приближается',
    'Нет выхода',
    'Они внутри стен',
    'Не оборачивайся'
  ];

  const whispers = [
    'помоги нам...',
    'освободи нас...',
    'ты следующий...',
    'присоединяйся к нам...',
    'мы ждали тебя...',
    'навсегда здесь...'
  ];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(horrorTexts[Math.floor(Math.random() * horrorTexts.length)]);
        setTimeout(() => setGlitchText(''), 1500);
      }
    }, 4000);

    const figureInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setShowFigure(true);
        let opacity = 0;
        const fadeIn = setInterval(() => {
          opacity += 0.05;
          setFigureOpacity(opacity);
          if (opacity >= 0.8) {
            clearInterval(fadeIn);
            setTimeout(() => {
              const fadeOut = setInterval(() => {
                opacity -= 0.1;
                setFigureOpacity(opacity);
                if (opacity <= 0) {
                  clearInterval(fadeOut);
                  setShowFigure(false);
                }
              }, 100);
            }, 3000);
          }
        }, 100);
      }
    }, 15000);

    const eyesInterval = setInterval(() => {
      setEyesPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10
      });
    }, 8000);

    const whisperInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setWhisperText(whispers[Math.floor(Math.random() * whispers.length)]);
        setTimeout(() => setWhisperText(''), 4000);
      }
    }, 10000);

    const bloodInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setBloodDrip(true);
        setTimeout(() => setBloodDrip(false), 5000);
      }
    }, 20000);

    const staticInterval = setInterval(() => {
      setStaticNoise(Math.random() * 0.3);
    }, 100);

    const distortionInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setDistortion(1);
        setTimeout(() => setDistortion(0), 200);
      }
    }, 5000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(figureInterval);
      clearInterval(eyesInterval);
      clearInterval(whisperInterval);
      clearInterval(bloodInterval);
      clearInterval(staticInterval);
      clearInterval(distortionInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/131b4596-51a2-4f7f-a5d8-bc158764b371.jpg)',
          filter: `brightness(0.3) contrast(1.2) saturate(0.4) hue-rotate(${distortion * 180}deg)`,
          transform: distortion > 0 ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.15) 3px)`,
          opacity: staticNoise,
          mixBlendMode: 'overlay'
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {showFigure && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 pointer-events-none"
          style={{ opacity: figureOpacity }}
        >
          <div className="relative">
            <img 
              src="https://cdn.poehali.dev/files/76cb79cf-1086-4e14-af67-74ce1e2d2339.png"
              alt=""
              className="h-96 object-contain animate-pulse"
              style={{ 
                filter: 'brightness(0.2) contrast(2) saturate(0)',
                transform: 'scaleX(-1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent mix-blend-multiply" />
          </div>
        </div>
      )}

      <div
        className="absolute w-24 h-16 transition-all duration-[8000ms] pointer-events-none"
        style={{
          left: `${eyesPosition.x}%`,
          top: `${eyesPosition.y}%`,
          opacity: 0.9
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute w-8 h-8 left-2 top-4 rounded-full bg-black border-2 border-red-600">
            <div className="absolute w-3 h-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 animate-pulse" 
                 style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' }} />
          </div>
          <div className="absolute w-8 h-8 right-2 top-4 rounded-full bg-black border-2 border-red-600">
            <div className="absolute w-3 h-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 animate-pulse" 
                 style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' }} />
          </div>
        </div>
      </div>

      {bloodDrip && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-gradient-to-b from-red-900 to-transparent animate-drip"
              style={{
                left: `${20 + i * 20}%`,
                height: '100%',
                animationDelay: `${i * 0.5}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
      )}

      {glitchText && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div 
            className="text-6xl font-bold text-red-600 animate-glitch"
            style={{ 
              textShadow: '3px 3px 0 rgba(255,0,0,0.7), -3px -3px 0 rgba(0,255,255,0.7)',
              fontFamily: 'monospace',
              letterSpacing: '0.1em'
            }}
          >
            {glitchText}
          </div>
        </div>
      )}

      {whisperText && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div 
            className="text-2xl text-gray-400 opacity-40 animate-fade"
            style={{ 
              fontFamily: 'serif',
              fontStyle: 'italic',
              textShadow: '0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            {whisperText}
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-8 right-8 text-center">
        <p className="text-gray-500 text-sm font-mono opacity-50">
          Ты не можешь уйти отсюда...
        </p>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          80% { transform: translate(5px, -5px); }
          100% { transform: translate(0); }
        }

        @keyframes drip {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }

        .animate-glitch {
          animation: glitch 0.3s infinite;
        }

        .animate-drip {
          animation: drip 4s ease-in;
        }

        .animate-fade {
          animation: fade 4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
