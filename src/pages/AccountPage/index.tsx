import { Paper, Stack, Button, Typography, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  logoutUserThunk,
  updateUserThunk,
} from "../../features/auth/auth.slice";

import TextfieldWrapper from "../../components/form/TextFieldWrapper";

import { useAppDispatch } from "../../hooks/store";
import useAuth from "../../hooks/useAuth";
import MoreOptionsMenuWrapper from "../../components/MoreOptionsMenuWrapper";
import { setAlert } from "../../utils/alert";

const validationSchema = Yup.object({
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

export default function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const initialValues = {
    fName: user?.fName,
    lName: user?.lName,
    email: user?.email,
  };

  const onSubmit = (values: typeof initialValues) => {
    if (!user || !user.id)
      return setAlert({ message: "Invalid Request", type: "error" });

    dispatch(updateUserThunk({ id: user.id, ...values }))
      .unwrap()
      .then(() => setAlert({ message: "Changes saved", type: "success" }));
  };

  return (
    <>
      <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={(theme) => theme.spacing(1)}
                >
                  <Typography variant="h6" component="h1">
                    <b>Account Details</b>
                  </Typography>
                  <MoreOptionsMenuWrapper>
                    <MenuItem onClick={() => dispatch(logoutUserThunk())}>
                      Log out
                    </MenuItem>
                  </MoreOptionsMenuWrapper>
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextfieldWrapper name="fName" label="First Name" />
                  <TextfieldWrapper name="lName" label="Last Name" />
                </Stack>
                <TextfieldWrapper
                  name="email"
                  label="Email"
                  type="email"
                  disabled
                />
                <Stack direction="row">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!(dirty && isValid) || isSubmitting}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
}
