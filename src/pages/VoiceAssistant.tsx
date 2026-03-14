import React, { useState, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonTextarea,
  IonButtons,
  IonBackButton,
  IonToast
} from '@ionic/react';
import {
  mic,
  micOff,
  volumeHigh,
  chatbubbleEllipses,
  settings,
  helpCircle
} from 'ionicons/icons';
import './Home.scss';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

const VoiceAssistant: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setToastMessage('Speech recognition not supported in this browser');
      setShowToast(true);
      return;
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setToastMessage('Listening... Speak your automation question');
      setShowToast(true);
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = (event.results[0] as SpeechRecognitionAlternative)[0].transcript;
      setTranscript(transcript);
      handleVoiceQuery(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsRecording(false);
      setToastMessage('Speech recognition error. Please try again.');
      setShowToast(true);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleVoiceQuery = (query: string) => {
    // Simulate AI response based on voice input
    const responses = {
      'how to program a plc': 'To program a PLC, start by understanding ladder logic basics. Use normally open and normally closed contacts, coils, and timers. Always follow safety standards and document your code.',
      'motor control': 'For motor control, implement proper start/stop circuits with overload protection. Use three-phase contactors and include emergency stop functionality.',
      'pid control': 'PID control uses Proportional, Integral, and Derivative terms. Tune P for responsiveness, I for steady-state accuracy, and D for stability. Start with P-only control.',
      'sensor troubleshooting': 'Check sensor wiring, power supply, and signal levels. Use multimeter to verify voltage outputs and check for signal noise or interference.',
      'valve control': 'Valve control requires proper actuator sizing and fail-safe positioning. Consider valve characteristics (linear, equal percentage, quick opening) for your process.',
      'default': 'I understand you\'re asking about automation controls. Could you provide more specific details about your PLC, DCS, or control system question?'
    };

    const lowerQuery = query.toLowerCase();
    let aiResponse = responses.default;

    for (const [key, value] of Object.entries(responses)) {
      if (key !== 'default' && lowerQuery.includes(key)) {
        aiResponse = value;
        break;
      }
    }

    setResponse(aiResponse);
  };

  const playResponse = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setToastMessage('Text-to-speech not supported in this browser');
      setShowToast(true);
    }
  };

  const handleQuickCommand = (command: string) => {
    setTranscript(command);
    handleVoiceQuery(command);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">Voice AI Assistant</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">Voice Control Assistant</h1>
          <p className="welcome-subtitle">Speak naturally about your automation challenges - get expert AI guidance instantly</p>
        </div>

        <div className="cards-grid">
          {/* Voice Recording */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Voice Commands</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <IonButton
                  expand="block"
                  className="tech-button"
                  color={isRecording ? "danger" : "primary"}
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{ height: '80px', fontSize: '1.2em' }}
                >
                  <IonIcon slot="start" icon={isRecording ? micOff : mic} size="large" />
                  {isRecording ? 'Stop Listening' : 'Start Voice Command'}
                </IonButton>
              </div>
              <p style={{ fontSize: '0.9em', color: '#888', textAlign: 'center' }}>
                Click to speak your automation question or command
              </p>
            </IonCardContent>
          </IonCard>

          {/* Transcript */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Your Question</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonTextarea
                  placeholder="Your voice input will appear here..."
                  value={transcript}
                  readonly
                  rows={3}
                />
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* AI Response */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">AI Response</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonTextarea
                  placeholder="AI response will appear here..."
                  value={response}
                  readonly
                  rows={6}
                />
              </IonItem>
              {response && (
                <IonButton
                  expand="block"
                  className="tech-button"
                  color="success"
                  onClick={playResponse}
                  disabled={isPlaying}
                  style={{ marginTop: '1rem' }}
                >
                  <IonIcon slot="start" icon={isPlaying ? pause : volumeHigh} />
                  {isPlaying ? 'Playing...' : 'Play Response'}
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>

          {/* Quick Commands */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Quick Commands</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="secondary" onClick={() => handleQuickCommand('how to program a plc')}>
                      <IonIcon slot="start" icon={settings} />
                      PLC Programming
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="tertiary" onClick={() => handleQuickCommand('motor control')}>
                      <IonIcon slot="start" icon={helpCircle} />
                      Motor Control
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="success" onClick={() => handleQuickCommand('pid control')}>
                      <IonIcon slot="start" icon={chatbubbleEllipses} />
                      PID Control
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="warning" onClick={() => handleQuickCommand('sensor troubleshooting')}>
                      <IonIcon slot="start" icon={helpCircle} />
                      Sensor Issues
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Voice Features */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Voice Features</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IonIcon icon={mic} color="primary" />
                  <span>Voice-to-text conversion</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IonIcon icon={volumeHigh} color="success" />
                  <span>Text-to-speech responses</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IonIcon icon={chatbubbleEllipses} color="secondary" />
                  <span>Context-aware automation advice</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IonIcon icon={helpCircle} color="warning" />
                  <span>Industry-specific terminology</span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default VoiceAssistant;