import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Sparkles, Bookmark, ExternalLink, Calendar, MapPin, DollarSign, BookPlus, Info } from 'lucide-react';
import { formatDate, getDaysRemaining } from '../utils/formatters';

export default function OpportunityDetailsModal({
  opportunity,
  matchResult,
  isSaved,
  onToggleSave,
  onClose,
  onAddSkillsToRoadmap
}) {
  const [showAppliedToast, setShowAppliedToast] = useState(false);
  const [skillsAddedNotice, setSkillsAddedNotice] = useState(false);

  if (!opportunity || !matchResult) return null;

  const { score, matchTier, tierColor, isEligible, eligibilityReasons, breakdown, skillsAnalysis } = matchResult;
  const daysRemaining = getDaysRemaining(opportunity.deadline);

  const handleApplyClick = () => {
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 4000);
  };

  const handleAddSkills = () => {
    if (onAddSkillsToRoadmap) {
      onAddSkillsToRoadmap(skillsAnalysis.allMissing);
    }
    setSkillsAddedNotice(true);
    setTimeout(() => setSkillsAddedNotice(false), 3000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#1e293b',
          zIndex: 10
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className={`badge badge-${opportunity.category}`}>
                {opportunity.category}
              </span>
              <span className="badge badge-sample">
                Simulated Demo Listing
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
              {opportunity.title}
            </h2>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {opportunity.organization}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Demo Mode Notice */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            color: '#fcd34d',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>Sample Data Notice:</strong> This opportunity is simulated for testing the OpportunityAI platform. Do not submit sensitive academic or banking details.
            </span>
          </div>

          {/* Key Parameters Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Stipend / Value</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>{opportunity.stipendOrPrize}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Location Mode</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' }}>{opportunity.locationMode} ({opportunity.locationCity})</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Application Deadline</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f59e0b' }}>
                {formatDate(opportunity.deadline)} {daysRemaining ? `(${daysRemaining})` : ''}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Eligible Cohort</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' }}>
                Years: {opportunity.eligibleYears?.join(', ') || 'All'}
              </div>
            </div>
          </div>

          {/* EXPLAINABLE MATCH SCORE SECTION */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '14px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="#818cf8" />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                    Transparent Match Breakdown
                  </h3>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Calculated against your profile (Branch, Year, Skills, Career Interests)
                </div>
              </div>

              <div className={`score-pill ${tierColor}`} style={{ fontSize: '1rem', padding: '0.4rem 0.9rem' }}>
                <span>{score}% Match</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#cbd5e1' }}>({matchTier})</span>
              </div>
            </div>

            {/* Score component progress bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(breakdown).map(([key, item]) => {
                const percentage = Math.round((item.points / item.max) * 100);
                return (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#cbd5e1', fontWeight: 500 }}>{item.label}</span>
                      <span style={{ color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                        {item.points} / {item.max} pts ({percentage}%)
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '9999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
                        borderRadius: '9999px',
                        transition: 'width 0.5s ease-out'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STRICT ELIGIBILITY CHECKLIST */}
          <div style={{
            background: isEligible ? 'rgba(16, 185, 129, 0.05)' : 'rgba(245, 158, 11, 0.05)',
            border: isEligible ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '14px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {isEligible ? (
                <CheckCircle2 size={18} color="#10b981" />
              ) : (
                <AlertTriangle size={18} color="#f59e0b" />
              )}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Eligibility Evaluation: {isEligible ? 'You Are Eligible!' : 'Prerequisites Needed'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {eligibilityReasons.map((reason, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: reason.passed ? '#a7f3d0' : '#fde68a'
                }}>
                  <span style={{ fontWeight: 700, minWidth: '16px' }}>
                    {reason.passed ? '✓' : '✗'}
                  </span>
                  <div>
                    <strong>{reason.rule}:</strong> {reason.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS COMPARISON */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.65rem' }}>
              Skill Requirement Analysis
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              {/* Matched skills */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '10px',
                padding: '0.85rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6ee7b7', marginBottom: '0.5rem' }}>
                  ✓ Skills You Have ({skillsAnalysis.allMatched.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {skillsAnalysis.allMatched.length > 0 ? (
                    skillsAnalysis.allMatched.map(skill => (
                      <span key={skill} className="skill-tag matched">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>None matched yet</span>
                  )}
                </div>
              </div>

              {/* Missing skills */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                borderRadius: '10px',
                padding: '0.85rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fda4af', marginBottom: '0.5rem' }}>
                  + Skills To Acquire ({skillsAnalysis.allMissing.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {skillsAnalysis.allMissing.length > 0 ? (
                    skillsAnalysis.allMissing.map(skill => (
                      <span key={skill} className="skill-tag missing">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#34d399' }}>You have all required skills!</span>
                  )}
                </div>
              </div>

            </div>

            {/* Quick action to add missing skills to roadmap */}
            {skillsAnalysis.allMissing.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  onClick={handleAddSkills}
                  style={{
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#c7d2fe',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <BookPlus size={14} />
                  <span>Highlight Missing Skills in My Learning Roadmap</span>
                </button>
                {skillsAddedNotice && (
                  <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: '#34d399' }}>
                    ✓ Target skills highlighted in Roadmap!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Full Description */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Detailed Description & Responsibilities
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              {opportunity.description}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          position: 'sticky',
          bottom: 0
        }}>
          <button
            onClick={() => onToggleSave(opportunity.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              border: isSaved ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.15)',
              background: isSaved ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: isSaved ? '#c7d2fe' : '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Bookmark size={16} fill={isSaved ? '#818cf8' : 'transparent'} />
            <span>{isSaved ? 'Bookmarked' : 'Save Opportunity'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {showAppliedToast && (
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                Demo Application Simulated Successfully!
              </span>
            )}
            <button
              onClick={handleApplyClick}
              className="btn-primary"
            >
              <span>Apply / Register (Demo)</span>
              <ExternalLink size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
