/**
 * Explainable Matching Engine & Strict Eligibility Checker
 * Calculates transparent scores and reasons for students across all engineering branches.
 */

export function evaluateOpportunityMatch(studentProfile, opportunity) {
  const profile = studentProfile || {};
  const studentBranch = (profile.branch || '').toUpperCase();
  const studentYear = profile.year ? Number(profile.year) : null;
  const studentCgpa = profile.cgpa !== '' && profile.cgpa !== null && profile.cgpa !== undefined ? Number(profile.cgpa) : null;
  const studentSkills = (profile.skills || []).map(s => s.toLowerCase().trim());
  const studentInterests = (profile.interests || []).map(i => i.toLowerCase().trim());

  // 1. ================= STRICT ELIGIBILITY CHECKS =================
  const eligibilityReasons = [];
  let isEligible = true;

  // Branch check
  const allowedBranches = opportunity.eligibleBranches || ['All Branches'];
  const isBranchAll = allowedBranches.some(b => b.toLowerCase().includes('all'));
  const isBranchDirect = studentBranch ? allowedBranches.includes(studentBranch) : false;

  if (isBranchAll) {
    eligibilityReasons.push({
      rule: 'Branch Requirement',
      passed: true,
      text: 'Open to all academic engineering branches.'
    });
  } else if (!studentBranch) {
    // If student hasn't selected their branch yet, show requirement guidance
    eligibilityReasons.push({
      rule: 'Branch Requirement',
      passed: true,
      text: `Requires: ${allowedBranches.join(', ')}. Set your branch in profile to verify exact match.`
    });
  } else if (isBranchDirect) {
    eligibilityReasons.push({
      rule: 'Branch Requirement',
      passed: true,
      text: `Your branch (${studentBranch}) directly matches the required branches: ${allowedBranches.join(', ')}.`
    });
  } else {
    isEligible = false;
    eligibilityReasons.push({
      rule: 'Branch Requirement',
      passed: false,
      text: `Targeted specifically for: ${allowedBranches.join(', ')}. Your branch is ${studentBranch}.`
    });
  }

  // Academic Year check
  const allowedYears = opportunity.eligibleYears || [1, 2, 3, 4];
  let isYearEligible = false;

  if (!studentYear) {
    // If student hasn't selected their year yet, show cohort guidance
    eligibilityReasons.push({
      rule: 'Academic Year',
      passed: true,
      text: `Accepts: ${allowedYears.map(y => `Yr ${y}`).join(', ')}. Set your year in profile to verify fit.`
    });
  } else {
    isYearEligible = allowedYears.includes(studentYear);
    if (isYearEligible) {
      eligibilityReasons.push({
        rule: 'Academic Year',
        passed: true,
        text: `Year ${studentYear} is eligible (Accepts: ${allowedYears.map(y => `Yr ${y}`).join(', ')}).`
      });
    } else {
      isEligible = false;
      const yearDiff = Math.min(...allowedYears) - studentYear;
      eligibilityReasons.push({
        rule: 'Academic Year',
        passed: false,
        text: yearDiff > 0 
          ? `Requires Year ${allowedYears.join(' or ')}. You can prepare now for next year!`
          : `Targeted at earlier cohorts (${allowedYears.join(', ')}).`
      });
    }
  }

  // Minimum CGPA check
  const minCgpa = Number(opportunity.minCgpa) || 0;
  if (minCgpa > 0) {
    if (studentCgpa === null || isNaN(studentCgpa)) {
      eligibilityReasons.push({
        rule: 'Academic Standing (CGPA)',
        passed: true,
        text: `Minimum CGPA of ${minCgpa.toFixed(1)} required. Add your CGPA in profile to confirm.`
      });
    } else {
      const isCgpaOk = studentCgpa >= minCgpa;
      if (isCgpaOk) {
        eligibilityReasons.push({
          rule: 'Academic Standing (CGPA)',
          passed: true,
          text: `Your CGPA (${studentCgpa.toFixed(1)}) meets the minimum ${minCgpa.toFixed(1)} threshold.`
        });
      } else {
        isEligible = false;
        eligibilityReasons.push({
          rule: 'Academic Standing (CGPA)',
          passed: false,
          text: `Minimum CGPA of ${minCgpa.toFixed(1)} required (Current: ${studentCgpa.toFixed(1)}).`
        });
      }
    }
  }

  // 2. ================= EXPLAINABLE SCORING COMPONENTS =================
  const requiredSkills = opportunity.requiredSkills || [];
  const preferredSkills = opportunity.preferredSkills || [];

  const matchedRequired = [];
  const missingRequired = [];
  requiredSkills.forEach(req => {
    const hasSkill = studentSkills.includes(req.toLowerCase().trim());
    if (hasSkill) matchedRequired.push(req);
    else missingRequired.push(req);
  });

  const matchedPreferred = [];
  const missingPreferred = [];
  preferredSkills.forEach(pref => {
    const hasSkill = studentSkills.includes(pref.toLowerCase().trim());
    if (hasSkill) matchedPreferred.push(pref);
    else missingPreferred.push(pref);
  });

  // A. Skill Score (Max 40 points)
  let skillPoints = 0;
  const totalRequired = requiredSkills.length;
  const totalPreferred = preferredSkills.length;

  if (studentSkills.length > 0) {
    if (totalRequired > 0) {
      skillPoints += (matchedRequired.length / totalRequired) * 28;
    } else {
      skillPoints += 28;
    }

    if (totalPreferred > 0) {
      skillPoints += (matchedPreferred.length / totalPreferred) * 12;
    } else {
      skillPoints += 12;
    }
  } else {
    // If student has not entered any skills yet, skill points are 0
    skillPoints = 0;
  }
  skillPoints = Math.round(skillPoints);

  // B. Branch Relevance (Max 25 points)
  let branchPoints = 5;
  if (!studentBranch) {
    branchPoints = isBranchAll ? 15 : 5;
  } else if (isBranchDirect) {
    branchPoints = 25;
  } else if (isBranchAll) {
    branchPoints = 22;
  } else {
    // Allied branch partial check (e.g., ECE <-> EEE, CSE <-> AIML)
    const alliedGroups = [
      ['CSE', 'IT', 'AIML', 'DS'],
      ['ECE', 'EEE'],
      ['MECH', 'EEE']
    ];
    const isAllied = alliedGroups.some(group => 
      group.includes(studentBranch) && allowedBranches.some(b => group.includes(b))
    );
    if (isAllied) branchPoints = 16;
  }

  // C. Interest & Domain Alignment (Max 20 points)
  const oppKeywords = [
    ...(opportunity.tags || []),
    opportunity.title,
    opportunity.summary
  ].join(' ').toLowerCase();

  let matchedInterestCount = 0;
  studentInterests.forEach(interest => {
    const tokens = interest.split(' ').map(t => t.toLowerCase());
    const matches = tokens.some(t => t.length > 3 && oppKeywords.includes(t));
    if (matches) matchedInterestCount++;
  });

  const interestPoints = studentInterests.length > 0 
    ? Math.min(20, Math.round((matchedInterestCount / Math.max(1, studentInterests.length)) * 20) + (matchedInterestCount > 0 ? 5 : 0))
    : 0;

  // D. Academic Year Fit (Max 15 points)
  let yearPoints = 5;
  if (studentYear) {
    if (isYearEligible) {
      yearPoints = 15;
    } else if (allowedYears.some(y => Math.abs(y - studentYear) === 1)) {
      yearPoints = 8;
    }
  }

  // Total Score (0 - 100)
  const totalScore = Math.min(100, Math.max(0, skillPoints + branchPoints + interestPoints + yearPoints));

  let matchTier = 'Exploratory Match';
  let tierColor = 'slate';
  if (totalScore >= 80) {
    matchTier = 'Exceptional Match';
    tierColor = 'emerald';
  } else if (totalScore >= 65) {
    matchTier = 'Strong Match';
    tierColor = 'indigo';
  } else if (totalScore >= 45) {
    matchTier = 'Good Potential';
    tierColor = 'amber';
  }

  return {
    score: totalScore,
    matchTier,
    tierColor,
    isEligible,
    eligibilityReasons,
    breakdown: {
      skills: { points: skillPoints, max: 40, label: 'Skill Overlap' },
      branch: { points: branchPoints, max: 25, label: 'Branch Fit' },
      interest: { points: interestPoints, max: 20, label: 'Interest Alignment' },
      year: { points: yearPoints, max: 15, label: 'Year Cohort Fit' }
    },
    skillsAnalysis: {
      matchedRequired,
      missingRequired,
      matchedPreferred,
      missingPreferred,
      allMissing: [...missingRequired, ...missingPreferred],
      allMatched: [...matchedRequired, ...matchedPreferred]
    }
  };
}
