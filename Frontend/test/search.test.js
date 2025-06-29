import { expect } from 'chai';
import { filterEntriesByQuery } from '../src/utils/search.js';

describe('filterEntriesByQuery', () => {
  const entries = [
    {
      title: "Happy Day",
      content: "I went to the park!",
      tags: ["joy", "sun"],
      date: "2025-06-28T12:00:00Z"
    },
    {
      title: "Sad Night",
      content: "It rained all day...",
      tags: ["rain", "gloom"],
      date: "2025-06-27T12:00:00Z"
    },
    {
      title: "Neutral Entry",
      content: "Just another day...",
      tags: ["routine", "rain"],
      date: "2025-06-29T12:00:00Z"
    }
  ];

  it('filters by title', () => {
    const result = filterEntriesByQuery(entries, "happy");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Happy Day");
  });

  it('filters by content', () => {
    const result = filterEntriesByQuery(entries, "park");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Happy Day");
  });

  it('filters by tag', () => {
    const result = filterEntriesByQuery(entries, "gloom");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Sad Night");
  });

  it('filters by multiple terms in the title (partial matches)', () => {
    const result = filterEntriesByQuery(entries, "da hap");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Happy Day");
  });

  it('filters by multiple terms in the content (partial matches)', () => {
    const result = filterEntriesByQuery(entries, "jus ay");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Neutral Entry");
  });

  it('filters by multiple terms in the tags (partial matches)', () => {
    const result = filterEntriesByQuery(entries, "rai gloo");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Sad Night");
  });

  it('returns a match with punctuation-only query', () => {
    const result = filterEntriesByQuery(entries, "!");
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("Happy Day");
  });

  it('returns multiple matches, sorted by date (newest first)', () => {
    const result = filterEntriesByQuery(entries, "rain");
    expect(result).to.have.lengthOf(2);
    expect(result[0].title).to.equal("Neutral Entry");
    expect(result[1].title).to.equal("Sad Night");
  });

  it('returns all entries for empty query, sorted by date (newest first)', () => {
    const result = filterEntriesByQuery(entries, "");
    expect(result).to.have.lengthOf(3);
    expect(result[0].title).to.equal("Neutral Entry");
    expect(result[1].title).to.equal("Happy Day");
    expect(result[2].title).to.equal("Sad Night");
  });

  it('returns an empty array if no matches found', () => {
    const result = filterEntriesByQuery(entries, "abcd");
    expect(result).to.have.lengthOf(0);
  });
});