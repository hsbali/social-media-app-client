import { Outlet } from "react-router-dom";
import {
  Stack,
  Box,
  styled,
  Container,
  ButtonBase,
  Link,
  Paper,
} from "@mui/material";
import { Home, AddCircle, AccountCircle } from "@mui/icons-material";

import useDeviceView from "../../../hooks/useDeviceView";

const StyledNavButton = styled(ButtonBase)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(1),
  textDecoration: "none",
  color: theme.palette.text.primary,
  ...theme.typography.caption,
}));

type NavButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const NavButton = ({ href, icon, label }: NavButtonProps) => {
  return (
    <Link href={href} underline="none" flexGrow={1}>
      <StyledNavButton>
        {icon}
        {label}
      </StyledNavButton>
    </Link>
  );
};

export default function RootLayout(): JSX.Element {
  const { isMobileView } = useDeviceView();

  return (
    <Stack
      direction={isMobileView ? "column-reverse" : "row"}
      sx={{
        width: "100vw",
        height: "100vh",
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Paper elevation={0}>
        <Stack
          direction={isMobileView ? "row" : "column"}
          sx={{
            minWidth: (theme) => theme.spacing(10),
          }}
        >
          <NavButton href="/home" label="Home" icon={<Home />} />
          <NavButton href="/new" label="New" icon={<AddCircle />} />
          <NavButton href="/account" label="Account" icon={<AccountCircle />} />
        </Stack>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ padding: (theme) => theme.spacing(1), height: "100%" }}
        >
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
}
