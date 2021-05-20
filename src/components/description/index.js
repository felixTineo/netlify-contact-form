import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  p:{
    fontSize: theme.spacing(3)
  }
}));

const Description = () => {
  const classes = useStyles();
  return(
    <Fragment>
      <Typography variant="h2">
        Hey there!
      </Typography>
      <Typography variant="body1" className={classes.p}>
        My name is Felix Tieno and I want to share how to create a contact form with Netlify and react, you can follow this tutorial on <Link href="https://felixtineo05.medium.com/netlify-contact-form-react-923e59ed0189" >Medium</Link>, don't forget to follow me on <Link href="https://twitter.com/@Felix4dev">Twitter</Link>, that helps me motivate myself and keep sharing.
      </Typography>
    </Fragment>
  )
}

export default Description;