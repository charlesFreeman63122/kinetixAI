import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { build, documentText, camera, mic, chatbubbleEllipses, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
  const history = useHistory();

  const navigateToTroubleshooting = () => {
    history.push('/troubleshooting');
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonTitle className="home-title">Kinetix AI - Automation Control Assistant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>
        <div className="welcome-section">
          <h1 className="welcome-title">Engineer Your Automation Future</h1>
          <p className="welcome-subtitle">AI-powered tools for PLC/DCS design, troubleshooting, and control system management.</p>
        </div>

        <div className="cards-grid">
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Design Automation Controls</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Use AI to design and optimize PLC and DCS control systems with intelligent suggestions.</p>
              <IonButton expand="block" className="tech-button" color="primary">
                <IonIcon slot="start" icon={build} />
                Start Designing
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Read & Analyze Controls</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Upload and analyze PLC/DCS ladder logic, schematics, and control programs.</p>
              <IonButton expand="block" className="tech-button" color="secondary">
                <IonIcon slot="start" icon={documentText} />
                Analyze Controls
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Troubleshoot with Visuals</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Upload prints, schematics, or photos to diagnose control system issues.</p>
              <IonButton expand="block" className="tech-button" color="tertiary" onClick={navigateToTroubleshooting}>
                <IonIcon slot="start" icon={camera} />
                Upload & Troubleshoot
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Voice AI Assistant</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Speak naturally to get help with control design, troubleshooting, or system queries.</p>
              <IonButton expand="block" className="tech-button" color="success">
                <IonIcon slot="start" icon={mic} />
                Voice Commands
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Text AI Chat</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Chat with AI for detailed explanations, code generation, and automation advice.</p>
              <IonButton expand="block" className="tech-button" color="warning">
                <IonIcon slot="start" icon={chatbubbleEllipses} />
                Start Chat
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Settings & Preferences</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Configure your workspace, control standards, and AI preferences.</p>
              <IonButton expand="block" className="tech-button" color="medium">
                <IonIcon slot="start" icon={settings} />
                Open Settings
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;