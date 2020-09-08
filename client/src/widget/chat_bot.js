import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../actions/message_action";

function ChatBot() {
  const dispatch = useDispatch();
  useEffect(() => {
    eventQuery("welcomeMyWebsite");
  }, []);

  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));
    let textQueryVariables = {
      text: text,
    };

    try {
      // server의 textQuery에게 text를 보내주고 그에 대한 응답을 받아옴
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow/textQuery",
        textQueryVariables
      );

      // textQuery에서 가져온 response 객체의 json 값 저장
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: content,
      };
      dispatch(saveMessage(conversation));
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    let eventQueryVariables = {
      event: event,
    };

    try {
      // server의 textQuery에게 text를 보내주고 그에 대한 응답을 받아옴
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow/eventQuery",
        eventQueryVariables
      );

      // textQuery에서 가져온 response 객체의 json 값 저장
      const content = response.data.fulfillmentMessages[0];

      let conversation = {
        who: "bot",
        content: content,
      };
      dispatch(saveMessage(conversation));
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const KeyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) return alert("you need to type something first.");
      else {
        // e.target.value를 server로 보내줘야함
        textQuery(e.target.value);
        e.target.value = "";
      }
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}></div>

      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a messsage..."
        onKeyPress={KeyPressHandler}
        type="text"
      />
    </div>
  );
}

export default ChatBot;
