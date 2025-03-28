import React from "react";
import { Box, Typography } from "@mui/material";

export const CenteredText = ({ children }) => (
  <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
    {children}
  </Box>
);

export const CodeBlock = ({ children, language }) => (
  <Box bgcolor="#2d2d2d" color="white" p={2} borderRadius={2}>
    <Typography variant="body2" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
      {children}
    </Typography>
  </Box>
);

export const Image = ({ src, alt }) => 
(
  <Box display="flex" justifyContent="center" alignItems="center">
    <img src={src} alt={alt} style={{ maxWidth: '50%', height: 'auto' }} />
  </Box>
);
