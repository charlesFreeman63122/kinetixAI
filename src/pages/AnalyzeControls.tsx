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
  IonTextarea,
  IonButtons,
  IonBackButton,
  IonToast,
  IonAlert
} from '@ionic/react';
import {
  documentText,
  search,
  analytics,
  codeWorking,
  eye,
  cloudUpload
} from 'ionicons/icons';
import './Home.scss';

const AnalyzeControls: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFile(e.target?.result as string);
        setToastMessage('File uploaded successfully! AI analysis in progress...');
        setShowToast(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeCode = () => {
    if (!codeSnippet.trim()) {
      setShowAlert(true);
      return;
    }

    setToastMessage('Analyzing code with AI... This would connect to your automation analysis service.');
    setShowToast(true);
  };

  const handleQuickAnalysis = (analysisType: string) => {
    setToastMessage(`Running ${analysisType} analysis...`);
    setShowToast(true);
  };

  return (
    <IonPage className="dark-theme">
      <IonHeader className="home-header">
        <IonToolbar className="dark-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle className="home-title">Analyze Controls</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-container dark-content">
        <div className="circuit-pattern"></div>

        <div className="welcome-section">
          <h1 className="welcome-title">Control System Analysis</h1>
          <p className="welcome-subtitle">Upload and analyze PLC/DCS programs, schematics, and ladder logic with AI assistance</p>
        </div>

        <div className="cards-grid">
          {/* File Upload */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Upload Control Files</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <p className="card-description">Upload ladder logic, schematics, or control programs for AI analysis</p>
              <div className="upload-control-wrap">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.svg,.dwg,.stp,.step"
                  onChange={handleFileUpload}
                  className="hidden-file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <IonButton expand="block" className="tech-button" color="primary">
                    <IonIcon slot="start" icon={cloudUpload} />
                    Choose File
                  </IonButton>
                </label>
              </div>
              {uploadedFile && (
                <div className="upload-success-text">
                  ✓ File uploaded successfully
                </div>
              )}
            </IonCardContent>
          </IonCard>

          {/* Code Analysis */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Code Snippet Analysis</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonItem>
                <IonTextarea
                  placeholder="Paste your PLC/DCS code here for analysis..."
                  value={codeSnippet}
                  onIonChange={(e) => setCodeSnippet(e.detail.value || '')}
                  rows={6}
                />
              </IonItem>
              <IonButton expand="block" className="tech-button" color="secondary" onClick={handleAnalyzeCode}>
                <IonIcon slot="start" icon={analytics} />
                Analyze Code
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Analysis Types */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Analysis Options</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="tertiary" onClick={() => handleQuickAnalysis('Logic Flow')}>
                      <IonIcon slot="start" icon={eye} />
                      Logic Flow
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="success" onClick={() => handleQuickAnalysis('Error Detection')}>
                      <IonIcon slot="start" icon={search} />
                      Error Detection
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="warning" onClick={() => handleQuickAnalysis('Optimization')}>
                      <IonIcon slot="start" icon={codeWorking} />
                      Optimization
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" className="tech-button" color="medium" onClick={() => handleQuickAnalysis('Documentation')}>
                      <IonIcon slot="start" icon={documentText} />
                      Documentation
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Analysis Results Placeholder */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Analysis Results</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div className="analysis-empty-state">
                <IonIcon icon={analytics} size="large" className="analysis-empty-icon" />
                <p>Upload a file or paste code to see AI-powered analysis results</p>
                <p className="analysis-empty-detail">
                  Results will include logic validation, optimization suggestions, and documentation
                </p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Supported Formats */}
          <IonCard className="tech-card">
            <IonCardHeader className="card-header">
              <IonCardTitle className="card-title">Supported Formats</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="card-content">
              <div className="format-badge-group">
                {['PDF', 'DOC', 'XLS', 'PNG', 'JPG', 'DWG', 'STEP', 'Ladder Logic'].map((format) => (
                  <span key={format} className="format-badge">
                    {format}
                  </span>
                ))}
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

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Missing Input"
          message="Please paste some code to analyze."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AnalyzeControls;