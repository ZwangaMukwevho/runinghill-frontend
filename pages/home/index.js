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
import postSentence from "../../logic/postSentence";
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
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDropdownChange = (index, value) => {
    setSentenceArray((sentenceArray) => [...sentenceArray, value]);

    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSentenceSubmit = async () => {
    var statusCode;
    const sentence = ConstructSentence(sentenceArray);
    setSentences((prevSentences) => [...prevSentences, sentence]);

    setSentenceArray([]);
    setSelectedValues(initialSelectedValues);

    try {
      statusCode = await postSentence(sentence);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getWordList() {
      try {
        var type;
        var tempArr = [];
        for (let i = 0; i < labels.length; i++) {
          type = labels[i];

          const response = await axios.get(`api/words?type=${type}`);
          const wordsArray = await extractWords(response.data);
          tempArr.push(wordsArray);
        }

        setOptions(tempArr);
        setLoading(false);
        console.log("done");
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
    getWordList();
  }, []);

  console.log("test");
  console.log(options);

  return (
    <Layout>
      {loading ? (
        <div>loading</div>
      ) : (
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
      )}
    </Layout>
  );
}
