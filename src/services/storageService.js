/**
 * LocalStorage management for student profile, saved opportunities, and roadmap progress.
 * Provides resilient fallbacks if localStorage is restricted.
 * Note: Data is saved to client-side browser localStorage, not a remote backend database.
 */

const STORAGE_KEYS = {
  PROFILE: 'opportunity_ai_student_profile_v2',
  LEGACY_PROFILE: 'opportunity_ai_student_profile_v1',
  SAVED_OPPORTUNITIES: 'opportunity_ai_saved_opps_v1',
  COMPLETED_MILESTONES: 'opportunity_ai_completed_milestones_v1'
};

/**
 * Standard blank initial profile for a new student.
 * All fields are empty by default so students enter their own details.
 */
export const EMPTY_STUDENT_PROFILE = {
  fullName: '',
  email: '',
  branch: '',
  year: null,
  cgpa: '',
  careerGoal: '',
  interests: [],
  skills: []
};

/**
 * Standalone demo dataset strictly for testing and demonstrations.
 * Kept separate from the normal student experience.
 */
export const SAMPLE_DEMO_PROFILE = {
  fullName: 'Alex Sharma',
  email: 'alex.sharma@college.edu',
  branch: 'CSE',
  year: 2,
  cgpa: 8.2,
  careerGoal: 'swe',
  interests: ['Artificial Intelligence', 'Full Stack Web Development', 'Open Source Software'],
  skills: ['Python', 'Data Structures', 'Git', 'JavaScript', 'SQL']
};

// Kept for backward compatibility with existing imports; points to the blank student profile
export const DEFAULT_STUDENT_PROFILE = EMPTY_STUDENT_PROFILE;

export function getStudentProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...EMPTY_STUDENT_PROFILE, ...parsed };
    }

    // Inspect legacy storage key for migration or cleanup of old hardcoded mock
    const legacyRaw = localStorage.getItem(STORAGE_KEYS.LEGACY_PROFILE);
    if (legacyRaw) {
      const legacyParsed = JSON.parse(legacyRaw);
      // If legacy profile matches the old hardcoded sample student, clear it for new student experience
      if (
        legacyParsed &&
        legacyParsed.fullName === 'Alex Sharma' &&
        legacyParsed.email === 'alex.sharma@college.edu' &&
        !legacyParsed.isExplicitDemo
      ) {
        localStorage.removeItem(STORAGE_KEYS.LEGACY_PROFILE);
        return { ...EMPTY_STUDENT_PROFILE };
      }
      // If it contains custom student details, migrate to v2 key
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(legacyParsed));
      return { ...EMPTY_STUDENT_PROFILE, ...legacyParsed };
    }

    return { ...EMPTY_STUDENT_PROFILE };
  } catch (err) {
    console.warn('Could not read student profile from localStorage:', err);
    return { ...EMPTY_STUDENT_PROFILE };
  }
}

export function saveStudentProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.warn('Could not save student profile to localStorage:', err);
  }
}

export function getSavedOpportunityIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_OPPORTUNITIES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read saved opportunities:', err);
    return [];
  }
}

export function toggleSaveOpportunity(oppId) {
  try {
    const saved = getSavedOpportunityIds();
    const index = saved.indexOf(oppId);
    let updated;
    if (index >= 0) {
      updated = saved.filter(id => id !== oppId);
    } else {
      updated = [...saved, oppId];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_OPPORTUNITIES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Could not toggle opportunity save state:', err);
    return [];
  }
}

export function getCompletedMilestones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_MILESTONES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read completed milestones:', err);
    return [];
  }
}

export function toggleMilestoneCompleted(milestoneId) {
  try {
    const completed = getCompletedMilestones();
    const index = completed.indexOf(milestoneId);
    let updated;
    if (index >= 0) {
      updated = completed.filter(id => id !== milestoneId);
    } else {
      updated = [...completed, milestoneId];
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MILESTONES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Could not toggle milestone status:', err);
    return [];
  }
}

/**
 * Resets student profile and stored bookmarks to empty state for a new student.
 */
export function resetDemoData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SAVED_OPPORTUNITIES);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_MILESTONES);
    return {
      profile: { ...EMPTY_STUDENT_PROFILE },
      savedIds: [],
      milestones: []
    };
  } catch (err) {
    console.warn('Reset error:', err);
    return null;
  }
}

/**
 * Populates sample demo data strictly for demonstration and testing.
 */
export function loadSampleDemoData() {
  try {
    const demoProfile = { ...SAMPLE_DEMO_PROFILE, isExplicitDemo: true };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(demoProfile));
    localStorage.setItem(STORAGE_KEYS.SAVED_OPPORTUNITIES, JSON.stringify(['opp-int-01', 'opp-hack-01']));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MILESTONES, JSON.stringify(['swe-m1']));
    return {
      profile: demoProfile,
      savedIds: ['opp-int-01', 'opp-hack-01'],
      milestones: ['swe-m1']
    };
  } catch (err) {
    console.warn('Load sample demo error:', err);
    return null;
  }
}
