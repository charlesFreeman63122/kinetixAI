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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonToast,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import {
  camera,
  search,
  bulb,
  warning,
  checkmarkCircle,
  cloudUpload
} from 'ionicons/icons';
import './Home.scss';

const Troubleshooting: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const commonIssues = [
    'PLC Communication Error',
    'Sensor Malfunction',
    'Motor Control Failure',
    'Valve Not Responding',
    'HMI Display Issue',
    'Power Supply Problem',
    'Wiring Fault',
    'Software Configuration Error',
    'Network Connectivity Issue',
    'Other'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setToastMessage('Image uploaded successfully!');
        setShowToast(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedIssue || !description) {
      setShowAlert(true);
      return;
    }

    // Simulate AI analysis
    setToastMessage('AI analysis in progress... This would normally connect to your automation AI service.');
    setShowToast(true);
  };

  const handleQuickFix = (fixType: string) => {
    setToastMessage(`Applying ${fixType} fix...`);
    setShowToast(true);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">Automation Troubleshooting</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">Diagnose & Resolve</h1>
          <p className="welcome-subtitle">AI-powered troubleshooting for PLC/DCS systems</p>
        </div>

        <div className="cards-grid">
          {/* Issue Selection */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Select Issue Type</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonLabel>Common Issues</IonLabel>
                <IonSelect
                  value={selectedIssue}
                  placeholder="Choose an issue"
                  onIonChange={(e) => setSelectedIssue(e.detail.value || '')}
                >
                  {commonIssues.map((issue, index) => (
                    <IonSelectOption key={index} value={issue}>
                      {issue}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Description Input */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Describe the Problem</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonTextarea
                  placeholder="Describe symptoms, error messages, or observed behavior..."
                  value={description}
                  onIonChange={(e) => setDescription(e.detail.value || '')}
                  rows={4}
                />
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Visual Upload */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Upload Visual Evidence</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="imageUpload"
                />
                <label htmlFor="imageUpload">
                  <IonButton expand="block" className="tech-button" color="secondary">
                    <IonIcon slot="start" icon={camera} />
                    {uploadedImage ? 'Change Image' : 'Upload Photo/Schematic'}
                  </IonButton>
                </label>
              </div>

              {uploadedImage && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded evidence"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: `2px solid rgba(50, 116, 217, 0.3)`
                    }}
                  />
                </div>
              )}
            </IonCardContent>
          </IonCard>

          {/* AI Analysis */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">AI Analysis</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">
                Let AI analyze your issue and provide diagnostic recommendations.
              </p>
              <IonButton
                expand="block"
                className="tech-button"
                color="primary"
                onClick={handleAnalyze}
              >
                <IonIcon slot="start" icon={search} />
                Analyze Issue
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Quick Fixes */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Quick Fixes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton
                      expand="block"
                      className="tech-button"
                      color="success"
                      onClick={() => handleQuickFix('Communication')}
                    >
                      <IonIcon slot="start" icon={checkmarkCircle} />
                      Reset Comm
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton
                      expand="block"
                      className="tech-button"
                      color="warning"
                      onClick={() => handleQuickFix('Power')}
                    >
                      <IonIcon slot="start" icon={bulb} />
                      Power Cycle
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton
                      expand="block"
                      className="tech-button"
                      color="tertiary"
                      onClick={() => handleQuickFix('Network')}
                    >
                      <IonIcon slot="start" icon={cloudUpload} />
                      Network Test
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton
                      expand="block"
                      className="tech-button"
                      color="danger"
                      onClick={() => handleQuickFix('Diagnostic')}
                    >
                      <IonIcon slot="start" icon={warning} />
                      Full Diag
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Results/Suggestions */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">AI Recommendations</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div style={{
                background: 'rgba(31, 31, 31, 0.5)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(50, 116, 217, 0.2)',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#C7D0D9', textAlign: 'center', margin: 0 }}>
                  AI analysis results will appear here after analysis
                </p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Alerts and Toasts */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Incomplete Information"
          message="Please select an issue type and provide a description."
          buttons={['OK']}
        />

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

export default Troubleshooting;