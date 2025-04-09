import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Credits from './Credits';

const SyledCard = styled(Card)(({ theme }) => 
    ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    }
  }));
  
  const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
      paddingBottom: 16,
    },
  });
  
  const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  
  
  
  export default function CustomCardContent({ card }) 
  {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
    const navigate = useNavigate();
    const handleFocus = (card) => {
      setFocusedCardIndex(card.id);
      navigate(card.url);
    };
    return (
      <Grid size={{ xs: 12, md: 6 }}>
        <SyledCard
          variant="outlined"
          onFocus={() => handleFocus(card)}
          tabIndex={0}
          className={focusedCardIndex === card.id ? 'Mui-focused' : ''}
        >
          <CardMedia
            component="img"
            alt={card.altText || "Image"}
            image={card.thumbnail}
            aspect-ratio="16 / 9"
            sx={{
              height: '100%',
              width: 'auto',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <SyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              {card.category}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {card.title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {card.description}
            </StyledTypography>
          </SyledCardContent>
          <Credits
          authors={card.author.split(",")}
          date={card.date} 
          />
        </SyledCard>
      </Grid>
    );
  }