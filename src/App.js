import React, { useReducer } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ReactComponent as Logo } from './netlify.svg';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SendIcon from '@material-ui/icons/Send';
import GithubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  header:{
    backgroundColor: "#0e1e25",
    color: "#fff",
    fontSize: "1.5rem",
    padding: "1rem",
    "& span":{
      marginLeft: 8
    }
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paragraph: {
    fontSize: 24,
    width: "90%"
  },
  form:{
    flexBasis: "80%"
  },
  footer:{
    backgroundColor: "#4bbde9",
    padding: 8,
    textAlign: "center",
    "& a":{
      color: "#fff",
    }
  }
}));

const theme = createMuiTheme({
  palette:{
    primary: { main: "#4bbde9" },
  }
})


const App = ()=> {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  /**
   * Initial values for useReducer hook
   */
  const initialValues = {
    name: null,
    email: null,
    message: null,
  }

  /**
   * Reducer function to useReducer hook
   * @param {name, email, message} currentState 
   * @param {name, email, message} nextState 
   * @returns next state of values,
   */
  const reducer = (currentState, nextState) => ({ ...currentState, ...nextState });

  const [values, setValues] = useReducer(reducer, initialValues);
  const [errors, setErrors] = useReducer(reducer, initialValues);

  /**
   * onChange handler
   * @param element
   *
   */
  const onChange = (e) => {
    setValues({ [e.target.id]: e.target.value });
  }

  /**
   * focus handler
   * @param element 
   */
  const onFocus = (e) => {
    setErrors({ [e.target.id]: false });
  }

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
  }

  /**
   * onSubmit handler
   * @param element
   */
  const onSubmit = (e) => {
    e.preventDefault();
    /**
     * Validation
     */
    for(const key in values){
      if(!values[key]){
        setErrors({ [key]: true });
        return;
      }
      setErrors({ [key]: false });
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": e.target.getAttribute("name"),
        ...values,
      })
    })
    .then(()=> console.log("Great!!"))
    .catch((e) => console.log("Error :", e));
  }

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <CssBaseline />
      <header className={classes.header}>
        <Container>
          <Grid container alignItems="center" justify="space-between">
            <Grid item style={{ display: "flex", alignItems:"center" }}>
              <Logo width="40px" height="40px" />
              <span>Netlify form & React</span>
            </Grid>
            <Grid item>
              <Link href="#">
                <GithubIcon />
              </Link>
            </Grid>            
          </Grid>
        </Container>
      </header>
      <main className={classes.main}>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6} direction={ matches ? "row" : "column" }>
              <h1>Hey there!</h1>
              <p className={classes.paragraph}>
                My name is Felix Tieno and I want to share how to create a contact form with Netlify and react, you can follow this tutorial on <Link href="#" >Medium</Link>, don't forget to follow me on <Link href="https://twitter.com/@Felix4dev">Twitter</Link>, that helps me motivate myself and keep sharing.
              </p>
              <Grid>
                <Grid>
                  
                </Grid>
              </Grid>
            </Grid>            
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: "3rem 2rem" }} elevation={5}>
                <form
                  onSubmit={onSubmit}
                  name="contact" 
                  method="POST" 
                  data-netlify="true"                   
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <h1 style={{ margin: 0 }}>Contact form</h1>
                    </Grid>
                    <Grid item> 
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        onChange={onChange}
                        onFocus={onFocus}
                        error={errors.name}
                        value={values.name}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        id="email"
                        onChange={onChange}
                        onFocus={onFocus}
                        error={errors.email}
                        value={values.email}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Message"
                        variant="outlined"                  
                        fullWidth
                        multiline
                        rows={4}
                        id="message"
                        onChange={onChange}
                        onFocus={onFocus}
                        error={errors.message}
                        value={values.message}
                      />
                    </Grid>                     
                    <Grid item style={{ justifyContent: "flex-end", display: "flex" }}>
                      <Button type="submit" variant="contained" color="primary">
                        Send
                        <SendIcon style={{ marginLeft: ".5rem", fontSize: ".8rem" }} />
                      </Button>               
                    </Grid>       
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        Developed with ❤️ by <a href="https://twitter.com/@Felix4dev">Felix tineo</a>
      </footer>
    </div>
    </ThemeProvider>
  );
}

export default App;