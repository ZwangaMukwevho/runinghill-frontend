import React, { useState } from "react";
import Dropdown from "../../components/main/dropdown";
import Layout from "../../components/layout/layout";
import { ClassNames } from "@emotion/react";
import classes from "./home.module.css";

export default function Home2() {
  const labels = [
    "Verbs",
    "Nouns",
    "Adjectives",
    "Adverbs",
    "Pronouns",
    "Prepositions",
    "Conjunctions",
    "Determiners",
    "Exclamations",
  ];

  const options = [
    ["run", "climb", "laugh", "cry", "jump"], // Verbs
    ["house", "Audi", "ChatGPT", "Laptop", "Juice"], // Nouns
    ["happy", "sad", "angry", "excited", "tired"], // Adjectives
    ["quickly", "slowly", "happily", "sadly", "loudly"], // Adverbs
    ["he", "she", "they", "it", "we"], // Pronouns
    ["above", "below", "beside", "behind", "within"], // Prepositions
    ["and", "but", "or", "so", "because"], // Conjunctions
    ["the", "a", "this", "that", "each"], // Determiners
    ["wow", "ouch", "oh", "ah", "bravo"], // Exclamations
  ];

  const initialSelectedValues = ["", "", "", "", "", "", "", "", ""];

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [sentence, setSentence] = useState("");

  const handleDropdownChange = (index, value) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    setSentence((prevSentence) => {
      const updatedSentence = [...prevSentence];
      updatedSentence[index] = value;
      return updatedSentence.filter(Boolean).join(" ");
    });
  };

  return (
    <Layout>
      <div className={classes.dropdownContainer}>
        {options.map((dropdownOptions, index) => (
          <div className={classes.dropdownItem}>
            <Dropdown
              key={index}
              options={dropdownOptions}
              label={labels[index]}
              value={selectedValues[index]}
              onChange={(e) => handleDropdownChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="sentence">{sentence}</div>
        <style jsx>{`
          .dropdown-container {
            display: flex;
            flex-wrap: wrap;
          }
          .sentence {
            margin-top: 1rem;
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    </Layout>
  );
}
