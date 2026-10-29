import React, { useState } from 'react';
import { Map, CheckCircle2, Circle, Clock, ExternalLink, Sparkles, BookOpen, Layers, Award, Target, HelpCircle } from 'lucide-react';
import { CAREER_ROADMAPS } from '../data/defaultRoadmaps';
import { CAREER_GOALS } from '../data/branchesAndSkills';

export default function LearningRoadmap({
  studentProfile,
  completedMilestones,
  onToggleMilestone,
  highlightedSkills = [],
  onOpenProfile
}) {
  const hasSelectedGoal = Boolean(studentProfile?.careerGoal);
  const currentGoalKey = studentProfile?.careerGoal || 'swe';
  const roadmapData = CAREER_ROADMAPS[currentGoalKey] || CAREER_ROADMAPS.swe;
  const currentGoalMeta = CAREER_GOALS.find(g => g.id === currentGoalKey) || { title: 'Software Development Engineer' };

  const totalMilestones = roadmapData.milestones.length;
  const completedCount = roadmapData.milestones.filter(m => completedMilestones.includes(m.id)).length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem 1.25rem' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              <Target size={15} />
              <span>{hasSelectedGoal ? 'Personalized Career Pathway' : 'Career Pathway Preview (Goal Not Set)'}</span>
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
              {roadmapData.title}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', maxWidth: '650px', lineHeight: 1.5 }}>
              {roadmapData.description}
            </p>
          </div>

          {/* Goal Selector Pill & Progress */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            minWidth: '220px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
              <span>Pathway Progress</span>
              <strong style={{ color: '#34d399' }}>{progressPercent}%</strong>
            </div>

            <div style={{
              height: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #10b981, #38bdf8)',
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                {completedCount} of {totalMilestones} Completed
              </span>
              <button
                onClick={onOpenProfile}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#818cf8',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {hasSelectedGoal ? 'Change Pathway' : 'Select Pathway'}
              </button>
            </div>
          </div>
        </div>

        {/* Notice for new students who have not yet set a career goal */}
        {!hasSelectedGoal && (
          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#e0e7ff' }}>
              <Sparkles size={16} color="#818cf8" style={{ flexShrink: 0 }} />
              <span>You have not selected a career goal yet. Viewing the Software Engineering pathway preview.</span>
            </div>
            <button
              onClick={onOpenProfile}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              Choose Your Goal in Profile
            </button>
          </div>
        )}

        {/* Dynamic Highlighted Skills Notice */}
        {highlightedSkills.length > 0 && (
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#fcd34d' }}>
              🎯 Target Skills From Your Opportunities:
            </span>
            {highlightedSkills.map(skill => (
              <span key={skill} style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
                fontSize: '0.725rem',
                fontWeight: 600,
                padding: '0.15rem 0.5rem',
                borderRadius: '6px'
              }}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Roadmap Timeline / Milestone Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {roadmapData.milestones.map((milestone, index) => {
          const isDone = completedMilestones.includes(milestone.id);

          return (
            <div
              key={milestone.id}
              style={{
                background: isDone ? 'rgba(16, 185, 129, 0.04)' : 'rgba(30, 41, 59, 0.6)',
                border: isDone ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Milestone Top Bar */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  
                  {/* Interactive Completion Checkbox */}
                  <button
                    onClick={() => onToggleMilestone(milestone.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '0.15rem'
                    }}
                    title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {isDone ? (
                      <CheckCircle2 size={24} color="#10b981" />
                    ) : (
                      <Circle size={24} color="#64748b" />
                    )}
                  </button>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {milestone.phase}
                    </div>
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: isDone ? '#94a3b8' : '#fff',
                      textDecoration: isDone ? 'line-through' : 'none'
                    }}>
                      {milestone.title}
                    </h3>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px'
                }}>
                  <Clock size={13} />
                  <span>{milestone.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.85rem',
                color: '#cbd5e1',
                lineHeight: 1.5,
                marginBottom: '1rem',
                paddingLeft: '2.25rem'
              }}>
                {milestone.description}
              </p>

              {/* Skills Learned Badges */}
              <div style={{ paddingLeft: '2.25rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.725rem', color: '#64748b' }}>Key Skills:</span>
                  {milestone.skillsTaught.map(skill => {
                    const isTarget = highlightedSkills.includes(skill);
                    return (
                      <span
                        key={skill}
                        style={{
                          background: isTarget ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.12)',
                          border: isTarget ? '1px solid #f59e0b' : '1px solid rgba(99, 102, 241, 0.25)',
                          color: isTarget ? '#fcd34d' : '#c7d2fe',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.725rem',
                          fontWeight: isTarget ? 700 : 500
                        }}
                      >
                        {isTarget ? `★ ${skill}` : skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Two Column Section: Free Curated Resources & Project Idea */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                paddingLeft: '2.25rem'
              }}>
                
                {/* Free Learning Resources */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#93c5fd', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={14} />
                    <span>Free Curated Learning Resources</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {milestone.freeResources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.775rem',
                          color: '#cbd5e1',
                          textDecoration: 'none',
                          padding: '0.25rem 0.4rem',
                          borderRadius: '4px',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          • {res.title}
                        </span>
                        <span style={{
                          fontSize: '0.675rem',
                          color: '#818cf8',
                          background: 'rgba(99, 102, 241, 0.1)',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '4px',
                          marginLeft: '0.5rem'
                        }}>
                          {res.type} ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Practical Milestone Project Idea */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#34d399', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Award size={14} />
                    <span>Milestone Portfolio Project Idea</span>
                  </div>
                  <p style={{ fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    {milestone.projectIdea}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
