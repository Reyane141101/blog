import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      size="medium"
      aria-label="Theme toggle button"
      
      {...props}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="medium" />
      ) : (
        <ModeNightRoundedIcon fontSize="medium" />
      )}
    </IconButton>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
