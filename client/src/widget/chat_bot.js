import React from "react";

function ChatBot() {
  const KeyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) return alert("you need to type something first.");
      else {
        // e.target.value를 server로 보내줘야함

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
