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

export default function Home2() {
  const initialSelectedValues = ["", "", "", "", "", "", "", "", ""];

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [sentences, setSentences] = useState([]);
  const [sentenceArray, setSentenceArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError(formatErrorMessage("uploadError"));
    }
  };

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
