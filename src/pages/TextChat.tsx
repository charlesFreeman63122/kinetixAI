import React, { useState, useRef, useEffect } from 'react';
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
  IonButtons,
  IonBackButton,
  IonToast,
  IonList,
  IonItem,
  IonItem as IonListItem,
  IonAvatar,
  IonText,
  IonTextarea
} from '@ionic/react';
import {
  chatbubbleEllipses,
  send,
  person,
  hardwareChip,
  code,
  helpCircle,
  build,
  search
} from 'ionicons/icons';
import './Home.scss';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const TextChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI automation assistant. I can help you with PLC programming, DCS design, control systems, troubleshooting, and more. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('plc') && lowerMessage.includes('programming')) {
      return "PLC programming involves creating ladder logic diagrams. Start with understanding basic instructions like XIC (examine if closed), XIO (examine if open), and OTE (output energize). Always include proper documentation and safety circuits. Would you like me to show you a basic motor control example?";
    }

    if (lowerMessage.includes('pid') || lowerMessage.includes('control')) {
      return "PID controllers use three terms: Proportional (P) for immediate response, Integral (I) for eliminating steady-state error, and Derivative (D) for improving stability. Tuning typically starts with P-only, then adds I, and finally D if needed. The Ziegler-Nichols method is a common tuning approach.";
    }

    if (lowerMessage.includes('motor') && lowerMessage.includes('control')) {
      return "Motor control circuits should include: start/stop buttons, overload protection, emergency stop, and proper interlocking. For three-phase motors, use contactors with auxiliary contacts for seal-in logic. Always include proper grounding and follow NEC standards.";
    }

    if (lowerMessage.includes('sensor') || lowerMessage.includes('troubleshoot')) {
      return "When troubleshooting sensors: 1) Check power supply voltage, 2) Verify wiring connections, 3) Test signal output with multimeter, 4) Check for environmental interference, 5) Verify sensor specifications match application. What type of sensor are you working with?";
    }

    if (lowerMessage.includes('ladder') && lowerMessage.includes('logic')) {
      return "Ladder logic is read left-to-right, top-to-bottom. Power flows from left rail to right rail through closed contacts. Use normally open contacts for start buttons, normally closed for stop buttons. Timers and counters are essential for sequencing operations.";
    }

    if (lowerMessage.includes('dcs') || lowerMessage.includes('distributed')) {
      return "DCS systems provide centralized control with distributed I/O. They excel at complex processes with many control loops. Key components include controllers, I/O modules, operator stations, and historian databases. Consider redundancy requirements for critical applications.";
    }

    return "That's an interesting automation question! I can help with PLC programming, DCS design, motor control, PID tuning, sensor troubleshooting, ladder logic, and many other industrial control topics. Could you provide more specific details about what you're working on?";
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(currentMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">AI Text Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">AI Automation Chat</h1>
          <p className="welcome-subtitle">Get detailed answers to your control system questions with AI-powered assistance</p>
        </div>

        <div className="cards-grid">
          {/* Chat Messages */}
          <IonCard className="tech-card chat-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Conversation</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content chat-card-content">
              <div className="chat-scroll-wrap">
                <IonList className="transparent-list">
                  {messages.map((message) => (
                    <IonListItem key={message.id} className="chat-message-item">
                      <IonAvatar slot="start">
                        <IonIcon
                          icon={message.sender === 'user' ? person : hardwareChip}
                          className={`chat-avatar-icon ${message.sender === 'user' ? 'chat-avatar-user' : 'chat-avatar-ai'}`}
                        />
                      </IonAvatar>
                      <div className="chat-message-body">
                        <IonText className={`chat-sender ${message.sender === 'user' ? 'chat-sender-user' : 'chat-sender-ai'}`}>
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </IonText>
                        <p className="chat-message-text">
                          {message.text}
                        </p>
                        <IonText className="chat-message-time">
                          {message.timestamp.toLocaleTimeString()}
                        </IonText>
                      </div>
                    </IonListItem>
                  ))}
                </IonList>
                <div ref={messagesEndRef} />
              </div>
            </IonCardContent>
          </IonCard>

          {/* Message Input */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Send Message</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonTextarea
                  placeholder="Ask me anything about automation controls..."
                  value={currentMessage}
                  onIonChange={(e) => setCurrentMessage(e.detail.value || '')}
                  onKeyPress={handleKeyPress}
                  rows={3}
                />
              </IonItem>
              <IonButton
                expand="block"
                className="tech-button"
                color="primary"
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
              >
                <IonIcon slot="start" icon={send} />
                Send Message
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Quick Questions */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Quick Questions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="secondary" onClick={() => handleQuickQuestion('How do I program a basic PLC?')}>
                      <IonIcon slot="start" icon={code} />
                      PLC Basics
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="tertiary" onClick={() => handleQuickQuestion('Explain PID control')}>
                      <IonIcon slot="start" icon={build} />
                      PID Control
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="success" onClick={() => handleQuickQuestion('Motor control circuit design')}>
                      <IonIcon slot="start" icon={helpCircle} />
                      Motor Control
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="warning" onClick={() => handleQuickQuestion('DCS vs PLC differences')}>
                      <IonIcon slot="start" icon={search} />
                      DCS vs PLC
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Chat Features */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Chat Features</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div className="feature-list">
                <div className="feature-row">
                  <IonIcon icon={chatbubbleEllipses} color="primary" />
                  <span>Context-aware conversations</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={code} color="secondary" />
                  <span>Code examples and snippets</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={helpCircle} color="success" />
                  <span>Industry best practices</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={search} color="warning" />
                  <span>Detailed technical explanations</span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Message sent!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default TextChat;
