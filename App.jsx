import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Badge } from '@capawesome/capacitor-badge';

import Phase10_11 from './MedShift_Phase10_11.jsx';
import Phase12_15 from './MedShift_Phase12_15.jsx';
import Phase16 from './MedShift_Phase16.jsx';
import MedShift from './MedShift.jsx';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#phase12-15');
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);

    // --- Push Notifications ---
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ', notification);
        // Optionally update badge
        Badge.set({ count: 1 });
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed: ', notification);
      });
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderComponent = () => {
    switch (currentRoute) {
      case '#phase10-11':
        return <Phase10_11 />;
      case '#phase16':
        return <Phase16 />;
      case '#medshift':
        return <MedShift />;
      case '#phase12-15':
      default:
        return <Phase12_15 />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {renderComponent()}

    </div>
  );
}
