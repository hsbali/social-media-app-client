import { Fragment } from "react";
import { Alert, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { selectAlert } from "../../features/alert/alert.slice";
import { useAppSelector } from "../../hooks/store";

const StyledAlertsContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: "450px",
  position: "absolute",
  right: 0,
  padding: theme.spacing(2),
  zIndex: 1000,
}));

export default function AlertsContainer() {
  const alerts = useAppSelector((state) => selectAlert(state));

  if (alerts.length === 0) return null;

  return (
    <StyledAlertsContainer spacing={2}>
      {alerts.map((alert) => (
        <Fragment key={alert.id}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Fragment>
      ))}
    </StyledAlertsContainer>
  );
}
