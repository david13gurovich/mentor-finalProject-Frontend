import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "/modules/components/Typography";
import RFTextField from "/modules/form/RFTextField";
import FormButton from "/modules/form/FormButton";
import FormFeedback from "/modules/form/FormFeedback";
import { required } from "/modules/form/validation";
import ModalForm from "../views/ModalForm";


export default function SuggestForm({
    handleClose,
    suggest
}) {
    const [sent, setSent] = React.useState(false);


    const validate = (values) => {
      let errors;
      errors = required(
        ["type"],
        values
        );
      
      return errors;
    };
    


    const handleSubmit = (values) => {
        setSent(true);
        suggest(values.type);
        setSent(false);
        handleClose();
    };

    return (
        <React.Fragment>
            <ModalForm>
                <React.Fragment>
                    <Typography
                        variant="h3"
                        gutterBottom
                        marked="center"
                        align="center"
                    >
                        Suggestion Form
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
                                autoComplete="Type"
                                autoFocus
                                fullWidth
                                component={RFTextField}
                                disabled={submitting || sent}
                                label="Type"
                                margin="normal"
                                name="type"
                                size="large"
                                defaultValue={""}
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
                                {submitting || sent ? "In progress…" : "Send"}
                            </FormButton>
                        </Box>
                    )}
                </Form>
            </ModalForm>
        </React.Fragment>
    );
}
