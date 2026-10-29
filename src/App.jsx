import React, { useState, useMemo } from 'react';
import SampleDataBadge from './components/SampleDataBadge';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import OpportunityCard from './components/OpportunityCard';
import OpportunityDetailsModal from './components/OpportunityDetailsModal';
import StudentProfileModal from './components/StudentProfileModal';
import SavedOpportunities from './components/SavedOpportunities';
import LearningRoadmap from './components/LearningRoadmap';

import { SAMPLE_OPPORTUNITIES } from './data/sampleOpportunities';
import { evaluateOpportunityMatch } from './services/matchingEngine';
import {
  getStudentProfile,
  saveStudentProfile,
  getSavedOpportunityIds,
  toggleSaveOpportunity,
  getCompletedMilestones,
  toggleMilestoneCompleted,
  resetDemoData
} from './services/storageService';

export default function App() {
  // Student Profile State
  const [studentProfile, setStudentProfile] = useState(() => getStudentProfile());

  // Navigation State
  const [activeTab, setActiveTab] = useState('explore');

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [selectedMode, setSelectedMode] = useState('ALL');
  const [sortBy, setSortBy] = useState('match_desc');

  // Saved Opportunities & Roadmaps State
  const [savedIds, setSavedIds] = useState(() => getSavedOpportunityIds());
  const [completedMilestones, setCompletedMilestones] = useState(() => getCompletedMilestones());
  const [highlightedSkills, setHighlightedSkills] = useState([]);

  // Modals State
  const [activeDetails, setActiveDetails] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Evaluate All Opportunities with Explainable Engine
  const evaluatedOpportunities = useMemo(() => {
    return SAMPLE_OPPORTUNITIES.map(opp => ({
      opp,
      match: evaluateOpportunityMatch(studentProfile, opp)
    }));
  }, [studentProfile]);

  // Compute category counts for current branch filter
  const categoryCounts = useMemo(() => {
    const counts = { all: evaluatedOpportunities.length };
    evaluatedOpportunities.forEach(({ opp }) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, [evaluatedOpportunities]);

  // Filter and Sort Opportunities
  const filteredOpportunities = useMemo(() => {
    let result = [...evaluatedOpportunities];

    // Filter: Category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.opp.category === selectedCategory);
    }

    // Filter: Discipline / Branch
    if (selectedBranch !== 'ALL') {
      result = result.filter(item => {
        const branches = item.opp.eligibleBranches || ['All Branches'];
        return branches.some(b => b.toLowerCase().includes('all') || b === selectedBranch);
      });
    }

    // Filter: Location Mode
    if (selectedMode !== 'ALL') {
      result = result.filter(item => item.opp.locationMode === selectedMode);
    }

    // Filter: Only strictly eligible for student
    if (onlyEligible) {
      result = result.filter(item => item.match.isEligible);
    }

    // Filter: Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(({ opp }) => {
        return (
          opp.title.toLowerCase().includes(q) ||
          opp.organization.toLowerCase().includes(q) ||
          opp.summary.toLowerCase().includes(q) ||
          opp.category.toLowerCase().includes(q) ||
          (opp.requiredSkills || []).some(s => s.toLowerCase().includes(q)) ||
          (opp.tags || []).some(t => t.toLowerCase().includes(q)) ||
          (opp.eligibleBranches || []).some(b => b.toLowerCase().includes(q))
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'match_desc') {
        return b.match.score - a.match.score;
      }
      if (sortBy === 'deadline_asc') {
        return new Date(a.opp.deadline).getTime() - new Date(b.opp.deadline).getTime();
      }
      return 0;
    });

    return result;
  }, [evaluatedOpportunities, selectedCategory, selectedBranch, selectedMode, onlyEligible, searchQuery, sortBy]);

  // Handlers
  const handleSaveProfile = (newProfile) => {
    setStudentProfile(newProfile);
    saveStudentProfile(newProfile);
  };

  const handleToggleSave = (oppId) => {
    const updated = toggleSaveOpportunity(oppId);
    setSavedIds(updated);
  };

  const handleToggleMilestone = (milestoneId) => {
    const updated = toggleMilestoneCompleted(milestoneId);
    setCompletedMilestones(updated);
  };

  const handleAddSkillsToRoadmap = (missingSkills) => {
    setHighlightedSkills(prev => Array.from(new Set([...prev, ...missingSkills])));
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset your student profile and clear all saved opportunities?')) {
      const defaults = resetDemoData();
      if (defaults) {
        setStudentProfile(defaults.profile);
        setSavedIds(defaults.savedIds);
        setCompletedMilestones(defaults.milestones);
        setHighlightedSkills([]);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sample Data Disclaimer Top Banner */}
      <SampleDataBadge />

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* MAIN VIEW CONTENT */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'explore' && (
          <>
            {/* Hero & Search Banner */}
            <HeroBanner
              selectedBranch={selectedBranch}
              onSelectBranch={setSelectedBranch}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              studentProfile={studentProfile}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />

            {/* Opportunities List Container */}
            <div className="container" style={{ padding: '2rem 1.25rem 4rem 1.25rem' }}>
              
              {/* Category, Eligibility & Sorting Filter Bar */}
              <FilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
                onlyEligible={onlyEligible}
                onToggleOnlyEligible={setOnlyEligible}
                selectedMode={selectedMode}
                onSelectMode={setSelectedMode}
                sortBy={sortBy}
                onSelectSortBy={setSortBy}
                totalResults={filteredOpportunities.length}
              />

              {/* Opportunities Grid */}
              {filteredOpportunities.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 1.5rem',
                  background: 'rgba(30, 41, 59, 0.4)',
                  borderRadius: '16px',
                  border: '1px dashed rgba(255, 255, 255, 0.1)'
                }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                    No opportunities match your current filters.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                    Try clearing the search query, selecting "All Branches", or unchecking "Eligible For Me Only".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBranch('ALL');
                      setSelectedMode('ALL');
                      setSearchQuery('');
                      setOnlyEligible(false);
                    }}
                    className="btn-secondary"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid-cards">
                  {filteredOpportunities.map(({ opp, match }) => (
                    <OpportunityCard
                      key={opp.id}
                      opportunity={opp}
                      matchResult={match}
                      isSaved={savedIds.includes(opp.id)}
                      onToggleSave={handleToggleSave}
                      onViewDetails={(opportunity, matchResult) => {
                        setActiveDetails({ opp: opportunity, match: matchResult });
                      }}
                    />
                  ))}
                </div>
              )}

            </div>
          </>
        )}

        {activeTab === 'saved' && (
          <SavedOpportunities
            opportunities={SAMPLE_OPPORTUNITIES}
            evaluatedOpportunities={evaluatedOpportunities}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(opportunity, matchResult) => {
              setActiveDetails({ opp: opportunity, match: matchResult });
            }}
            onExploreClick={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'roadmap' && (
          <LearningRoadmap
            studentProfile={studentProfile}
            completedMilestones={completedMilestones}
            onToggleMilestone={handleToggleMilestone}
            highlightedSkills={highlightedSkills}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(15, 23, 42, 0.95)',
        padding: '2rem 1.25rem',
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: '#fff' }}>OpportunityAI</span> — Student Opportunity Discovery MVP.
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
              Designed for B.Tech students in CSE, ECE, EEE, Mechanical, Civil & AI/ML. All listings are realistic sample data.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              My Profile
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('roadmap')}
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Learning Roadmap
            </button>
            <span>•</span>
            <span style={{ color: '#64748b' }}>Free & Open Source Demo</span>
          </div>
        </div>
      </footer>

      {/* Opportunity Details & Explainable Score Modal */}
      {activeDetails && (
        <OpportunityDetailsModal
          opportunity={activeDetails.opp}
          matchResult={activeDetails.match}
          isSaved={savedIds.includes(activeDetails.opp.id)}
          onToggleSave={handleToggleSave}
          onClose={() => setActiveDetails(null)}
          onAddSkillsToRoadmap={handleAddSkillsToRoadmap}
        />
      )}

      {/* Student Profile Configuration Modal */}
      {isProfileModalOpen && (
        <StudentProfileModal
          profile={studentProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

    </div>
  );
}
