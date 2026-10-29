import React, { useState } from 'react';
import { Bookmark, Compass, Trash2, ArrowRight } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

export default function SavedOpportunities({
  opportunities,
  evaluatedOpportunities,
  savedIds,
  onToggleSave,
  onViewDetails,
  onExploreClick
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter saved opportunities
  const savedItems = evaluatedOpportunities.filter(item => savedIds.includes(item.opp.id));
  
  const filteredItems = selectedFilter === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.opp.category === selectedFilter);

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem 1.25rem' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              background: 'rgba(99, 102, 241, 0.15)',
              padding: '0.5rem',
              borderRadius: '10px'
            }}>
              <Bookmark size={20} color="#818cf8" fill="#818cf8" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                Saved Opportunities ({savedItems.length})
              </h2>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                Bookmarked internships, hackathons, and scholarships stored in your browser
              </p>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        {savedItems.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['all', 'internship', 'hackathon', 'workshop', 'course', 'scholarship'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  border: selectedFilter === cat ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: selectedFilter === cat ? 'rgba(99, 102, 241, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                  color: selectedFilter === cat ? '#c7d2fe' : '#94a3b8'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedItems.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'rgba(30, 41, 59, 0.4)',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 255, 255, 0.1)'
        }}>
          <Bookmark size={40} color="#64748b" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            No Saved Opportunities Yet
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            Browse through recommended internships, hackathons, and scholarships and click the bookmark icon to save them here.
          </p>
          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{ margin: '0 auto' }}
          >
            <Compass size={16} />
            <span>Explore Opportunities</span>
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
          No saved opportunities found in this category.
        </div>
      ) : (
        <div className="grid-cards">
          {filteredItems.map(({ opp, match }) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              matchResult={match}
              isSaved={true}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

    </div>
  );
}
