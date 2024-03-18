import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from '../components/Typography';
import Modal from '@mui/material/Modal';
import MissionForm from './missionForm';
import { createEventId } from './event-utils'
import ToolBox from './toolBox';

export default function Demo ({ settledAppointments, unSettledAppointments, setSettledAppointments, setUnSettledAppointments, token, reFetch,
    history, addToHistory, addAllToHistory, setHistory}) {
    console.log("SETTLED", settledAppointments);
    console.log("UNSETTLED", unSettledAppointments);

    const [currentEvents, setCurrentEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState({});
    const [drawer, setDrawer] = React.useState(false);
    const [open, setOpen] = React.useState('');
    const calendarRef = React.useRef(null);
    const [calAPI, setCalAPI] = React.useState(false);

    const reFetchEvents = () => {
        if (calAPI) {
            calAPI.refetchEvents();
        }
    }

    const getAppointments = () => {
        return settledAppointments;
    }

    React.useEffect(() => {
        setCalAPI(calendarRef.current.getApi());
        // Use the calendarApi to interact with the FullCalendar API
        // For example, you can call calendarApi.next() to navigate to the next view
        let cal = calendarRef.current.getApi();
        cal.addEventSource({events: (info, successCallback, failureCallback)=>{
            console.log("Settled appointments at Refetch", getAppointments());
            successCallback(getAppointments())}});
        // cal.refetchEvents();
      }, [calendarRef]);

    //   React.useEffect(() => {
    //     console.log("Refetching events")
    //     // let cal = calendarRef.current.getApi();
    //     // cal.getEventSources().forEach((source) => {
    //     //     source.remove();
    //     // });
    //     // cal.addEventSource({events: reFetchEvents});
    //     // cal.addEventSource({events: settledAppointments});
    //     // cal.refetchEvents();
    //     // reFetchEvents();
    //   }, [settledAppointments]);

    const handleClose = (event, reason) => {
        console.log(reason);
        setOpen('');
    };

    const handleDateSelect = (selectInfo) => {
        // let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        const event = {id: createEventId() ,start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay, settled: true};
        setSelectedEvent(event);
        handleEventClick(event.id);

        console.log(selectInfo)
        // if (title) {
        //   calendarApi.addEvent({
        //     id: createEventId(),
        //     title,
        //     start: selectInfo.startStr,
        //     end: selectInfo.endStr,
        //     allDay: selectInfo.allDay
        //   })
        // }
    }

    const handleEventClick = (id) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //   clickInfo.event.remove()
        // }
        setOpen(id);
    }
    
    const handleEvents = (events) => {
        console.log("SET EVENTS", events);
        setCurrentEvents(events);
    }

    const handleEventAdd = (addInfo) => {
        console.log("ENTERED EVENT ADD");
        console.log("ADD INFO", addInfo);   
        const event = {
            id: 0,
            title: addInfo.event.title,
            description: addInfo.event.extendedProps.description,
            type: addInfo.event.extendedProps.type,
            length: addInfo.event.extendedProps.length,
            optionalDays: addInfo.event.extendedProps.optionalDays,
            optionalHours: addInfo.event.extendedProps.optionalHours,
            deadLine: addInfo.event.extendedProps.deadline,
            priority: addInfo.event.extendedProps.priority,
            settled: addInfo.event.extendedProps.settled,
            startDate: addInfo.event.startStr,
            endDate: addInfo.event.endStr,
            rank: addInfo.event.extendedProps.rank,
        };
        console.log("SENDING:", event);
        fetch("https://localhost:7204/api/Missions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(event),
        }).catch((error) => {
            console.log("FETCH ERROR", error);
        })
        .then((response) => {
            console.log("FETCH RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log(addInfo);
            if (!addInfo.event.extendedProps.settled) {
                console.log("UN AFTER ADD FETCH" ,unSettledAppointments);
                unSettledAppointments[unSettledAppointments.length - 1].id = data;
                const apps = unSettledAppointments.slice();
                setUnSettledAppointments(apps);
            } else {
                addInfo.event.setProp("id", data);
                settledAppointments[settledAppointments.length - 1].id = data;
                const apps = settledAppointments.slice();
                setSettledAppointments(apps);
            }  
        });
    };

    const handleEventChange = (changeInfo) => {
        console.log("ENTERED HANDLE EVENT CHANGE", changeInfo);
        const event = {
            id: changeInfo.event.id,
            title: changeInfo.event.title,
            description: changeInfo.event.extendedProps.description,
            type: changeInfo.event.extendedProps.type,
            optionalDays: changeInfo.event.extendedProps.optionalDays,
            optionalHours: changeInfo.event.extendedProps.optionalHours,
            settled: changeInfo.event.extendedProps.settled,
            startDate: changeInfo.event.startStr,
            endDate: changeInfo.event.endStr,
            rank: changeInfo.event.extendedProps.rank,
            deadLine: changeInfo.event.extendedProps.deadline,
            priority: changeInfo.event.extendedProps.priority,
            length: changeInfo.event.extendedProps.length,
        };
        fetch("https://localhost:7204/api/Missions/0", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(event),
        });
    };

    const handleEventRemove = (removeInfo) => {
        console.log("ENTERED HANDLE EVENT REMOVE");
        fetch("https://localhost:7204/api/Missions/" + removeInfo.event.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "text/plain",
                Authorization: token,
            },
        });
    };

    const deleteEvent = (appointment) => {
        console.log("Calling deleteEvent", calAPI.getEvents())
        console.log("Appointment", appointment);
        if (appointment.settled || (appointment.extendedProps && appointment.extendedProps.settled)) {
            const event = calAPI.getEventById(appointment.id);
            event.remove();
            const index = settledAppointments.findIndex((app) => app.id === appointment.id);
            setSettledAppointments(settledAppointments.toSpliced(index, 1));
        } else {
            handleEventRemove({event: {id: appointment.id}});
            const index = unSettledAppointments.findIndex((app) => app.id === appointment.id);
            setUnSettledAppointments(unSettledAppointments.toSpliced(index, 1));
        }
    }

    const addEvent = (appointment) => {
        console.log("Calling calAPI.addEvent")
        let apps;
        if (!appointment.settled) {
            apps = unSettledAppointments.slice();
            apps.push(appointment);
            unSettledAppointments = apps;
            setUnSettledAppointments(apps);
            handleEventAdd({event: {title: appointment.title, extendedProps: {description: appointment.description, type: appointment.type,
                optionalDays: appointment.optionalDays, optionalHours: appointment.optionalHours, settled: appointment.settled,
                startStr: appointment.start, endStr: appointment.end, deadline: appointment.deadline, priority: appointment.priority, length: appointment.length,}}});
        } else {
            apps = settledAppointments.slice();
            apps.push(appointment);
            settledAppointments = apps;
            setSettledAppointments(apps);
            calAPI.addEvent(appointment);
        }
        console.log("Called calAPI.addEvent")
    }

    const updateEvent = (appointment) => {
        console.log("Calling updateEvent", appointment)

        if (!appointment.settled) {
            handleEventChange({event: {title: appointment.title, id: appointment.id, extendedProps: {description: appointment.description, type: appointment.type,
                optionalDays: appointment.optionalDays, optionalHours: appointment.optionalHours, settled: appointment.settled,
                startStr: appointment.start, endStr: appointment.end, deadline: appointment.deadline, priority: appointment.priority, length: appointment.length,}}});
            const apps = unSettledAppointments.slice();
            const index = apps.findIndex((app) => app.id === appointment.id);
            apps[index] = appointment;
            setUnSettledAppointments(apps);
        } else {
            let rankFlag = false;
            const event = calAPI.getEventById(appointment.id);
            console.log("Event TO UPDATE", event);
            if (appointment.start != event.startStr) {
                event.setStart(appointment.start);
            }
            if (appointment.end != event.endStr) {
                event.setEnd(appointment.end);
            }
            if (appointment.title != event.title) {
                event.setProp('title', appointment.title);
            }
            Object.entries(appointment).forEach(([key, value]) => {
                if(key == 'start' || key == 'end' || key == 'id' || key == 'title' || key == 'settled') {
                    return;
                }
                if (value != event.extendedProps[key]) {
                    event.setExtendedProp(key, value);
                    if (key == 'rank') {
                        rankFlag = true;
                        event.setExtendedProp('settled', false);
                        addToHistory(appointment);
                        const newHistory = history.slice();
                        const hisAppointment = structuredClone(appointment);
                        hisAppointment.history = true;
                        hisAppointment.id = "his";
                        hisAppointment.editable = false;
                        newHistory.push(hisAppointment);
                        setHistory(newHistory);
                    }
                }
            });
            const apps = settledAppointments.slice();
            const index = apps.findIndex((app) => app.id === appointment.id);
            if (rankFlag) {
                apps.splice(index, 1);
                setUnSettledAppointments(unSettledAppointments.concat(appointment));
            } else {
                apps[index] = appointment;
            }
            setSettledAppointments(apps);
        }
        window.location.href = window.location.href;
    }

    const renderEventContent = (eventInfo) => {
        return (
            <Typography variant="body2" align="center">
            {eventInfo.timeText} {eventInfo.event.title}
                <Modal
                open={open && (!eventInfo.event.extendedProps.history) ? open == eventInfo.event.id : false}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
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
                    appointment={eventInfo.event} isSettled={true} updateAppointment={updateEvent}
                    deleteAppointment={deleteEvent} addAppointment={addEvent} handleClose={handleClose} />
                </Modal>
          </Typography>
        );
    }
      
    const renderSidebarEvent = (event) => {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
    }

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
        setDrawer(open);
    };

    return (
      <div className='demo-app'>
        <SwipeableDrawer
            anchor={"left"}
            open={drawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <ToolBox settledAppointments={settledAppointments} unSettledAppointments={unSettledAppointments} setSettledAppointments={setSettledAppointments} reFetch={reFetchEvents}
            setUnSettledAppointments={setUnSettledAppointments} addAppointment={addEvent} deleteAppointment={deleteEvent} updateAppointment={updateEvent} token={token}/>
        </SwipeableDrawer>
        <Modal
            open={open == selectedEvent.id}
            onClose={handleClose}
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
                <MissionForm appointment={selectedEvent} isSettled={selectedEvent.settled} updateAppointment={updateEvent}
                    deleteAppointment={deleteEvent} addAppointment={addEvent} handleClose={handleClose} />
        </Modal>
        <div className='demo-app-main'>
          <FullCalendar
            ref={calendarRef}
            customButtons={
                {
                    custom1: {
                        text: 'Tool Box',
                        click: toggleDrawer(true),
                    },
                }
            }
            slotMinTime={'09:00:00'}
            slotMaxTime={'19:00:00'}
            slotDuration={'00:15:00'}
            allDaySlot={false}
            height={'auto'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'custom1 prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={history} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={(clickInfo)=>{handleEventClick(clickInfo.event.id)}}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // you can update a remote database when these fire:
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove} 
          />
        </div>
      </div>
    ) 

}
