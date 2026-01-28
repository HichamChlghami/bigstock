// Basic slugify for simple cases
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

// Advanced unique slug generator based on specific business rules
export const generateUniqueSlug = (title: string, existingSlugs: string[]): string => {
  if (!title) return '';

  // Normalize: lowercase, remove special chars, split by space
  const cleanTitle = title.toLowerCase().replace(/[^\w\s-]/g, '').trim();
  const words = cleanTitle.split(/\s+/).filter(w => w.length > 0);
  
  if (words.length === 0) return `product-${Date.now()}`;

  // Rule 1: Take first 3 words (or fewer if title is short)
  const limit = Math.min(words.length, 3);
  let candidate = words.slice(0, limit).join('-');
  
  // Check uniqueness
  if (!existingSlugs.includes(candidate)) {
    return candidate;
  }

  // Rule 2: If exists, try taking 4 words (if available)
  if (words.length >= 4) {
    const candidate4 = words.slice(0, 4).join('-');
    if (!existingSlugs.includes(candidate4)) {
      return candidate4;
    }
    // If 4 words also exist, we will use the 4-word version as base for numbering
    candidate = candidate4;
  }

  // Rule 3: Append number (1, 2, 3...) until unique
  let counter = 1;
  while (true) {
    const numberedCandidate = `${candidate}-${counter}`;
    if (!existingSlugs.includes(numberedCandidate)) {
      return numberedCandidate;
    }
    counter++;
  }
};
