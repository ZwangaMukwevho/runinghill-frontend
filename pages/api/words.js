import axios from "axios";

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    const response = await axios.get(`http://localhost:8080/words/${type}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error occured fetching words with:", error);
    res.status(500).json({ error: error });
  }
}
