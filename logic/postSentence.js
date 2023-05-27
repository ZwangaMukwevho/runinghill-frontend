import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default async function postSentence(sentence) {
  var statusCode = 0;
  var payload = {
    id: uuidv4().toString(),
    userid: "test user", // TO-DO: have unique user for each sentence
    sentence: sentence,
  };

  try {
    const response = await axios.post(`api/sentences`, payload);
    statusCode = response.status;
  } catch (error) {
    console.log("error posting sentence", error);
    statusCode = 500;
  }
  return statusCode;
}
