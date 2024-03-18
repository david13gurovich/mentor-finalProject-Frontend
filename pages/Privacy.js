import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '/modules/components/Markdown';
import Typography from '/modules/components/Typography';
import AppAppBar from '/modules/views/AppAppBar';
import AppFooter from '/modules/views/AppFooter';
import withRoot from '/modules/withRoot';
import { MdToString } from '/modules/lib/mdToString';


function Privacy({privacy}) {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export async function getStaticProps({ locale }) {
  if (locale === 'en-US') {
    const privacy = MdToString('privacy.md');
    return {
      props: {
        privacy,
      },
    };
  }
  const privacy = MdToString('hprivacy.md');
  return {
    props: {
      privacy,
    },
  };
}

export default withRoot(Privacy);
