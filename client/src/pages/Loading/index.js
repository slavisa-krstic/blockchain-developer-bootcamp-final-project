// Material UI
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";

// Styles
import useStyles from "./styles";

const Loading = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          className={classes.loader}
        >
          <LinearProgress data-testid="linear-progress-id" />
        </Typography>
      </Box>
    </Container>
  )
};

export default Loading;