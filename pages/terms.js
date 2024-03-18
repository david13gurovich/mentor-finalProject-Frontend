import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '/modules/components/Markdown';
import Typography from '/modules/components/Typography';
import AppAppBar from '/modules/views/AppAppBar';
import AppFooter from '/modules/views/AppFooter';
import withRoot from '/modules/withRoot';
import { MdToString } from '/modules/lib/mdToString';



function Terms({terms}) {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export async function getStaticProps({ locale }) {
  if (locale === 'en-US') {
    const terms = MdToString('terms.md');
  return {
    props: {
      terms,
    },
  };
  }
  const terms = MdToString('hterms.md');
  return {
    props: {
      terms,
    },
  };
}

export default withRoot(Terms);
