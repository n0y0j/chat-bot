import React from "react";
import { Icon, Avatar } from "antd";
import Grid from "@material-ui/core/Grid";

function Message(props) {
  const AvatarSrc =
    props.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;
  return (
    <Grid
      container
      direction="row"
      style={{ marginTop: "15px", marginLeft: "10px" }}
    >
      <div
        style={{
          display: "flex",
          width: 70,
          height: 70,
          borderRadius: "100%",
          backgroundColor: "#D8D8D8",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          icon={AvatarSrc}
          style={{
            fontSize: "40px",
          }}
        />
      </div>
      <Grid
        direction="column"
        style={{ marginLeft: "10px", marginTop: "-20px" }}
      >
        <p
          style={{
            fontSize: "25px",
            fontFamily: "BM_JUA",
          }}
        >
          {props.who}
        </p>
        <div
          style={{
            width: 300,
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "25px",
              fontFamily: "BM_JUA",
              marginTop: "-20px",
            }}
          >
            {props.text}
          </p>
        </div>
      </Grid>
    </Grid>
  );
}

export default Message;
