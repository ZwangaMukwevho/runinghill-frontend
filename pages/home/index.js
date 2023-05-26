import React, { useState, useEffect } from "react";
import Dropdown from "../../components/main/dropdown";
import Layout from "../../components/layout/layout";
import { ClassNames } from "@emotion/react";
import classes from "./home.module.css";
import SentenceBox from "../../components/main/sentenceBox";
import SubmitButton from "../../components/main/submitButton";
import Box from "@mui/material/Box";
import SentencesContainer from "../../components/main/sentencesContainer";
import ConstructSentence from "../../logic/constructSentence";

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

  useEffect(() => {
    fetchWordOptions();
  }, []);

  const fetchWordOptions = async () => {
    try {
      const optionsPromises = labels.map((type) =>
        fetch(`/api/words?type=${type}`).then((res) => res.json())
      );
      const options = await Promise.all(optionsPromises);
      setSelectedValues(options.map(() => ""));
    } catch (error) {
      console.error("Failed to fetch word options:", error);
    }
  };

  const initialSelectedValues = ["", "", "", "", "", "", "", "", ""];

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [sentences, setSentences] = useState([]);
  const [sentenceArray, setSentenceArray] = useState([]);

  const handleDropdownChange = (index, value) => {
    setSentenceArray((sentenceArray) => [...sentenceArray, value]);

    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSentenceSubmit = () => {
    setSentences((prevSentences) => [
      ...prevSentences,
      ConstructSentence(sentenceArray),
    ]);
    setSentenceArray([]);
    setSelectedValues(initialSelectedValues);
  };

  return (
    <Layout>
      <div className={classes.mainContainer}>
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
        </div>

        <SentenceBox sentence={ConstructSentence(sentenceArray)} />
        <SubmitButton onSubmit={handleSentenceSubmit} />

        {sentences.length > 0 && (
          <Box sx={{ marginTop: "1rem" }}>
            {sentences.map((sentence, index) => (
              <div key={index}>
                <SentencesContainer sentence={sentence}></SentencesContainer>
              </div>
            ))}
          </Box>
        )}
      </div>
    </Layout>
  );
}
