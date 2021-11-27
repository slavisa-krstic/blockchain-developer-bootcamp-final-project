// Material UI
import { 
  AppBar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography 
} from "@material-ui/core";
import CloudIcon from "@material-ui/icons/Cloud";
import CloudOff from "@material-ui/icons/CloudOff";

// Hooks
import { useWeb3React } from '@web3-react/core';

// Styles
import useStyles from "./styles";
import { useConnectNetwork } from './../../hooks/useConnectNetwork';

const Layout = ({ children }) => {
  const { active } = useWeb3React();
  const classes = useStyles();

  const {
    deactivate,
    connect
  } = useConnectNetwork();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap data-testid="general-title">
            Final project Guess Number Game - Slavisa Krstic
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {!active && <ListItem button key="New" color="primary" onClick={() => connect()} data-testid="new-post">
              <ListItemIcon><CloudOff color="primary" /></ListItemIcon>
              <ListItemText className={classes.textColor} >Connect</ListItemText>
            </ListItem>}
            {active && <ListItem button key="New" color="primary" onClick={() => deactivate()} data-testid="new-post">
              <ListItemIcon><CloudIcon color="primary" /></ListItemIcon>
              <ListItemText className={classes.textColor} >Disconnect</ListItemText>
            </ListItem>}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}

export default Layout;