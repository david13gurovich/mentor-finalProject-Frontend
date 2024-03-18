import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeveloperBoardSharpIcon from '@mui/icons-material/DeveloperBoardSharp';
import AssistantSharpIcon from '@mui/icons-material/AssistantSharp';
import { green } from '@mui/material/colors';
import MissionForm from "./missionForm";
import SuggestForm from "../views/suggestForm";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function ToolBox({ settledAppointments, unSettledAppointments, addAppointment, deleteAppointment,
                                    updateAppointment, token, setSettledAppointments, setUnSettledAppointments, reFetch }) {
    const [checked, setChecked] = React.useState([0]);
    const [checked2, setChecked2] = React.useState(Array(unSettledAppointments.length).fill(false));
    const [open, setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [suggest, setSuggest] = React.useState(false);

    const handleModal = () => {
        setModal(false);
    };

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };
    const handleOpen = (id) => {
        setOpen(id);
    };
    const handleClose = (event, reason) => {
        console.log(reason);
        setOpen("");
    };

    const handleSuggestOpen = (id) => {
        setSuggest(true);
    };
    const handleSuggestClose = (event, reason) => {
        setSuggest(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggle2 = (index) => () => {
        const newChecked = [...checked2];
        newChecked[index] = !newChecked[index];
        setChecked2(newChecked);
    };

    const callSuggest = (type) => {
        fetch("https://localhost:7204/api/Missions/SuggestMissions?type=" + type, {
            method: "GET",
            headers: {
                accept: "text/plain",
                Authorization: token,
                },
                }).then((res) => {
                    if (!res.ok) {
                        throw new Error("HTTP error " + res.status);
                    }
                    return res.json();
                }).then((res) => {
                    setUnSettledAppointments(unSettledAppointments.concat(res));
                }).catch((err) => {
                    console.log(err);
                }
            );
    };

    const callAlgorithm = () => {
        const setting = {
            id: 0,
            startHour: "2023-06-11T09:00:00.000Z",
            endHour: "2023-06-17T18:00:00.000Z",
            minGap: 15,
            maxHoursPerDay: 6,
            minTimeFrame: 15,
        }
        console.log("Check2:", checked2);
        console.log("Check:", checked);
        const unsettledIds = checked2.map((value, index) => {
            if (value) {
                return unSettledAppointments[index].id;
            }
        }).filter(value => value !== undefined);
        const checkedSettledIds = settledAppointments
        .filter(appointment => checked.includes(appointment.id)) // Filter appointments based on checked IDs
        .map(appointment => parseInt(appointment.id, 10));
        console.log("Unsettled:", unsettledIds);
        console.log("Settled:", checkedSettledIds);
        fetch("https://localhost:7204/api/Algo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({setting: setting, missionsId: [...unsettledIds, ...checkedSettledIds]}),
        }).catch((error) => {
            console.log("FETCH ERROR", error);
        })
        .then((response) => {
            console.log("FETCH RESPONSE", response);
            if (response || !response.ok) {
                return {missions: []};
            }
            return response.json();
        }).then((data) => {
            console.log("FETCH DATA", data);
            let missions = data.missions;
            if (missions.length === 0) {
                return;
            }
            let newSettledAppointments = [];
            let newUnSettledAppointments = [];
            missions.forEach((mission) => {
                if (mission.settled) {
                    newSettledAppointments.push(mission)
                } else {
                    newUnSettledAppointments.push(mission)
                }
            });
            setSettledAppointments(newSettledAppointments);
            setUnSettledAppointments(newUnSettledAppointments);
            // reFetch();
        });
        window.location.href = window.location.href;
        // if response is ok, then update the state settledAppointments to be with the new missions, and delete them from unSettledAppointments
        // or Refresh the page
    };

    const settledListItems = settledAppointments.map((appointment, index) => {
        const labelId = `checkbox-list-label-${appointment.id}`;
        return (
            <ListItem
                key={appointment.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={()=>{deleteAppointment(appointment)}}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(appointment.id) !== -1}
                        tabIndex={appointment.id}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={handleToggle(appointment.id)}
                    />
                </ListItemIcon>
                <ListItemButton
                    role={undefined}
                    onClick={() => handleOpen(appointment.id)}
                    dense
                >
                    <ListItemText
                        primary={appointment.title}
                        secondary={appointment.description}
                    />
                </ListItemButton>
                <Modal
                    open={open ? open == appointment.id : false}
                    onClose={handleClose}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    // slots={{ backdrop: Backdrop }}
                    // slotProps={{
                    //     backdrop: {
                    //     sx: {
                    //         borderColor: 'rgba(255, 255, 255, 0)',
                    //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    //     },
                    //     },
                    // }}
                    aria-labelledby="modal-title"
                >
                    <MissionForm
                        appointment={appointment}
                        isSettled={appointment.settled}
                        updateAppointment={updateAppointment}
                        deleteAppointment={deleteAppointment}
                        addAppointment={addAppointment}
                        handleClose={handleClose}
                    />
                </Modal>
            </ListItem>
        );
    });

    const unSettledListItems = unSettledAppointments.map((appointment, index) => {
        const labelId = `checkbox-list-label-${appointment.id}`;
        return (
            <ListItem
                key={appointment.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={()=>{deleteAppointment(appointment)}}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked2[index]}
                        tabIndex={appointment.id}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                        onClick={handleToggle2(index)}
                    />
                </ListItemIcon>
                <ListItemButton
                    role={undefined}
                    onClick={() => handleOpen(appointment.id)}
                    dense
                >
                    <ListItemText
                        primary={appointment.title}
                        secondary={appointment.description}
                    />
                </ListItemButton>
                <Modal
                    open={open ? open == appointment.id : false}
                    onClose={handleClose}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    // slots={{ backdrop: Backdrop }}
                    // slotProps={{
                    //     backdrop: {
                    //     sx: {
                    //         borderColor: 'rgba(255, 255, 255, 0)',
                    //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    //     },
                    //     },
                    // }}
                    aria-labelledby="modal-title"
                >
                    <MissionForm
                        appointment={appointment}
                        isSettled={appointment.settled}
                        updateAppointment={updateAppointment}
                        deleteAppointment={deleteAppointment}
                        addAppointment={addAppointment}
                        handleClose={handleClose}
                    />
                </Modal>
            </ListItem>
        );
    });

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <IconButton edge="end" aria-label="algorithm" onClick={callAlgorithm}>
                            <DeveloperBoardSharpIcon fontSize="large" sx={{ color: green[500] }}/>
                </IconButton>
                <IconButton edge="end" aria-label="add" color="secondary" onClick={()=>{setModal(true)}}>
                            <AddCircleSharpIcon fontSize="large"/>
                </IconButton>
                <Modal
                    open={modal}
                    onClose={handleModal}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    // slots={{ backdrop: Backdrop }}
                    // slotProps={{
                    //     backdrop: {
                    //     sx: {
                    //         borderColor: 'rgba(255, 255, 255, 0)',
                    //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    //     },
                    //     },
                    // }}
                    aria-labelledby="modal-title"
                    >
                        <MissionForm appointment={{}} isSettled={false} updateAppointment={updateAppointment}
                            deleteAppointment={deleteAppointment} addAppointment={addAppointment} handleClose={handleModal} />
                </Modal>
                <Tabs
                    value={tab}
                    onChange={handleTab}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs"
                >
                    <Tab value={0} label="Unsettled" />
                    <Tab value={1} label="Settled" />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Grid item xs={12} md={6}>
                        <Demo>
                            <List>{unSettledListItems}</List>
                        </Demo>
                    </Grid>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Grid item xs={12} md={6}>
                        <Demo>
                            <List>{settledListItems}</List>
                        </Demo>
                    </Grid>
                </TabPanel>
            </Box>
            <Modal
                    open={suggest}
                    onClose={handleSuggestClose}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-labelledby="modal-title"
                    >
                        <SuggestForm handleClose={handleSuggestClose} suggest={callSuggest} />
                </Modal>
            <IconButton edge="end" aria-label="add" color="secondary" onClick={handleSuggestOpen}>
                            <AssistantSharpIcon fontSize="large"/>
            </IconButton>
        </React.Fragment>
    );
}
