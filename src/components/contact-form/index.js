import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  paper:{
    padding: "2rem",
    marginBottom: "2rem"
  },
  title:{
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  footer:{
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-end",
  }
}));

/**
 * Initial values for useReducer hook
 */
const initialValues = {
  name: "",
  email: "",
  message: "",
}

const initialErrors = {
  name: false,
  email: false,
  message: false,
}

const ContactForm = ()=> {
  const classes = useStyles();
  
  /**
   * Reducer function to useReducer hook
   * @param {name, email, message} currentState 
   * @param {name, email, message} nextState 
   * @returns next state of values,
   */
   const reducer = (currentState, nextState) => ({ ...currentState, ...nextState });

   const [values, setValues] = useReducer(reducer, initialValues);
   const [errors, setErrors] = useReducer(reducer, initialErrors);

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

  /**
   * 
   * @param data 
   * @returns URI string encoded
   */
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
    .then(()=> console.log("success"))
    .catch((e) => console.log("Error :", e));
  }   

  return(
    <Paper className={classes.paper} elevation={5}>
      <Typography variant="body1" className={classes.title}>
        Contact form
      </Typography>
      <form
        onSubmit={onSubmit}
        name="contact" 
        method="POST" 
        data-netlify="true"        
      >
        <input type="hidden" name="form-name" value="contact" />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onChange}
          onFocus={onFocus}
          error={errors.name}
          value={values.name}          
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onChange}
          onFocus={onFocus}
          error={errors.email}
          value={values.email}          
        />      
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4 }
          onChange={onChange}
          onFocus={onFocus}
          error={errors.message}
          value={values.message}          
        />   
        <footer className={classes.footer}>
          <Button type="submit" variant="contained" color="primary">
            Send
            <SendIcon style={{ marginLeft: ".5rem", fontSize: ".8rem" }} />
          </Button>          
        </footer>         
      </form>      
    </Paper>
  )
}

export default ContactForm;
