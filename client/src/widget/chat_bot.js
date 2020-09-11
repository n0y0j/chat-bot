import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../actions/message_action";
import Message from "./sections/message";
import Card from "./sections/card";
import { List, Avatar, Icon } from "antd";
import Grid from "@material-ui/core/Grid";

function ChatBot(props) {
  const [user, setUser] = useState(props.user);
  const dispatch = useDispatch();

  // redux에 store되있는 정보를 꺼내 사용할 수 있음
  const messagesFromRedux = useSelector((state) => state.message.messages);

  useEffect(() => {
    eventQuery("welcomeMyWebsite");
  }, []);

  const textQuery = async (text) => {
    let conversation = {
      who: user,
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
      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
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
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
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

  const rendersCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };

  const renderOneMessage = (message, i) => {
    console.log("message", message);

    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {
      const AvatarSrc =
        message.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;

      return (
        <div>
          <List.Item style={{ padding: "1rem" }}>
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={rendersCards(
                message.content.payload.fields.card.listValue.values
              )}
            />
          </List.Item>
        </div>
      );
    }
  };

  // redux안에 있는 정보들을 하나씩 처리한다,
  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <Grid
      style={{
        height: 900,
        width: 800,
        borderRadius: "10px",
        backgroundColor: "#81F7F3",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 800,
          textAlign: "center",
          marginTop: "10px",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            borderRadius: "8px",
            fontSize: "30px",
            fontFamily: "BM_JUA",
            backgroundColor: "#FFFFFF",
          }}
        >
          {user}님이 입장하셨습니다
        </p>
      </div>
      <Grid style={{ height: 744, width: 800, overflow: "auto" }}>
        {renderMessage(messagesFromRedux)}
      </Grid>

      <input
        style={{
          width: 788,
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a Message..."
        onKeyPress={KeyPressHandler}
        type="text"
      />
    </Grid>
  );
}

export default ChatBot;
