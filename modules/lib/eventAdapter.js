export function appointmentsToEvent(appArray) {
    const events = appArray.map((app) => {
        const start = app.startDate;
        const end = app.endDate;
        delete app.startDate;
        delete app.endDate;
        return {start: start, end: end, ...app};
    });
    return events;
}