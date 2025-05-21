import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import yaml from 'js-yaml';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import TemplatePage from '../components/shared/TemplateContent';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';
  const navigate = useNavigate();

  const [previews, setPreviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const previewsFolder = '/articles/preview/';

    fetch(`${previewsFolder}index.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((files) => {
        const promises = files.map((file) =>
          fetch(previewsFolder + file)
            .then((res) => {
              if (!res.ok) throw new Error(`Error loading ${file}`);
              return res.text();
            })
            .then((yamlText) => yaml.load(yamlText))
        );
        return Promise.all(promises);
      })
      .then((loadedPreviews) => {
        setPreviews(loadedPreviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching previews:', err);
        setLoading(false);
      });
  }, []);

  const filtered = previews.filter((article) => {
    return (
      article.title?.toLowerCase().includes(searchTerm) || // Recherche dans le titre
      article.description?.toLowerCase().includes(searchTerm) || // Recherche dans la description
      article.category?.toLowerCase().includes(searchTerm) // Recherche dans la catégorie (si disponible)
    );
  });


  return (
    <TemplatePage>
      <Box>
        <Typography variant="h5" gutterBottom>
          Results for: <i>{searchTerm}</i>
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No articles found.
          </Typography>
        ) : (
          <Grid container spacing={6}>
            {filtered.map((article) => (
              <Grid item xs={6} lg={6} key={article.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => navigate(article.url)}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={article.thumbnail}
                    alt={article.title}
                    sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                  />
                  <CardContent sx={{ px: 3, py: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {article.description}
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      {article.author} · {article.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </TemplatePage>
  );
}
