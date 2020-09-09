import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Icon } from "antd";

const { Title } = Typography;

function LoginPage() {
  const useStyles = makeStyles((theme) => ({
    login_div: {},
    text_field: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#00BFFF",
        },
      },
    },
  }));

  const history = useHistory();
  const moveChatBot = () => {
    history.push("/chatbot");
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      style={{ marginTop: "5%" }}
    >
      <Title
        style={{
          fontSize: "70px",
          marginBottom: "60px",
          fontFamily: "BM_JUA",
          letterSpacing: "10px",
        }}
      >
        챗봇을 이용하고 싶다고?
      </Title>
      <Icon
        type="robot"
        style={{ fontSize: "200px", marginBottom: "-20px", color: "#00BFFF" }}
      />
      <Title
        style={{
          fontSize: "70px",
          fontFamily: "BM_JUA",
          letterSpacing: "10px",
        }}
      >
        닉네임을 입력해
      </Title>
      <TextField className={classes.text_field} variant="outlined" />
      <Button
        onClick={moveChatBot}
        style={{ fontSize: "30px", marginTop: "40px", fontFamily: "BM_JUA" }}
      >
        저장
      </Button>
    </Grid>
  );
}

export default LoginPage;
