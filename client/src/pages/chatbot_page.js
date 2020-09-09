import React from "react";
import { Typography, Icon } from "antd";
import ChatBot from "../widget/chat_bot";
const { Title } = Typography;

function ChatBotPage() {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Title level={2}>
          CHAT BOT APP&nbsp;
          <Icon type="robot" />
        </Title>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ChatBot />
      </div>
    </div>
  );
}

export default ChatBotPage;
