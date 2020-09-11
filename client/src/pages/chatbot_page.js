import React, { useState } from "react";
import { Typography, Icon } from "antd";
import ChatBot from "../widget/chat_bot";
import Grid from "@material-ui/core/Grid";
const { Title } = Typography;

function ChatBotPage(props) {
  const [user, setUser] = useState(props.location.state);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      style={{ marginTop: "2%" }}
    >
      <Title style={{ fontSize: "40px" }}>CHAT BOT APP</Title>
      <ChatBot user={user} />
    </Grid>
  );
}

export default ChatBotPage;
