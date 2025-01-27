import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
const yaml = require('js-yaml');

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

function Credits({ authors, date }) {
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
              alt={author}
              src={author}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author)}
        </Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
    </Box>
  );
}

Credits.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export function Search() 
{
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

function CustomCardContent({ card }) 
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

export default function MainContent() 
{
  const [activeChip, setActiveChip] = React.useState('All categories');
  const [categories, setCategories] = React.useState([]);
  const [previews, setPreviews] = React.useState([]);
  const [globalPreviews, setGlobalPreviews] = React.useState([]);

  const handleClickSections = (label) => 
  {
    if (label === "All categories")
    {
      setPreviews(globalPreviews);
    }
    else
    {
      setPreviews(globalPreviews.filter(preview => preview.category === label))
    }
    setActiveChip(label)
  };
  const chipStyles = (label) => ({
    backgroundColor: activeChip === label ? '#303030' : 'transparent', 
    color: activeChip === label ? '#fff' : 'inherit', 
    border: 'none', 
  });

  
  React.useEffect(() => // Récuperation des catégories
  {
    fetch('http://localhost:3001/api/getCategories') 
      .then(response => response.json())
      .then(data => setCategories(data.data.split(',')))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, [])

  React.useEffect(() => // Récuperation des previews
  {
    fetch('http://localhost:3001/api/article/previews')
      .then(response => response.json())
      .then(data => {
        const previews = data.data.map((item) => yaml.load(item));
        setPreviews(previews); 
        setGlobalPreviews(previews);})
      .catch(error => console.error('Erreur lors de la récupération des preview:', error));
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
        <Box
          textAlign="center"
        >
          <Typography variant="h1" gutterBottom>
            Olympe
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontStyle: 'italic' }}>
            Climb the Peaks of Technology
          </Typography>
        </Box>
        <Typography> 
          Welcome to my blog ! You will find some articles about some interessting IT technologies. Stay tuned !
        </Typography>
      </Box>

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
            label= {categories[0]}
            onClick={() => handleClickSections(categories[0])}
            sx= {chipStyles(categories[0])}
          />
          <Chip
            size="medium"
            label={categories[1]}
            onClick={() => handleClickSections(categories[1])}
            sx={chipStyles(categories[1])}
          />
          <Chip
            size="medium"
            label={categories[2]}
            onClick={() => handleClickSections(categories[2])}
            sx={chipStyles(categories[2])}
          />
          <Chip
            size="medium"
            label={categories[3]}
            onClick={() => handleClickSections(categories[3])}
            sx={chipStyles(categories[3])}
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
        </Box>
      </Box>
      <Grid container spacing={1} columns={12}>
        {
          previews.map((preview, index) => 
          {
            return <CustomCardContent key={index} card={preview} />;
          })
        }
      </Grid>
    </Box>
  );
}
