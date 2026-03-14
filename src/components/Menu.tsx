import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { warningOutline, warningSharp, buildOutline, buildSharp, documentTextOutline, documentTextSharp, micOutline, micSharp, chatbubbleEllipsesOutline, chatbubbleEllipsesSharp, settingsOutline, settingsSharp, bookmarkOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: buildOutline,
    mdIcon: buildSharp
  },
  {
    title: 'Design Controls',
    url: '/design-controls',
    iosIcon: buildOutline,
    mdIcon: buildSharp
  },
  {
    title: 'Analyze Controls',
    url: '/analyze-controls',
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp
  },
  {
    title: 'Troubleshooting',
    url: '/troubleshooting',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  },
  {
    title: 'Voice Assistant',
    url: '/voice-assistant',
    iosIcon: micOutline,
    mdIcon: micSharp
  },
  {
    title: 'Text Chat',
    url: '/text-chat',
    iosIcon: chatbubbleEllipsesOutline,
    mdIcon: chatbubbleEllipsesSharp
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
