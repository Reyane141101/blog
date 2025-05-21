import { AppBar, styled } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  justifyContent: "space-between",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  flex: "0 0 auto",
}));

export default StyledAppBar;
