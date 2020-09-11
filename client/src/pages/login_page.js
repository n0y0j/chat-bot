import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Icon } from "antd";

const { Title } = Typography;

function LoginPage() {
  const [userName, setUserName] = useState("");

  const useStyles = makeStyles((theme) => ({
    text_field: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#00BFFF",
        },
      },
    },
  }));

  const userNameChange = (e) => {
    setUserName(e.target.value);
  };

  const history = useHistory();
  const moveChatBot = () => {
    history.push("/chatbot", userName);
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      style={{ marginTop: "8%", marginLeft: "18%" }}
    >
      <div direction="column">
        <Title
          style={{
            fontSize: "70px",
            marginBottom: "-30px",
            fontFamily: "BM_JUA",
            letterSpacing: "10px",
          }}
        >
          챗봇을 이용하고 싶다고?
        </Title>
        <Title
          style={{
            fontSize: "70px",
            fontFamily: "BM_JUA",
            letterSpacing: "10px",
          }}
        >
          닉네임을 입력해
        </Title>
        <div direction="row">
          <TextField
            className={classes.text_field}
            variant="outlined"
            style={{ marginTop: "-20px" }}
            onChange={userNameChange}
          />
          <Button
            onClick={moveChatBot}
            style={{
              fontSize: "30px",
              marginLeft: "30px",
              marginTop: "-27px",
              fontFamily: "BM_JUA",
            }}
          >
            저장
          </Button>
        </div>
      </div>
      <Icon
        type="robot"
        style={{
          fontSize: "350px",
          marginLeft: "300px",
          color: "#00BFFF",
          paddingTop: "150px",
        }}
      />
    </Grid>
  );
}

export default LoginPage;
