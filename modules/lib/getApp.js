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