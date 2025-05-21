import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import TemplatePage from '../components/shared/TemplateContent';


const ErrorContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(10),
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  animation: 'fadeIn 1s ease-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 700,
  color: theme.palette.error.main,
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
}));

const ErrorSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const ErrorButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1.5, 5),
  marginTop: theme.spacing(2),
  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function NotFoundPage() {
  return (
    <TemplatePage>
        <ErrorContainer maxWidth="sm">
          <ErrorTitle variant="h1">404</ErrorTitle>
          <ErrorSubtitle variant="h6">
            Oops! The page you're looking for doesn't exist.
          </ErrorSubtitle>
          <ErrorSubtitle variant="body1">
            It seems the page you're trying to reach is missing or has been moved.
          </ErrorSubtitle>
          <ErrorButton
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            Go back to Home
          </ErrorButton>
        </ErrorContainer>
    </TemplatePage>
  );
}

export default NotFoundPage;
