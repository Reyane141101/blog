import { Box, FormControl, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Search() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') 
      {
        setSearchValue(searchValue)
        const query = encodeURIComponent(searchValue.trim());
        navigate(`/search?q=${query}`);
        setSearchValue("")
      }
  };
  return (
    <Box sx={{ flexGrow: 1.5}}>
      <FormControl sx={{ width: { md: '70%' } }} variant="outlined">
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search an article…"
          sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
          inputProps={{
            'aria-label': 'search',
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
    </Box>
  );
}
