import React from 'react';

import { useWeb3React } from '@web3-react/core';

// Custom components
import GuessNumber from "../GuessNumber";
import CreateGuessNumberGame from "../CreateGuessNumberGame";

import useStyles from "./styles";
import { Container } from '@material-ui/core';

// Application context
import { useAppContext } from './../../context/AppContext';

// Hooks
import { useGuessNumberGame } from './../../hooks/useGuessNumberGame';

const Home = () => {
  const { active } = useWeb3React();
  const classes = useStyles();

  const { applicationError } = useAppContext();

  const { isTheOwner } = useGuessNumberGame();

  return (
    <React.Fragment>
      {active && !isTheOwner && <GuessNumber />}
      {active && isTheOwner && <CreateGuessNumberGame />}
      {!active && !applicationError && 
        <React.Fragment>
          <Container maxWidth="sm" className={classes.notConnected}>
            <div>Please connect to your account</div>
          </Container>
        </React.Fragment>
      }
      {!active && applicationError && 
        <React.Fragment>
          <Container maxWidth="sm" className={classes.notConnected}>
            <div>{applicationError}</div>
          </Container>
        </React.Fragment>
      }
      {applicationError && 
        <React.Fragment>
          <Container maxWidth="sm" className={classes.connected}>
            <div>{applicationError}</div>
          </Container>
        </React.Fragment>
      }
    </React.Fragment>
  );
};

export default Home;