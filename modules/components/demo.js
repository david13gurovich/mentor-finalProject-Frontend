import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { ViewState , EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  DateNavigator,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import React, { useState } from 'react';
import { useKeyPress } from './hooks';
import MissionForm from './missionForm';
import ToolBox from './toolBox';

export default function Demo({ data, setData }) {
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
    const isShift = useKeyPress("Shift");
    const Label = (props) => {
      // eslint-disable-next-line react/destructuring-assignment
      const newProp = {...props};
      if (props.text === "Details") {
        newProp.text = "Mission Details";
      } else if (props.text === "More Information") {
        return null;
      }
      return <AppointmentForm.Label {...newProp} />;
    };

    const Layout = (props) => {
      // eslint-disable-next-line react/destructuring-assignment
      //return <AppointmentForm.Layout {isRecurrence: false, basicLayoutComponent: null, commandLayoutComponent: props.commandLayoutComponent, recurrenceLayoutComponent: props.recurrenceLayoutComponent} />;
      //const something = {isRecurrence: false, basicLayoutComponent: null, commandLayoutComponent: props.commandLayoutComponent, recurrenceLayoutComponent: props.recurrenceLayoutComponent};
      return <AppointmentForm.Layout {...props} />;
    };
    
    const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
      console.log(restProps);      
      const [interval, setInterval] = useState([20, 37]);
      const [dayName, setDayName] = useState([]);
      const [rank, setRank] = useState(1);

      const onDescriptionChange = (nextValue) => {
        appointmentData.description = nextValue;
        onFieldChange({ description: nextValue });
      };
      const onTitleChange = (nextValue) => {
        appointmentData.title = nextValue;
        onFieldChange({ title: nextValue });
      };
      const onDeadlineChange = (nextValue) => {
        onFieldChange({ deadline: nextValue });
      };
      const onSelectChange = (nextValue) => {
        onFieldChange({ priority: nextValue });
      };
    
      const onSliderChange = (event, newValue) => {
        setInterval(newValue);
        onFieldChange({ optionalHours: newValue });
      };
    
      const onRankChange = (event, nextValue) => {
        setRank(nextValue);
        onFieldChange({ rank: nextValue });
      };

      return (
        <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <MissionForm onTitleChange={onTitleChange} appointmentData={appointmentData} interval={interval} day={[dayName, setDayName]} onDeadlineChange={onDeadlineChange}
                        onSliderChange={onSliderChange} onDescriptionChange={onDescriptionChange} onRankChange={onRankChange}
                        onSelectChange={onSelectChange} rank={rank}
        />
      </AppointmentForm.BasicLayout>
      );
    };

    function commitChanges({ added, changed, deleted }) {
      setData(() => {
        let d = data;
        if (added) {
          const startingAddedId = d.length > 0 ? d[d.length - 1].id + 1 : 0;
          d = [...d, { id: startingAddedId, ...added }];
        }
        if (changed) {
          if (isShift) {
            const changedAppointment = d.find(appointment => changed[appointment.id]);
            const startingAddedId = d.length > 0 ? d[d.length - 1].id + 1 : 0;
            d = [
              ...d,
              { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
            ];
          } else {
            d = d.map(appointment => (
              changed[appointment.id]
                ? { ...appointment, ...changed[appointment.id] }
                : appointment));
          }
        }
        if (deleted !== undefined) {
          d = d.filter(appointment => appointment.id !== deleted);
        }
        return d;
      });
    };

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={commitChanges}          />
          <EditRecurrenceMenu />
          <IntegratedEditing />

          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <MonthView />

          <Toolbar flexibleSpaceComponent={()=> {
            
            return(
              <Toolbar.Root>
                <Button onClick={toggleDrawer(true)}>{"left"}</Button>
                <SwipeableDrawer
                  anchor={"left"}
                  open={state}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <ToolBox data={data} setData={setData} />
                </SwipeableDrawer>
            </Toolbar.Root>
              
            );
          }
            
          } />
            
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={()=>(null)}
            layoutComponent={Layout}
            labelComponent={Label}
            booleanEditorComponent={()=>{null}}
          />
          <AllDayPanel />
          <DragDropProvider
          />
        </Scheduler>
      </Paper>
    );
}
