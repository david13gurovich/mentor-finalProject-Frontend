import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "/modules/components/Typography";
import AppFooter from "/modules/views/AppFooter";
import AppAppBar from "/modules/views/AppAppBar";
import AppForm from "/modules/views/AppForm";
import { required } from "/modules/form/validation";
import RFTextField from "/modules/form/RFTextField";
import FormButton from "/modules/form/FormButton";
import FormFeedback from "/modules/form/FormFeedback";
import withRoot from "/modules/withRoot";
import { FORM_ERROR } from "final-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState, selectAuthState, setUserNameState } from '/modules/model/auth';

function SignIn() {
  const router = useRouter();
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  console.log("Auth State SIGN-IN", authState);


  const validate = (values) => {
    const errors = required(["id", "password"], values);
    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    let flag = false;
    const res = await fetch("https://localhost:7204/api/Users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).catch((err) => {
      flag = true;
    });
    if (flag) {
      setSent(false);
      return { [FORM_ERROR]: "Server error" };
    } else if (res.status === 200) {
      const tokenJson = await res.json();
      dispatch(setAuthState("Bearer " + tokenJson.token));
      dispatch(setUserNameState(values.id));
      router.push("/");
    } else {
      setSent(false);
      return { [FORM_ERROR]: "Wrong User name or Password" };
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/in/sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoComplete="user-name"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="User name"
                margin="normal"
                name="id"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/in/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
