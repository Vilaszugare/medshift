import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import Phase10_11 from './MedShift_Phase10_11.jsx';
import Phase12_15 from './MedShift_Phase12_15.jsx';
import Phase16 from './MedShift_Phase16.jsx';
import MedShift from './MedShift.jsx';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#phase12-15');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      setMenuOpen(false); // close menu on navigate
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

      {/* Floating Menu Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
        {menuOpen && (
          <div style={{ 
            position: 'absolute', 
            bottom: '60px', 
            right: '0', 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            border: '1px solid #e5e7eb'
          }}>
            <a href="#phase10-11" style={{ padding: '12px 16px', textDecoration: 'none', color: '#1f2937', borderBottom: '1px solid #f3f4f6', fontWeight: currentRoute === '#phase10-11' ? 'bold' : 'normal', background: currentRoute === '#phase10-11' ? '#f3f4f6' : 'transparent' }}>
              Phase 10-11
            </a>
            <a href="#phase12-15" style={{ padding: '12px 16px', textDecoration: 'none', color: '#1f2937', borderBottom: '1px solid #f3f4f6', fontWeight: currentRoute === '#phase12-15' || currentRoute === '' ? 'bold' : 'normal', background: currentRoute === '#phase12-15' || currentRoute === '' ? '#f3f4f6' : 'transparent' }}>
              Phase 12-15
            </a>
            <a href="#phase16" style={{ padding: '12px 16px', textDecoration: 'none', color: '#1f2937', borderBottom: '1px solid #f3f4f6', fontWeight: currentRoute === '#phase16' ? 'bold' : 'normal', background: currentRoute === '#phase16' ? '#f3f4f6' : 'transparent' }}>
              Phase 16 Manager Login
            </a>
            <a href="#medshift" style={{ padding: '12px 16px', textDecoration: 'none', color: '#1f2937', fontWeight: currentRoute === '#medshift' ? 'bold' : 'normal', background: currentRoute === '#medshift' ? '#f3f4f6' : 'transparent' }}>
              MedShift Original
            </a>
          </div>
        )}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '24px',
            background: menuOpen ? '#ef4444' : '#3b82f6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
}
