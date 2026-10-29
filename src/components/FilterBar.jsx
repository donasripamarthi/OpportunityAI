import React from 'react';
import { Briefcase, Trophy, Wrench, GraduationCap, Award, SlidersHorizontal, ArrowUpDown, CheckSquare, Square } from 'lucide-react';
import { CATEGORY_META } from '../utils/formatters';

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onlyEligible,
  onToggleOnlyEligible,
  selectedMode,
  onSelectMode,
  sortBy,
  onSelectSortBy,
  totalResults
}) {
  const categories = [
    { id: 'all', label: 'All Categories', icon: SlidersHorizontal },
    { id: 'internship', label: 'Internships', icon: Briefcase },
    { id: 'hackathon', label: 'Hackathons', icon: Trophy },
    { id: 'workshop', label: 'Workshops', icon: Wrench },
    { id: 'course', label: 'Courses', icon: GraduationCap },
    { id: 'scholarship', label: 'Scholarships', icon: Award }
  ];

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '12px',
                border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                color: isSelected ? '#e0e7ff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.825rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              <Icon size={15} color={isSelected ? '#818cf8' : '#94a3b8'} />
              <span>{cat.label}</span>
              <span style={{
                background: isSelected ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.06)',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                color: isSelected ? '#fff' : '#64748b'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Search count, Mode filter, Eligibility toggle, Sort By */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        marginTop: '0.5rem',
        padding: '0.75rem 1rem',
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {/* Results Counter */}
        <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
          Showing <strong style={{ color: '#fff' }}>{totalResults}</strong> opportunities
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* Strict Eligibility Filter */}
          <button
            onClick={() => onToggleOnlyEligible(!onlyEligible)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: onlyEligible ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: onlyEligible ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: onlyEligible ? '#6ee7b7' : '#94a3b8',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {onlyEligible ? <CheckSquare size={15} color="#10b981" /> : <Square size={15} />}
            <span>Eligible For Me Only</span>
          </button>

          {/* Location Mode Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Mode:</span>
            <select
              value={selectedMode}
              onChange={(e) => onSelectMode(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                borderRadius: '8px',
                padding: '0.35rem 0.6rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="ALL">All Modes</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowUpDown size={13} color="#64748b" />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                borderRadius: '8px',
                padding: '0.35rem 0.6rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="match_desc">Highest Match %</option>
              <option value="deadline_asc">Deadline (Soonest)</option>
              <option value="score_desc">Score Breakdown</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}
