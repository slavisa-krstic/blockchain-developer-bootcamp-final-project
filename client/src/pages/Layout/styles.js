import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: 200,
    flexShrink: 0,
    zIndex: 999
  },
  drawerPaper: {
    width: 200
  },
  content: {
    flexGrow: 1,
    minHeight: "100vh",
    position: "relative",
    top: "100px",
    marginLeft: "40px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerContainer: {
    overflow: "auto"
  },
  textColor: {
    color: "#3f51b5"
  }
}));
