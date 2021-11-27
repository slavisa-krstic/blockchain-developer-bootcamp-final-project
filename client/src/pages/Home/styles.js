import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  notConnected: {
    marginTop: "30px",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  connected: {
    marginTop: "30px",
    fontSize: "12px",
    display: "flex",
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  }
}));
