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
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonToast
} from '@ionic/react';
import {
  build,
  cog,
  code,
  hardwareChip,
  checkmarkCircle
} from 'ionicons/icons';
import './Home.scss';

const DesignControls: React.FC = () => {
  const [controlType, setControlType] = useState<string>('');
  const [complexity, setComplexity] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const controlTypes = [
    'PLC Ladder Logic',
    'DCS Control Strategy',
    'SCADA System',
    'Motion Control',
    'Process Control',
    'Safety Systems',
    'Custom Logic'
  ];

  const complexityLevels = [
    'Basic (Simple ON/OFF)',
    'Intermediate (PID Control)',
    'Advanced (Multi-loop)',
    'Expert (Complex Sequencing)'
  ];

  const handleGenerateDesign = () => {
    if (!controlType || !complexity) {
      setToastMessage('Please select control type and complexity level');
      setShowToast(true);
      return;
    }

    setToastMessage(`AI is generating ${controlType} design for ${complexity} complexity...`);
    setShowToast(true);
  };

  const handleQuickTemplate = (template: string) => {
    setToastMessage(`Loading ${template} template...`);
    setShowToast(true);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">Design Automation Controls</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">AI-Powered Control Design</h1>
          <p className="welcome-subtitle">Generate optimized PLC/DCS control systems with intelligent design assistance</p>
        </div>

        <div className="cards-grid">
          {/* Control Type Selection */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Control System Type</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonLabel>Select Type</IonLabel>
                <IonSelect
                  value={controlType}
                  placeholder="Choose control type"
                  onIonChange={(e) => setControlType(e.detail.value || '')}
                >
                  {controlTypes.map((type, index) => (
                    <IonSelectOption key={index} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Complexity Level */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Complexity Level</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonLabel>Select Level</IonLabel>
                <IonSelect
                  value={complexity}
                  placeholder="Choose complexity"
                  onIonChange={(e) => setComplexity(e.detail.value || '')}
                >
                  {complexityLevels.map((level, index) => (
                    <IonSelectOption key={index} value={level}>
                      {level}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Generate Design */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Generate Design</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">AI will create a complete control system design based on your specifications</p>
              <IonButton expand="block" className="tech-button" color="primary" onClick={handleGenerateDesign}>
                <IonIcon slot="start" icon={build} />
                Generate Design
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Quick Templates */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Quick Templates</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="secondary" onClick={() => handleQuickTemplate('Motor Control')}>
                      <IonIcon slot="start" icon={cog} />
                      Motor Control
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="tertiary" onClick={() => handleQuickTemplate('Valve Control')}>
                      <IonIcon slot="start" icon={hardwareChip} />
                      Valve Control
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="success" onClick={() => handleQuickTemplate('PID Loop')}>
                      <IonIcon slot="start" icon={code} />
                      PID Loop
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="warning" onClick={() => handleQuickTemplate('Safety Circuit')}>
                      <IonIcon slot="start" icon={checkmarkCircle} />
                      Safety Circuit
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Design Features */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Design Features</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div className="feature-list">
                <div className="feature-row">
                  <IonIcon icon={checkmarkCircle} color="success" />
                  <span>Automatic I/O mapping</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={checkmarkCircle} color="success" />
                  <span>Code optimization</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={checkmarkCircle} color="success" />
                  <span>Safety compliance checks</span>
                </div>
                <div className="feature-row">
                  <IonIcon icon={checkmarkCircle} color="success" />
                  <span>Documentation generation</span>
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

export default DesignControls;