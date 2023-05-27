import React, { useState, useEffect } from "react";
import Dropdown from "../../components/main/dropdown";
import Layout from "../../components/layout/layout";
import classes from "./home.module.css";
import SentenceBox from "../../components/main/sentenceBox";
import SubmitButton from "../../components/main/submitButton";
import Box from "@mui/material/Box";
import SentencesContainer from "../../components/main/sentencesContainer";
import ConstructSentence from "../../logic/constructSentence";
import extractWords from "../../logic/extractWords";
import axios from "axios";

export default function Home2() {
  const labels = [
    "Verb",
    "Noun",
    "Adjective",
    "Adverb",
    "Pronoun",
    "Preposition",
    "Conjunction",
    "Determiner",
    "Exclamation",
  ];

  const initialSelectedValues = ["", "", "", "", "", "", "", "", ""];

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [sentences, setSentences] = useState([]);
  const [sentenceArray, setSentenceArray] = useState([]);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = [
    ["run", "climb", "laugh", "cry", "jump"], // Verbs
    ["run", "climb", "laugh", "cry", "jump"], // Nouns
    ["happy", "sad", "angry", "excited", "tired"], // Adjectives
    ["quickly", "slowly", "happily", "sadly", "loudly"], // Adverbs
    ["he", "she", "they", "it", "we"], // Pronouns
    ["above", "below", "beside", "behind", "within"], // Prepositions
    ["and", "but", "or", "so", "because"], // Conjunctions
    ["the", "a", "this", "that", "each"], // Determiners
    ["wow", "ouch", "oh", "ah", "bravo"], // Exclamations
  ];

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

  useEffect(() => {
    async function getWordList() {
      try {
        var type;
        var tempArr = [];
        for (let i = 0; i < options.length; i++) {
          type = labels[i];

          const response = await axios.get(`api/words?type=${type}`);
          const wordsArray = await extractWords(response.data);
          // console.log("WordsArray");
          // console.log(wordsArray);
          tempArr.push(wordsArray);
        }

        setTest(tempArr);
        setLoading(false);
        console.log("done");
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
    getWordList();
  }, []);

  // const fetchWords = async () => {
  //   try {
  //     const optionsPromises = labels.map((type) =>
  //     fetch(`/api/words?type=${type}`).then((res) => res.json())xcdxg
  //   );
  //   const options = await Promise.all(optionsPromises);
  //   setSelectedValues(options.map(() => ''));
  //   } catch (error) {
  //     console.error("failed to fetch word options: ", error);
  //   }
  // };

  console.log("test");
  console.log(test);

  // console.log("loading");
  // console.log(loading);

  return (
    <Layout>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className={classes.mainContainer}>
          <div className={classes.dropdownContainer}>
            {test.map((dropdownOptions, index) => (
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
      )}
    </Layout>
  );
}
