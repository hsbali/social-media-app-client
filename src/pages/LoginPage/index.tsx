import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Stack, Button, Typography, Link } from "@mui/material";

import { useAppDispatch } from "../../hooks/store";
import { loginUserThunk } from "../../features/auth/auth.slice";
import useAuth from "../../hooks/useAuth";

import TextfieldWrapper from "../../components/form/TextFieldWrapper";

const INIT_VALUES = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .required("Required"),
});

export default function LoginPage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const onLogin = (values: typeof INIT_VALUES) => {
    dispatch(loginUserThunk(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirect_url = new URLSearchParams(location.search).get(
        "redirect_url"
      );
      navigate(redirect_url || "/home");
    }
  }, [isAuthenticated]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ paddingY: (theme) => theme.spacing(8) }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        mb={(theme) => theme.spacing(1)}
      >
        <b>Log in</b>
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        mb={(theme) => theme.spacing(4)}
      >
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </Typography>
      <Formik
        initialValues={INIT_VALUES}
        validationSchema={validationSchema}
        onSubmit={onLogin}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Stack spacing={2}>
              <TextfieldWrapper name="email" label="Email" type="email" />
              <TextfieldWrapper
                name="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isSubmitting}
                fullWidth
              >
                Log in
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
