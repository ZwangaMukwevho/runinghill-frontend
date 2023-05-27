import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, sentence, userid } = req.body;

    // Create the payload object
    const payload = [{ id, sentence, userid }];
    console.log(payload);
    try {
      const response = await axios.post(
        "http://localhost:8080/sentences",
        payload
      );

      if (response.status !== 200) {
        throw new Error("Failed to post sentence.");
      }

      res.status(200).json({ message: "Sentence posted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while posting the sentence." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
