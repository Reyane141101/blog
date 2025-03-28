import { AppBar, styled } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
  transition: "transform 0.3s ease-in-out",
}));

export default StyledAppBar;
