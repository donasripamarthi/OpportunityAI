import React, { useState } from 'react';
import { X, Check, Plus, User, Sparkles, GraduationCap, Briefcase, Award, RotateCcw } from 'lucide-react';
import { ACADEMIC_BRANCHES, ACADEMIC_YEARS, BRANCH_SKILL_SUGGESTIONS, COMMON_INTERESTS, CAREER_GOALS } from '../data/branchesAndSkills';
import { SAMPLE_DEMO_PROFILE } from '../services/storageService';

export default function StudentProfileModal({
  profile,
  onSaveProfile,
  onClose
}) {
  // Initialize with the student's actual profile details, or clean empty defaults for new students
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    email: profile?.email || '',
    branch: profile?.branch || '',
    year: profile?.year || null,
    cgpa: profile?.cgpa !== undefined && profile?.cgpa !== null ? profile.cgpa : '',
    careerGoal: profile?.careerGoal || '',
    interests: Array.isArray(profile?.interests) ? [...profile.interests] : [],
    skills: Array.isArray(profile?.skills) ? [...profile.skills] : []
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const handleBranchChange = (newBranch) => {
    setFormData(prev => ({ ...prev, branch: prev.branch === newBranch ? '' : newBranch }));
  };

  const handleYearChange = (newYear) => {
    const yrNum = Number(newYear);
    setFormData(prev => ({ ...prev, year: prev.year === yrNum ? null : yrNum }));
  };

  const handleGoalChange = (goalId) => {
    setFormData(prev => ({ ...prev, careerGoal: prev.careerGoal === goalId ? '' : goalId }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || newSkillInput).trim();
    if (!trimmed) return;
    if (formData.skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) return;

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, trimmed]
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Demo / Testing helper: populate sample student data on demand
  const handleLoadDemoData = () => {
    setFormData({
      fullName: SAMPLE_DEMO_PROFILE.fullName,
      email: SAMPLE_DEMO_PROFILE.email,
      branch: SAMPLE_DEMO_PROFILE.branch,
      year: SAMPLE_DEMO_PROFILE.year,
      cgpa: SAMPLE_DEMO_PROFILE.cgpa,
      careerGoal: SAMPLE_DEMO_PROFILE.careerGoal,
      interests: [...SAMPLE_DEMO_PROFILE.interests],
      skills: [...SAMPLE_DEMO_PROFILE.skills]
    });
  };

  // Clear all fields back to blank initial state
  const handleClearAll = () => {
    setFormData({
      fullName: '',
      email: '',
      branch: '',
      year: null,
      cgpa: '',
      careerGoal: '',
      interests: [],
      skills: []
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      ...formData,
      cgpa: formData.cgpa !== '' && formData.cgpa !== null ? parseFloat(formData.cgpa) : null
    });
    onClose();
  };

  // Suggested skills dynamically generated from the student's selected branch
  const suggestedSkills = formData.branch && BRANCH_SKILL_SUGGESTIONS[formData.branch]
    ? BRANCH_SKILL_SUGGESTIONS[formData.branch]
    : [];
  const unaddedSuggestions = suggestedSkills.filter(s => 
    !formData.skills.some(existing => existing.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#1e293b',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
              padding: '0.4rem',
              borderRadius: '8px'
            }}>
              <GraduationCap size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Student Profile & Academic Criteria
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                OpportunityAI uses your real profile to calculate transparent match scores
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Basic Student Info: Name, Email & CGPA */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                Academic CGPA
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Enter your CGPA (e.g. 8.5)"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                College Email <span style={{ color: '#64748b', fontWeight: 400 }}>(Optional)</span>
              </label>
              <input
                type="email"
                placeholder="Enter your college email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Academic Branch Selection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1' }}>
                Academic Branch / Discipline
              </label>
              <span style={{ fontSize: '0.725rem', color: formData.branch ? '#a5b4fc' : '#64748b' }}>
                {formData.branch ? `Selected: ${formData.branch}` : '(Select your branch)'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {ACADEMIC_BRANCHES.map(branch => {
                const isSelected = formData.branch === branch.code;
                return (
                  <button
                    type="button"
                    key={branch.id}
                    onClick={() => handleBranchChange(branch.code)}
                    style={{
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.5)',
                      color: isSelected ? '#e0e7ff' : '#94a3b8',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s'
                    }}
                  >
                    {branch.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Year Selection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1' }}>
                Current Academic Year
              </label>
              <span style={{ fontSize: '0.725rem', color: formData.year ? '#6ee7b7' : '#64748b' }}>
                {formData.year ? `Selected: Year ${formData.year}` : '(Select your year of study)'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {ACADEMIC_YEARS.map(yr => {
                const isSelected = formData.year === yr.id;
                return (
                  <button
                    type="button"
                    key={yr.id}
                    onClick={() => handleYearChange(yr.id)}
                    style={{
                      padding: '0.5rem 0.5rem',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                      color: isSelected ? '#a7f3d0' : '#94a3b8',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s'
                    }}
                  >
                    {yr.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Career Pathway */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1' }}>
                Primary Career Pathway Goal
              </label>
              <span style={{ fontSize: '0.725rem', color: formData.careerGoal ? '#c7d2fe' : '#64748b' }}>
                {formData.careerGoal ? '' : '(Select target career goal)'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {CAREER_GOALS.map(goal => {
                const isSelected = formData.careerGoal === goal.id;
                return (
                  <button
                    type="button"
                    key={goal.id}
                    onClick={() => handleGoalChange(goal.id)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                      color: isSelected ? '#e0e7ff' : '#94a3b8',
                      fontSize: '0.775rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span>{goal.title}</span>
                    {isSelected && <Check size={14} color="#818cf8" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Skills Management */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1' }}>
                Current Technical Skills ({formData.skills.length})
              </label>
              {formData.skills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, skills: [] }))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Clear all skills
                </button>
              )}
            </div>

            {/* Current skill tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minHeight: '3.75rem',
              alignItems: formData.skills.length === 0 ? 'center' : 'flex-start',
              marginBottom: '0.5rem'
            }}>
              {formData.skills.length === 0 ? (
                <span style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  No skills added yet. Type a skill below or click suggested skills to add.
                </span>
              ) : (
                formData.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'rgba(99, 102, 241, 0.2)',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      color: '#c7d2fe',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.775rem'
                    }}
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#a5b4fc',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add custom skill input */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <input
                type="text"
                placeholder="Enter a skill (e.g. Python, Docker, MATLAB, AutoCAD, React)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                style={{
                  flexGrow: 1,
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.75rem',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>

            {/* Suggested Skills for selected branch */}
            {formData.branch && unaddedSuggestions.length > 0 && (
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  Suggested for {formData.branch} (Click to add):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {unaddedSuggestions.slice(0, 8).map(s => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => handleAddSkill(s)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px dashed rgba(255, 255, 255, 0.15)',
                        color: '#94a3b8',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.725rem',
                        cursor: 'pointer'
                      }}
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!formData.branch && (
              <div style={{ fontSize: '0.725rem', color: '#64748b', fontStyle: 'italic' }}>
                Select your academic branch above to see tailored skill suggestions.
              </div>
            )}
          </div>

          {/* Interests selection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#cbd5e1' }}>
                Academic & Technology Interests ({formData.interests.length} selected)
              </label>
              {formData.interests.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, interests: [] }))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Clear interests
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {COMMON_INTERESTS.map(interest => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: '0.35rem 0.7rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'rgba(15, 23, 42, 0.4)',
                      color: isSelected ? '#e9d5ff' : '#94a3b8',
                      transition: 'all 0.15s'
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Actions with separate Testing / Demo controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Separate Demo/Testing Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleLoadDemoData}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  color: '#94a3b8',
                  fontSize: '0.725rem',
                  cursor: 'pointer'
                }}
                title="Populate sample student data for demonstration/testing"
              >
                Fill Sample Demo
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.725rem',
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                  textDecoration: 'underline'
                }}
                title="Clear all fields"
              >
                Clear All
              </button>
            </div>

            {/* Main Submit & Cancel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                <Check size={16} />
                <span>Save Profile</span>
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'right' }}>
            Profile data is stored locally in your browser (LocalStorage).
          </div>

        </form>

      </div>
    </div>
  );
}
