import Demo from "/modules/components/fullCalendarDemo";
import { appointments } from '../public/demo_data/month_appointments';
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState } from "/modules/model/auth";
import withRoot from "/modules/withRoot";
import { useRouter } from 'next/router';
import AppAppBar from "/modules/views/AppAppBar";
import AppFooter from "/modules/views/AppFooter";
import LoadingScreen from "/modules/views/loading";
import { appointmentsToEvent } from "../modules/lib/eventAdapter";
import { selectUserNameState } from "../modules/model/auth";
import { addAllHistory, addHistory, selectHistoryState, setHistoryState } from "../modules/model/history";
import { set } from "date-fns";


const getAppointments = async (auth) => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  const res = await fetch('https://localhost:7204/api/Missions', {
    method: "GET",
    headers: {
      accept: "text/plain",
      Authorization: auth,
      },
      }).catch((err) => {
        return {ok: false};
      });
  if (!res.ok) {
    return {
        redirect: true,
    };
  }
  const repo = await res.json()
  console.log("REPO", repo);
  const settledAppoitments = []
  const unSettledAppoitments = []
  repo.forEach(element => {
    if (element.settled) {
      settledAppoitments.push(element)
    } else {
      unSettledAppoitments.push(element)
    }
  });
  return {
      redirect: false,
      settledAppointments: appointmentsToEvent(settledAppoitments),
      unSettledAppointments: appointmentsToEvent(unSettledAppoitments),
  };
};




function Sched() {
  const auth = useSelector(selectAuthState);
  const router = useRouter();
  const [settledAppointments, setSettledAppointments] = useState([]);
  const [unSettledAppointments, setUnSettledAppointments] = useState([]);
  const userName = useSelector(selectUserNameState);
  const [history, setHistory] = useState(useSelector((state) => state.history[userName]));
  const dispatch = useDispatch();
  const addToHistory = (event) => {
    dispatch(addHistory({user: userName, event: event}));
  };
  const addAllToHistory = (events) => {
    dispatch(addAllHistory({user: userName, events: events}));
  };

  let [fetching, setFetching] = useState(true);
  const reFetch = () => {
    setFetching(!fetching);
  };
  const [promise, setPromise] = useState(
    {
      redirect: true,
    }
  );
  useEffect(() => {
    console.log("Fetching appointments");
    const redirect = () => {
      router.push("/in/sign-in");
    };
    getAppointments(auth).then((res) => {
      setPromise(res);
      if(res.redirect) {
        redirect();
      }
      setSettledAppointments(res.settledAppointments);
      setUnSettledAppointments(res.unSettledAppointments);
    });
  }, [fetching]);
  if (promise.redirect) {
    return (<LoadingScreen />);
  } else {
    return (
      <React.Fragment>
        <AppAppBar />
          <Demo settledAppointments={settledAppointments} unSettledAppointments={unSettledAppointments} reFetch={reFetch} history={history}
          addToHistory={addToHistory} addAllToHistory={addAllToHistory} setSettledAppointments={setSettledAppointments}
          setUnSettledAppointments={setUnSettledAppointments} token={auth} setHistory={setHistory}/>
        <AppFooter />
      </React.Fragment>
    )
  }    
}

export default withRoot(Sched);