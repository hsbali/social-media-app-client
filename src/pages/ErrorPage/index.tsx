import { useRouteError } from "react-router-dom";
import { Stack, Typography, Link } from "@mui/material";

export default function ErrorPage(): JSX.Element {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Stack spacing={2} alignItems="center" my="4rem">
      <Typography variant="h2" fontWeight="bold">
        Oops!
      </Typography>
      <Typography variant="h6" align="center">
        {!!error.status && <>{error.status} | </>}
        {error.statusText || error.message}
        <br />
        <Typography variant="body1">
          <Link href="/home">Go to home</Link>
        </Typography>
      </Typography>
    </Stack>
  );
}
