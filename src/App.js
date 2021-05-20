import React from 'react';
import Layout from './components/layout';
import Grid from '@material-ui/core/Grid';
import Description from './components/description';
import ContactForm from './components/contact-form';

const App = ()=> (
  <Layout>
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Description />
      </Grid>
      <Grid item xs={12} md={6}>
        <ContactForm />
      </Grid>        
    </Grid>
  </Layout>
);

export default App;