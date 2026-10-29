import React from 'react';
import { Sparkles, Compass, Bookmark, Map, User, RefreshCw } from 'lucide-react';
import { ACADEMIC_BRANCHES } from '../data/branchesAndSkills';

export default function Navbar({
  activeTab,
  setActiveTab,
  savedCount,
  studentProfile,
  onOpenProfile,
  onResetDemo
}) {
  const branchObj = ACADEMIC_BRANCHES.find(b => b.code === studentProfile?.branch) || { code: studentProfile?.branch || '', color: 'indigo' };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.25rem',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
                Opportunity<span style={{ color: '#818cf8' }}>AI</span>
              </span>
              <span style={{
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#a5b4fc',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                MVP
              </span>
            </div>
            <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
              Engineering Discovery Platform
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => setActiveTab('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              border: activeTab === 'explore' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              background: activeTab === 'explore' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'explore' ? '#a5b4fc' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Compass size={17} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              border: activeTab === 'saved' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              background: activeTab === 'saved' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'saved' ? '#a5b4fc' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark size={17} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span style={{
                background: '#6366f1',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.1rem 0.4rem',
                borderRadius: '9999px',
                marginLeft: '0.2rem'
              }}>
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 0.95rem',
              borderRadius: '10px',
              border: activeTab === 'roadmap' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
              background: activeTab === 'roadmap' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'roadmap' ? '#a5b4fc' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Map size={17} />
            <span>Roadmap</span>
          </button>
        </nav>

        {/* Student Profile Quick Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onOpenProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              width: '1.8rem',
              height: '1.8rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              {studentProfile?.fullName?.trim() ? studentProfile.fullName.trim().charAt(0).toUpperCase() : <User size={14} color="#fff" />}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                {studentProfile?.fullName?.trim() || 'Student Profile'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                {studentProfile?.branch ? (
                  <>
                    <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{studentProfile.branch}</span>
                    {studentProfile?.year ? ` • Year ${studentProfile.year}` : ''}
                  </>
                ) : (
                  <span style={{ color: '#818cf8' }}>Set up profile</span>
                )}
              </div>
            </div>
            <User size={15} color="#94a3b8" />
          </button>

          <button
            onClick={onResetDemo}
            title="Reset profile and saved data"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '0.5rem',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
