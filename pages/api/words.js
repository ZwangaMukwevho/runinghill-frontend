import axios from "axios";

export default async function handler(req, res) {
  const { type } = req.query;
  co;
  try {
    const response = await axios.get(`http://localhost:8080/words/${type}`);
    const wordArray = response.data;
    res.status(200).json(wordArray);
  } catch (error) {
    console.error("Error occured fetching words with:", error);
    res.status(500).json({ error: error });
  }
}
