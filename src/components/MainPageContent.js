import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import CustomCardContent from './main/CustomCardContent';

const yaml = require('js-yaml');


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

  React.useEffect(() => { // Récuperation des catégories
    fetch('/metadata/categories.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.text();
      })
      .then(csvText => {
        const categories = csvText
          .trim()  
          .split(',')
          .map(category => category.trim());
        setCategories(categories);
      })
      .catch(error => console.error('Erreur lors de la récupération des catégories:', error));
  }, []);
  
  React.useEffect(() => { // Récuperation des previews
    const previewsFolder = '/articles/preview/';
  
    fetch(`${previewsFolder}index.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(files => {
        const promises = files.map(file =>
          fetch(previewsFolder + file)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Erreur lors du chargement de ${file}`);
              }
              return response.text();
            })
            .then(yamlText => yaml.load(yamlText))
        );
  
        return Promise.all(promises);
      })
      .then(previews => {
        setPreviews(previews);
        setGlobalPreviews(previews);
      })
      .catch(error => console.error('Erreur lors de la récupération des previews:', error));
  }, []);
  

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
            onClick={() => handleClickSections("All categories")}
            sx={chipStyles("All categories")}
          />

          {categories.map((category, index) => (
            <Chip
              key={index}
              size="medium"
              label={category}
              onClick={() => handleClickSections(category)}
              sx={chipStyles(category)}
            />
          ))}
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
