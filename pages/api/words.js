import axios from "axios";

export default async function handler(req, res) {
  const { type } = req.query;

  if (req.method === "GET") {
    try {
      const response = await axios.get(`http://localhost:8080/words/${type}`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch word.");
      }

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error occured fetching words with:", error);
      res.status(500).json({ error: `error getting words of type: ${type}` });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
