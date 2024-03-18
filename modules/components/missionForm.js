import Slider from "@mui/material/Slider";
import CheckSelect from "./checkSelect";
import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "/modules/components/Typography";
import AppForm from "/modules/views/AppForm";
import RFTextField from "/modules/form/RFTextField";
import FormButton from "/modules/form/FormButton";
import FormFeedback from "/modules/form/FormFeedback";
import { required } from "/modules/form/validation";
import { FORM_ERROR } from "final-form";
import RFDateField from "../form/RFDateField";
import RatingField from "../form/RatingField";
import MenuItem from "@mui/material/MenuItem";
import SelectField from "../form/SelectField";
import TimeField from "../form/TimeField";
import ModalForm from "../views/ModalForm";
import DateTimeField from "../form/DateTimeField";
import Button from '@mui/material/Button';
import MultiSelectField from "../form/MultiSelectField";

export default function MissionForm({
    appointment,
    isSettled,
    updateAppointment,
    deleteAppointment,
    addAppointment,
    handleClose,
}) {
    // deleteAppointment(appointment);
    console.log("appointmentData:", appointment);
    console.log("Title", appointment.title);
    const [sent, setSent] = React.useState(false);

    const validate = (values) => {
      let errors;
      if (isSettled) {
        errors = required(
          ["title", "deadline"],
          values
        );
      } else {
        errors = required(
            ["title", "deadline", "startHour", "endHour", "priority"],
            values
        );
        const l = parseInt(values.length, 10);
        if (!l) {
            errors.length = "Length must be a number";
        } else if (l < 15) {
            errors.length = "Length must be at least 15";
        }
      }
      return errors;
    };
    
    const convert = (timeString) =>{
      const timeParts = timeString.split(":");
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return timeAMPM = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }


    const handleSubmit = (values) => {
        setSent(true);
        console.log("add:", addAppointment);
        console.log("values first:", values);
        values.id = appointment ? appointment.id : 0;
        values.settled = isSettled;
        values.deadline = values.deadline['$d'];
        if (!isSettled) {
          values.optionalHours = [{hour: values.startHour['$d']}, {hour: values.endHour['$d']}];
          values.optionalDays = values.optionalDays.map((day) => {
            return {day: day};
          });
          values.length = parseInt(values.length, 10);
        } else {
          values.end = values.end['$d'];
          values.start = values.start['$d'];
        }
        console.log("values:", values);
        if (!appointment.title) {
          addAppointment(values);
        } else {
          updateAppointment(values);
        }
        console.log("AFTER CALL");
        setSent(false);
        handleClose();

        // let flag = false;
        // const res = await fetch("https://localhost:7204/api/Users/Login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // }).catch((err) => {
        //   flag = true;
        // });
        // if (flag) {
        //   setSent(false);
        //   return { [FORM_ERROR]: "Server error" };
        // } else if (res.status === 200) {
        //   const tokenJson = await res.json();
        //   dispatch(setAuthState("Bearer " + tokenJson.token));
        //   router.push("/");
        // } else {
        //   setSent(false);
        //   return { [FORM_ERROR]: "Wrong User name or Password" };
        // }
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
                        Appointment Form
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
                                autoComplete="Title"
                                autoFocus
                                component={RFTextField}
                                disabled={submitting || sent}
                                label="Title"
                                margin="normal"
                                name="title"
                                size="large"
                                defaultValue={appointment.title}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Field
                                autoComplete="Type"
                                autoFocus
                                component={RFTextField}
                                disabled={submitting || sent}
                                label="Type"
                                margin="normal"
                                name="type"
                                size="large"
                                defaultValue={appointment.title ? (appointment.extendedProps ? appointment.extendedProps.type : appointment.type) : ""}
                            />
                            <Field
                                autoComplete="Description"
                                autoFocus
                                multiline
                                component={RFTextField}
                                disabled={submitting || sent}
                                fullWidth
                                label="Description"
                                margin="normal"
                                name="description"
                                size="large"
                                defaultValue={appointment.title ? (appointment.extendedProps ? appointment.extendedProps.description : appointment.description) : ""}
                            />
                            <br />
                            {isSettled && (
                                <>
                                    <Typography variant="body1">
                                        {"Rank "}
                                    </Typography>
                                    <Field
                                        fullWidth
                                        size="large"
                                        component={RatingField}
                                        max={10}
                                        precision={1}
                                        disabled={submitting || sent}
                                        name="rank"
                                        autoComplete="current-password"
                                        label="Rank"
                                        margin="normal"
                                        readOnly={new Date().getTime() < new Date(appointment.end).getTime()}
                                        defaultValue={appointment.title ? (appointment.extendedProps ? appointment.extendedProps.rank : appointment.rank) : 0}
                                    />
                                    <br />
                                    <br />
                                    <Field
                                      fullWidth
                                      size="large"
                                      component={DateTimeField}
                                      disabled={submitting || sent}
                                      required
                                      name="start"
                                      autoComplete="Start"
                                      label="Start"
                                      margin="normal"
                                      defaultValue={appointment.startStr ? appointment.startStr : appointment.start}
                                    />
                                    <b> _ </b>
                                    <Field
                                        fullWidth
                                        size="large"
                                        component={DateTimeField}
                                        disabled={submitting || sent}
                                        required
                                        name="end"
                                        autoComplete="End"
                                        label="End"
                                        margin="normal"
                                        defaultValue={appointment.endStr ? appointment.endStr : appointment.end}
                                    />
                                    <br />
                                    <br />
                                </>
                            )}
                            <Field
                                fullWidth
                                size="large"
                                component={DateTimeField}
                                disabled={submitting || sent}
                                required
                                name="deadline"
                                autoComplete="Deadline"
                                label="Deadline"
                                margin="normal"
                                defaultValue={appointment.title ? (appointment.extendedProps ?
                                    (Object.prototype.toString.call(appointment.extendedProps.deadline) === '[object Date]' ? appointment.extendedProps.deadline.toISOString() : appointment.extendedProps.deadline) :
                                    appointment.deadline) : null}
                            />
                            <br />
                            <br />
                            {!isSettled && (
                                <>
                                    <Typography variant="body1">
                                        {"Optional hours"}
                                    </Typography>
                                    <Field
                                        fullWidth
                                        size="large"
                                        component={TimeField}
                                        disabled={submitting || sent}
                                        required
                                        name="startHour"
                                        autoComplete="Start hour"
                                        label="Start hour"
                                        margin="normal"
                                        defaultValue={
                                          appointment.title ? (appointment.optionalHours && appointment.optionalHours[0] ? new Date(appointment.optionalHours[0].hour) : null) : null
                                        }
                                    />
                                    <b> _ </b>
                                    <Field
                                        fullWidth
                                        size="large"
                                        component={TimeField}
                                        disabled={submitting || sent}
                                        required
                                        name="endHour"
                                        autoComplete="End hour"
                                        label="End hour"
                                        margin="normal"
                                        defaultValue={
                                          appointment.title ? (appointment.optionalHours && appointment.optionalHours[1] ? new Date(appointment.optionalHours[1].hour) : null) : null
                                        }
                                    />
                                    <br />
                                    <br />
                                    <Field
                                        size="large"
                                        component={MultiSelectField}
                                        disabled={submitting || sent}
                                        required
                                        name="optionalDays"
                                        autoComplete="OptionalDays"
                                        label="OptionalDays"
                                        margin="normal"
                                        readOnly={isSettled}
                                        defaultValue={appointment.optionalDays ? appointment.optionalDays.map(day=>day.day) : []}
                                        multiple
                                    >
                                        <MenuItem key={0} value={'Sunday'}>Sunday</MenuItem>
                                        <MenuItem key={1} value={'Monday'}>Monday</MenuItem>
                                        <MenuItem key={2} value={'Tuesday'}>Tuesday</MenuItem>
                                        <MenuItem key={3} value={'Wednesday'}>Wednesday</MenuItem>
                                        <MenuItem key={4} value={'Thursday'}>Thursday</MenuItem>
                                        <MenuItem key={5} value={'Friday'}>Friday</MenuItem>
                                        <MenuItem key={6} value={'Saturday'}>Saturday</MenuItem>
                                    </Field>
                                    <br />
                                    <br />
                                </>
                            )}
                            <Box sx={{display: 'flex'}}>
                                <Field
                                    size="large"
                                    component={SelectField}
                                    disabled={submitting || sent}
                                    sx={{flexGrow: 1}}
                                    required
                                    name="priority"
                                    autoComplete="Priority"
                                    label="Priority"
                                    margin="normal"
                                    readOnly={isSettled}
                                    defaultValue={appointment.priority ? appointment.priority :(appointment.extendedProps && appointment.extendedProps.priority ? appointment.extendedProps.priority : 1)}
                                >
                                    <MenuItem value={2}>Low</MenuItem>
                                    <MenuItem value={1}>Medium</MenuItem>
                                    <MenuItem value={0}>High</MenuItem>
                                </Field>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {!isSettled && (
                                    <Field
                                    autoComplete="60"
                                    autoFocus
                                    component={RFTextField}
                                    disabled={submitting || sent}
                                    label="Length (minutes)"
                                    margin="normal"
                                    name="length"
                                    size="large"
                                    pattern='[0-9]*'
                                    inputMode='numeric'
                                    defaultValue={appointment.title ? (appointment.extendedProps ? appointment.extendedProps.length: appointment.length) : '60'}
                                />)}
                            </Box>
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
                                {submitting || sent ? "In progress…" : "Save"}
                            </FormButton>
                            {appointment.title && <Button sx={{ mt: 3, mb: 2 }} size="large" color="warning" variant="contained" onClick={()=>{deleteAppointment(appointment)}}>
                              Delete
                            </Button>}
                        </Box>
                    )}
                </Form>
            </ModalForm>
        </React.Fragment>
    );
}
