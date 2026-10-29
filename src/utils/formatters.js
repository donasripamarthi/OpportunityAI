/**
 * Presentation helper formatters for dates, categories, badges, and deadlines
 */

export function formatDate(dateString) {
  if (!dateString) return 'Ongoing';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(dateString) {
  if (!dateString) return null;
  try {
    const target = new Date(dateString).getTime();
    const now = new Date('2026-10-25').getTime(); // Based on current workspace context
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Expired';
    if (days === 0) return 'Deadline Today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  } catch {
    return null;
  }
}

export const CATEGORY_META = {
  all: { label: 'All Opportunities', color: 'indigo' },
  internship: { label: 'Internships', color: 'blue' },
  hackathon: { label: 'Hackathons', color: 'purple' },
  workshop: { label: 'Workshops', color: 'emerald' },
  course: { label: 'Courses', color: 'amber' },
  scholarship: { label: 'Scholarships', color: 'rose' }
};
