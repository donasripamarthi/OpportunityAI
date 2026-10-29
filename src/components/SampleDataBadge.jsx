import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

export default function SampleDataBadge() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.95))',
      borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
      padding: '0.5rem 1rem',
      fontSize: '0.8rem',
      color: '#cbd5e1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#f59e0b' }}>
        <AlertCircle size={15} />
        <span>SIMULATED DEMO ENVIRONMENT</span>
      </div>
      <span style={{ color: '#64748b' }}>•</span>
      <span>All opportunity listings and awards shown are realistic sample demo data for student testing. None represent verified live openings.</span>
      <span style={{ color: '#64748b' }}>•</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#93c5fd' }}>
        <Info size={13} />
        Supports CSE, ECE, EEE, MECH, CIVIL, AI/ML
      </span>
    </div>
  );
}
