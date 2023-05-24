import React, { useState } from "react";
import Box from "@mui/material/Box";

const SentencesContainer = () => {
  const [sentences, setSentences] = useState([]);

  const handleSentenceSubmit = () => {
    // Logic to generate the sentence from the selected dropdown values
    const sentence = "Your constructed sentence here";

    setSentences((prevSentences) => [...prevSentences, sentence]);
  };

  return (
    <div>
      <button onClick={handleSentenceSubmit}>Submit</button>

      {sentences.map((sentence, index) => (
        <Box
          key={index}
          sx={{
            marginTop: "1rem",
            backgroundColor: "#f5f5f5",
            padding: "10px",
          }}
        >
          {sentence}
        </Box>
      ))}
    </div>
  );
};

export default SentencesContainer;
