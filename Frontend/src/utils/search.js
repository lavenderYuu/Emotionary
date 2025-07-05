// Filter entries based on search query, then sort by date (newest first)
export function filterEntriesByQuery(entries, query) {
  // Split the query into individual terms
  const terms = query.toLowerCase().split(" ").filter(term => term.trim() !== "");
  
  // Check if each query term is present in each entry's title, content, or tags
  return entries.filter(entry =>
    terms.every(term =>
      entry.title?.toLowerCase().includes(term) ||
      entry.content?.toLowerCase().includes(term) ||
      (Array.isArray(entry.tags) && entry.tags.some(tag => tag.name?.toLowerCase().includes(term)))
    )
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
}