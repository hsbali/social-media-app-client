import { isValidElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Stack, Button, Typography, Link } from "@mui/material";

import { useAppDispatch } from "../../hooks/store";
import { signupUserThunk } from "../../features/auth/auth.slice";
import useAuth from "../../hooks/useAuth";

import TextfieldWrapper from "../../components/form/TextFieldWrapper";

const INIT_VALUES = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});

export default function SignupPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const onSignup = (values: typeof INIT_VALUES) => {
    dispatch(signupUserThunk(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
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
        <b>Sign up</b>
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        mb={(theme) => theme.spacing(4)}
      >
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>
      <Formik
        initialValues={INIT_VALUES}
        validationSchema={validationSchema}
        onSubmit={onSignup}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Stack spacing={2}>
              <Stack spacing={2} direction="row">
                <TextfieldWrapper name="fName" label="First Name" />
                <TextfieldWrapper name="lName" label="Last Name" />
              </Stack>
              <TextfieldWrapper name="email" label="Email" type="email" />
              <TextfieldWrapper
                name="password"
                label="Password"
                type="password"
              />
              <TextfieldWrapper
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isSubmitting}
                fullWidth
              >
                Create Account
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
