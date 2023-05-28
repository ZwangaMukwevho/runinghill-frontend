export function mapWordTypeToIndex(wordType) {
  const wordTypeMap = {
    Verb: 0,
    Noun: 1,
    Adjective: 2,
    Adverb: 3,
    Pronoun: 4,
    Preposition: 5,
    Conjunction: 6,
    Determiner: 7,
    Exclamation: 8,
  };

  return wordTypeMap[wordType] || 9;
}
