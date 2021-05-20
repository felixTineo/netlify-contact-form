import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from '../../netlify.svg';
import GithubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';


const custom_theme = createMuiTheme({
  palette:{
    secondary: { main: "#0e1e25" },
    primary: { main: "#4bbde9" },
  }
});

const useStyles = makeStyles((theme) => ({
  root:{
    minHeight: "100vh",
    backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "column"
  },
  header:{
    backgroundColor: custom_theme.palette.secondary.main,
    color: "#fff",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0"
  },
  title: {
    fontSize: theme.spacing(3),
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    userSelect: "none",
  },
  link:{
    color: custom_theme.palette.primary.main,
    "& :visited":{
      color: custom_theme.palette.primary.main,
    }
  },
  main:{
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  footer:{
    backgroundColor: custom_theme.palette.primary.main,
    fontSize: ".8rem",
    padding: 8,
    textAlign: "center",
    "& a":{
      color: custom_theme.palette.secondary.main,
    }
  }
}));

const Layout = ({ children })=> {
  const classes = useStyles();
  return(
    <ThemeProvider theme={custom_theme}>
      <CssBaseline />
      <div className={classes.root}>
        <header className={classes.header}>
          <Container>
            <nav className={classes.nav}>
              <Logo width="40px" height="40px" />
              <Typography variant="body1" className={classes.title}>
                Netlify form & React
              </Typography>
              <Link href="https://github.com/felixTineo/netlify-contact-form" className={classes.link}>
                <GithubIcon />
              </Link>            
            </nav>     
          </Container>     
        </header>
        <main className={classes.main}>
          <Container>
            {children}
          </Container>
        </main>
        <footer className={classes.footer}>
          Developed with ❤️ by <a href="https://twitter.com/@Felix4dev">Felix tineo</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout;