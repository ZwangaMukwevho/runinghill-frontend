import React, { useState, useEffect } from "react";
import Dropdown from "../../components/main/dropdown";
import Layout from "../../components/layout/layout";
import classes from "./home.module.css";
import SentenceBox from "../../components/main/sentenceBox";
import SubmitButton from "../../components/main/submitButton";
import ConstructSentence from "../../logic/constructSentence";
import postSentence from "../../logic/postSentence";
import fetchSentences from "../../logic/fetchSentences";
import Loader from "../../components/main/loader";
import { formatErrorMessage } from "../../logic/error/formatError";
import getWords from "../../logic/getWords";
import SentencesTable from "../../components/main/sentencesTable";
import labels from "../../configs/labels.json";
import { mapWordTypeToIndex } from "../../logic/mapWordTypeToIndex";

export default function Home2() {
  const initialSelectedValues = ["", ""];

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [sentences, setSentences] = useState([]);
  const [sentenceArray, setSentenceArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wordsList, setSelectedWordList] = useState([]);

  // Saves values chosen on dropdowns for word types
  const handleTypeDropdownChange = (index, value) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    const wordIndex = mapWordTypeToIndex(value);

    if (wordIndex === 9) {
      setSelectedWordList([]);
    } else {
      setSelectedWordList(options[wordIndex]);
    }
  };

  // Saves values chosen on dropdowns for words
  const handleWordDropDownChange = (index, value) => {
    setSentenceArray((sentenceArray) => [...sentenceArray, value]);

    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  // Called when submit button is clicked
  const handleSentenceSubmit = async () => {
    var statusCode;
    const sentence = ConstructSentence(sentenceArray);
    setSentences((prevSentences) => [...prevSentences, sentence]);

    setSentenceArray([]);
    setSelectedValues(initialSelectedValues);

    try {
      statusCode = await postSentence(sentence);
    } catch (error) {
      setError(formatErrorMessage("uploadError"));
    }
  };

  // Cal this use effect statement once on mount
  useEffect(() => {
    async function getWordList() {
      try {
        var tempArr = [];
        var existingSentences;

        tempArr = await getWords(labels);
        existingSentences = await fetchSentences();
        setSentences(existingSentences);
        setOptions(tempArr);
        setLoading(false);
      } catch (error) {
        setError(formatErrorMessage("fetchError"));
        setLoading(false);
      }
    }
    getWordList();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader bool={loading} />
      ) : (
        <div className={classes.mainContainer}>
          <h3>Construct sentence from dropdowns</h3>
          <div className={classes.dropdownContainer}>
            <div className={classes.dropdownItem}>
              <Dropdown
                options={labels}
                label="Word Type"
                value={selectedValues[0]}
                onChange={(e) => handleTypeDropdownChange(0, e.target.value)}
              />
            </div>

            <div className={classes.dropdownItem}>
              <Dropdown
                options={wordsList}
                label="Words"
                value={selectedValues[1]}
                onChange={(e) => handleWordDropDownChange(1, e.target.value)}
              />
            </div>
          </div>

          <SentenceBox sentence={ConstructSentence(sentenceArray)} />

          <SubmitButton onSubmit={handleSentenceSubmit} />

          <h3>Sentences submitted previously</h3>
          <SentencesTable loading={loading} sentences={sentences} />

          <div>
            <p className={classes.errorMessage}>{error}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
