export default async function extractWords(array) {
  return array.map((item) => item.word.toLowerCase());
}
