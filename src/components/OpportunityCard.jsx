import React from 'react';
import { Bookmark, Calendar, MapPin, DollarSign, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { formatDate, getDaysRemaining } from '../utils/formatters';

export default function OpportunityCard({
  opportunity,
  matchResult,
  isSaved,
  onToggleSave,
  onViewDetails
}) {
  const { score, matchTier, tierColor, isEligible, eligibilityReasons, skillsAnalysis } = matchResult;
  const daysRemaining = getDaysRemaining(opportunity.deadline);

  const categoryBadgeClass = `badge badge-${opportunity.category}`;

  return (
    <div className="opportunity-card" style={{ padding: '1.25rem' }}>
      
      {/* Top Bar: Category, Sample Tag, and Save Bookmark Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <span className={categoryBadgeClass}>
            {opportunity.category}
          </span>
          <span className="badge badge-sample" title={opportunity.sampleNotice}>
            Sample Demo
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(opportunity.id);
          }}
          title={isSaved ? 'Remove from saved' : 'Save opportunity'}
          style={{
            background: isSaved ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: isSaved ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isSaved ? '#818cf8' : '#94a3b8',
            transition: 'all 0.15s'
          }}
        >
          <Bookmark size={16} fill={isSaved ? '#818cf8' : 'transparent'} />
        </button>
      </div>

      {/* Opportunity Title & Org */}
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: '#f8fafc',
        marginBottom: '0.35rem',
        lineHeight: 1.35
      }}>
        {opportunity.title}
      </h3>

      <div style={{
        fontSize: '0.825rem',
        color: '#94a3b8',
        fontWeight: 500,
        marginBottom: '0.85rem'
      }}>
        {opportunity.organization}
      </div>

      {/* Brief Summary */}
      <p style={{
        fontSize: '0.825rem',
        color: '#cbd5e1',
        lineHeight: 1.45,
        marginBottom: '1rem',
        flexGrow: 1
      }}>
        {opportunity.summary}
      </p>

      {/* Metadata Row: Location, Stipend/Prize, Deadline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        padding: '0.65rem 0.85rem',
        background: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '10px',
        marginBottom: '1rem',
        fontSize: '0.775rem',
        color: '#cbd5e1'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
            <MapPin size={13} color="#38bdf8" />
            <span>{opportunity.locationMode} • {opportunity.locationCity}</span>
          </div>
          <div style={{ fontWeight: 600, color: '#34d399' }}>
            {opportunity.stipendOrPrize}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
            <Calendar size={13} color="#f59e0b" />
            <span>Deadline: {formatDate(opportunity.deadline)}</span>
          </div>
          {daysRemaining && (
            <span style={{ fontSize: '0.725rem', color: '#fbbf24', fontWeight: 600 }}>
              {daysRemaining}
            </span>
          )}
        </div>
      </div>

      {/* MATCH SCORE & STRICT ELIGIBILITY BOX */}
      <div style={{
        padding: '0.75rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          {/* Match Score */}
          <div className={`score-pill ${tierColor}`}>
            <Sparkles size={13} />
            <span>{score}% Match</span>
          </div>

          {/* Strict Eligibility Badge */}
          {isEligible ? (
            <span className="badge badge-eligible">
              <CheckCircle2 size={13} />
              Eligible
            </span>
          ) : (
            <span className="badge badge-prereq" title="Prerequisites or year criteria not yet met">
              <AlertTriangle size={13} />
              Prerequisites Needed
            </span>
          )}
        </div>

        {/* Quick Skills breakdown snippet */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Skills:</span>
          {skillsAnalysis.matchedRequired.slice(0, 2).map(skill => (
            <span key={skill} className="skill-tag matched">
              ✓ {skill}
            </span>
          ))}
          {skillsAnalysis.missingRequired.slice(0, 2).map(skill => (
            <span key={skill} className="skill-tag missing">
              + {skill}
            </span>
          ))}
          {(skillsAnalysis.allMissing.length + skillsAnalysis.allMatched.length) > 4 && (
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              +{((skillsAnalysis.allMissing.length + skillsAnalysis.allMatched.length) - 4)} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <button
        onClick={() => onViewDetails(opportunity, matchResult)}
        className="btn-secondary"
        style={{
          width: '100%',
          justifyContent: 'center',
          fontSize: '0.825rem',
          padding: '0.6rem'
        }}
      >
        <span>Explain Score & View Details</span>
        <ArrowRight size={15} />
      </button>

    </div>
  );
}
