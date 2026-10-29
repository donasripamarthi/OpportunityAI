import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2, SlidersHorizontal, BookOpen, Award, Code2, Cpu } from 'lucide-react';
import { ACADEMIC_BRANCHES } from '../data/branchesAndSkills';

export default function HeroBanner({
  selectedBranch,
  onSelectBranch,
  searchQuery,
  onSearchChange,
  studentProfile,
  onOpenProfile
}) {
  return (
    <div style={{
      position: 'relative',
      padding: '2.5rem 0 2rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div className="container">
        {/* Main Header Tag */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '9999px',
            padding: '0.35rem 0.9rem',
            fontSize: '0.8rem',
            color: '#a5b4fc',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={14} color="#818cf8" />
            <span>AI-Assisted Career Discovery for B.Tech Engineers</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.85rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Find verified internships, hackathons & scholarships for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              your engineering branch
            </span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            maxWidth: '680px'
          }}>
            OpportunityAI analyzes your branch, skills, and academic year to compute <strong style={{ color: '#e2e8f0' }}>transparent match scores</strong>, verify strict eligibility, and generate <strong style={{ color: '#e2e8f0' }}>personalized roadmaps</strong>.
          </p>

          {/* Quick Search Bar */}
          <div style={{
            width: '100%',
            maxWidth: '640px',
            position: 'relative',
            marginBottom: '1.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(30, 41, 59, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '0.4rem 0.75rem 0.4rem 1.25rem',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)'
            }}>
              <Search size={18} color="#94a3b8" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search opportunities (e.g. Python, VLSI, Remote, EV, CAD, BIM, ISRO)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.925rem'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Branch Quick Selectors */}
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
              Filter by Engineering Discipline:
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button
                onClick={() => onSelectBranch('ALL')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedBranch === 'ALL' ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedBranch === 'ALL' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedBranch === 'ALL' ? '#c7d2fe' : '#cbd5e1',
                  transition: 'all 0.15s'
                }}
              >
                All Branches
              </button>

              {ACADEMIC_BRANCHES.map(branch => {
                const isSelected = selectedBranch === branch.code;
                const isUserBranch = studentProfile.branch === branch.code;
                return (
                  <button
                    key={branch.id}
                    onClick={() => onSelectBranch(branch.code)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      color: isSelected ? '#c7d2fe' : '#cbd5e1',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span>{branch.code}</span>
                    {isUserBranch && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#10b981'
                      }} title="Your registered branch" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Value Props Banner */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.8rem',
            color: '#94a3b8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Transparent 0-100% Score Explanation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Strict Year & Branch Eligibility Checks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Personalized Missing Skill Roadmaps</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>100% Free for Engineering Undergrads</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
