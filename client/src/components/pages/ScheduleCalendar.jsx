import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchServices } from "../../queries/services/services";
import { useFetchUsers } from "../../queries/users/users";

const localizer = momentLocalizer(moment);

const ScheduleCalendar = ({ schedules }) => {
  const [events, setEvents] = useState([]);
  const { data: services } = useFetchServices();
  const { data: users } = useFetchUsers();

  useEffect(() => {
    if (schedules && services && users) {
      const mappedEvents = schedules.map(schedule => {
        const service = services.find(service => service?.id === schedule?.service_id);
        const scheduleUser = users.find(u => u.id === schedule?.user_id);

        // Função auxiliar para formatar a data de DD/MM/YYYY para YYYY-MM-DD
        const formatDate = (date) => {
          const [day, month, year] = date.split('/');
          return `${year}-${month}-${day}`;
        };

        return {
          title: `${service?.type} - ${scheduleUser?.name}`,
          start: new Date(`${formatDate(schedule.date)}T${schedule.hour.padStart(2, '0')}:00`), // Combina a data e hora
          end: (() => {
            const startDate = new Date(`${formatDate(schedule.date)}T${schedule.hour.padStart(2, '0')}:00`);
            const durationMinutes = service?.time;
            const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
            return endDate;
          })(),
        };
      });
      setEvents(mappedEvents);
    }

  }, [schedules, services, users]);

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
      />
    </div>
  );
};

export default ScheduleCalendar;

