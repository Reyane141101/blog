import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { useNavigate } from 'react-router-dom';

const SyledCard = styled(Card)(({ theme }) => ({
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
  },
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

function Author({ authors }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

function CustomCardContent({ card }) {
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
          image={card.img}
          aspect-ratio="16 / 9"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <SyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {card.tag}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {card.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {card.description}
          </StyledTypography>
        </SyledCardContent>
        <Author authors={card.authors} />
      </SyledCard>
    </Grid>
  );
}

export default function MainContent() {
  const [activeChip, setActiveChip] = React.useState('All categories');
  const handleClickSections = (label) => {
    setActiveChip(label)
  };
  const chipStyles = (label) => ({
    backgroundColor: activeChip === label ? '#303030' : 'transparent', 
    color: activeChip === label ? '#fff' : 'inherit', 
    border: 'none', 
  });

  const [cardData, setCardData] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/api/cardData') 
      .then(response => response.json())
      .then(data => {
        setCardData(data.data); 
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);
  const filteredCardData = activeChip === 'All categories'
? cardData
: cardData.filter(card => card.tag === activeChip);

  const [Subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/api/Subjects') 
      .then(response => response.json())
      .then(data => {
        setSubjects(data.data); 
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);




  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h1" gutterBottom>
            Olympe
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontStyle: 'italic' }}>
            Climb the Peaks of Technology
          </Typography>
      </Box>
      <div>
        <Typography>Welcome to my blog !
          You will find some articles about some interessting IT technologies. Stay tuned !
        </Typography>
      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip 
          size="medium" 
          label="All categories" 
          onClick={() => handleClickSections("All categories" )}
          sx= {chipStyles('All categories')}
          />
          
          <Chip
            size="medium"
            label= {Subjects[0]}
            onClick={() => handleClickSections(Subjects[0])}
            sx= {chipStyles(Subjects[0])}
          />
          <Chip
            size="medium"
            label={Subjects[1]}
            onClick={() => handleClickSections(Subjects[1])}
            sx={chipStyles(Subjects[1])}
          />
          <Chip
            size="medium"
            label={Subjects[2]}
            onClick={() => handleClickSections(Subjects[2])}
            sx={chipStyles(Subjects[2])}
          />
          <Chip
            size="medium"
            label={Subjects[3]}
            onClick={() => handleClickSections(Subjects[3])}
            sx={chipStyles(Subjects[3])}
          />
        </Box>
        <Box  
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={1} columns={12}>
        {
          filteredCardData.map
          (
            (cardData, _) => 
            {
            return <CustomCardContent id={cardData.id} />; 
            }
          )
        }
      </Grid>
    </Box>
  );
}
