const express = require("express");
const router = express.Router();
const structjson = require("./structjson.js");
const dialogflow = require("dialogflow");
const uuid = require("uuid");

const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// TextQuery
// client로 부터 받은 정보를 받음
router.post("/textQuery", async (req, res) => {
  // client에서 받아온 정보를 가공함
  // 아래 코드 text는 client에서 특정 text를 입력받아 올 때 dialogflow에서 어떠한 반응을 보일지 정함 ex) hello -> oh, hi!!
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  console.log(req.body.text);

  // responses는 client로 보낼 chatbot의 반응을 담고 있음, 즉, responses를 다시 client로 보내야함
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  // client로 챗봇의 반응을 다시 보내줌
  res.send(result);
});

module.exports = router;
