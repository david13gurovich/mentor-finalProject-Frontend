import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "/modules/components/Typography";
import AppFooter from "/modules/views/AppFooter";
import AppAppBar from "/modules/views/AppAppBar";
import AppForm from "/modules/views/AppForm";
import { email, required } from "/modules/form/validation";
import RFTextField from "/modules/form/RFTextField";
import FormButton from "/modules/form/FormButton";
import FormFeedback from "/modules/form/FormFeedback";
import withRoot from "/modules/withRoot";
import { useRouter } from "next/router";
import { FORM_ERROR } from "final-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState } from '/modules/model/auth';
import { newHistory } from "../../modules/model/history";

function SignUp() {
  const router = useRouter();
  const [sent, setSent] = React.useState(false);
  const authState = useSelector(selectAuthState);
  console.log("Auth State SIGN-UP", authState);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = required(
      ["id", "name", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    let flag = false;
    const res = await fetch("https://localhost:7204/api/Users", {
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
      dispatch(newHistory(values.id));
      router.push("/in/sign-in");
    } else {
      setSent(false);
      return { [FORM_ERROR]: "User already exists" };
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/in/sign-in" underline="always">
              Already have an account?
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="User name"
                    name="id"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Full name"
                    name="name"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
