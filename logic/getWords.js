import axios from "axios";
import extractWords from "./extractWords";

export default async function getWords(labels) {
  var tempArr = [];
  var type;
  for (let i = 0; i < labels.length; i++) {
    type = labels[i];

    const response = await axios.get(`api/words?type=${type}`);
    const wordsArray = await extractWords(response.data);
    tempArr.push(wordsArray);
  }
  return tempArr;
}
