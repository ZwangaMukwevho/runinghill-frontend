import axios from "axios";

export default async function fetchSentences() {
  const response = await axios.get(`api/sentences`);
  return response.data.map((item) => item.sentence.toLowerCase());
}
