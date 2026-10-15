/**
 * Utility helper functions for candidate.ph
 */

/**
 * Format a string as a proper noun (Title Case for every word)
 * Handles emails, dot-separated names, lowercase or uppercase strings,
 * and compound Philippine surnames (e.g. delacruz -> Dela Cruz).
 * e.g. "juan dela cruz" -> "Juan Dela Cruz"
 *      "juan.delacruz" -> "Juan Dela Cruz"
 *      "JUAN DELA CRUZ" -> "Juan Dela Cruz"
 */
export function formatProperName(name) {
  if (!name || typeof name !== 'string') return 'Juan Dela Cruz';
  
  // If input looks like an email prefix, replace dots and underscores with spaces
  let cleaned = name.trim().replace(/[._-]+/g, ' ');
  
  // Handle common Filipino compound surnames if joined together
  cleaned = cleaned
    .replace(/\b(dela)(cruz)\b/gi, '$1 $2')
    .replace(/\b(delos)(reyes|santos)\b/gi, '$1 $2')
    .replace(/\b(del)(rosario|mundo)\b/gi, '$1 $2');
  
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
