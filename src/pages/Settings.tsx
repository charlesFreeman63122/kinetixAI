import React, { useState } from 'react';
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
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButtons,
  IonBackButton,
  IonToast,
} from '@ionic/react';
import {
  settings,
  colorPalette,
  shield,
  cloud,
  hardwareChip,
  language,
  moon,
  sunny,
  notifications
} from 'ionicons/icons';
import './Home.scss';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [controlStandard, setControlStandard] = useState('IEC');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveSettings = () => {
    setToastMessage('Settings saved successfully!');
    setShowToast(true);
  };

  const handleResetSettings = () => {
    setTheme('dark');
    setNotificationsEnabled(true);
    setSelectedLanguage('en');
    setControlStandard('IEC');
    setAutoSave(true);
    setToastMessage('Settings reset to defaults');
    setShowToast(true);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">Settings & Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">App Preferences</h1>
          <p className="welcome-subtitle">Customize your Kinetix AI experience and control system preferences</p>
        </div>

        <div className="cards-grid">
          {/* Appearance Settings */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Appearance</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonList className="transparent-list">
                <IonItem className="transparent-item">
                  <IonIcon icon={colorPalette} slot="start" />
                  <IonLabel>Theme</IonLabel>
                  <IonSelect
                    value={theme}
                    slot="end"
                    onIonChange={(e) => setTheme(e.detail.value)}
                  >
                    <IonSelectOption value="dark">Dark (Tech)</IonSelectOption>
                    <IonSelectOption value="light">Light</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem className="transparent-item">
                  <IonIcon icon={notifications ? sunny : moon} slot="start" />
                  <IonLabel>Dark Mode Animations</IonLabel>
                  <IonToggle
                    slot="end"
                    checked={theme === 'dark'}
                    onIonChange={(e) => setTheme(e.detail.checked ? 'dark' : 'light')}
                  />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Control Standards */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Control Standards</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonList className="transparent-list">
                <IonItem className="transparent-item">
                  <IonIcon icon={hardwareChip} slot="start" />
                  <IonLabel>Default Standard</IonLabel>
                  <IonSelect
                    value={controlStandard}
                    slot="end"
                    onIonChange={(e) => setControlStandard(e.detail.value)}
                  >
                    <IonSelectOption value="IEC">IEC 61131-3</IonSelectOption>
                    <IonSelectOption value="ANSI">ANSI/ISA</IonSelectOption>
                    <IonSelectOption value="DIN">DIN Standards</IonSelectOption>
                    <IonSelectOption value="JIS">JIS Standards</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem className="transparent-item">
                  <IonIcon icon={shield} slot="start" />
                  <IonLabel>Safety Compliance</IonLabel>
                  <IonToggle slot="end" checked={true} />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* AI Preferences */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">AI Preferences</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonList className="transparent-list">
                <IonItem className="transparent-item">
                  <IonIcon icon={language} slot="start" />
                  <IonLabel>Response Language</IonLabel>
                  <IonSelect
                    value={selectedLanguage}
                    slot="end"
                    onIonChange={(e) => setSelectedLanguage(e.detail.value)}
                  >
                    <IonSelectOption value="en">English</IonSelectOption>
                    <IonSelectOption value="es">Español</IonSelectOption>
                    <IonSelectOption value="de">Deutsch</IonSelectOption>
                    <IonSelectOption value="fr">Français</IonSelectOption>
                    <IonSelectOption value="zh">中文</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem className="transparent-item">
                  <IonIcon icon={notifications} slot="start" />
                  <IonLabel>AI Notifications</IonLabel>
                  <IonToggle
                    slot="end"
                    checked={notificationsEnabled}
                    onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
                  />
                </IonItem>

                <IonItem className="transparent-item">
                  <IonIcon icon={cloud} slot="start" />
                  <IonLabel>Auto-save Conversations</IonLabel>
                  <IonToggle
                    slot="end"
                    checked={autoSave}
                    onIonChange={(e) => setAutoSave(e.detail.checked)}
                  />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Data Management */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Data Management</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="secondary">
                      <IonIcon slot="start" icon={cloud} />
                      Export Data
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="warning">
                      <IonIcon slot="start" icon={shield} />
                      Clear Cache
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonButton expand="block" className="tech-button" color="danger">
                      <IonIcon slot="start" icon={settings} />
                      Factory Reset
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Save/Reset Actions */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Actions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="primary" onClick={handleSaveSettings}>
                      <IonIcon slot="start" icon={settings} />
                      Save Settings
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="medium" onClick={handleResetSettings}>
                      <IonIcon slot="start" icon={settings} />
                      Reset to Defaults
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* App Info */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">About Kinetix AI</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div className="app-info-wrap">
                <h3 className="app-info-version">Version 1.0.0</h3>
                <p className="app-info-description">
                  AI-powered automation control assistant for engineers
                </p>
                <p className="app-info-meta">
                  Built with Ionic React • Powered by advanced AI
                </p>
                <div className="app-info-footer">
                  <p>© 2026 Kinetix Technologies</p>
                  <p>All rights reserved</p>
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

export default Settings;
