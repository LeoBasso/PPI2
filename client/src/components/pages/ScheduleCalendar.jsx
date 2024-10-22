import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import './custom-calendar.css';
import { useFetchServices } from "../../queries/services/services";
import { useFetchUsers } from "../../queries/users/users";

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay,
  locales,
});

const ScheduleCalendar = ({ schedules }) => {
  const [events, setEvents] = useState([]);
  const { data: services } = useFetchServices();
  const { data: users } = useFetchUsers();

  useEffect(() => {
    if (schedules && services && users) {
      const mappedEvents = schedules
        .filter(schedule => schedule.status === 'Aceito')
        .map(schedule => {
          const service = services.find(service => service?.id === schedule?.service_id);
          const scheduleUser = users.find(u => u.id === schedule?.user_id);

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

  const messages = {
    allDay: 'Dia inteiro',
    previous: 'Anterior',
    next: 'Próximo',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Nenhum evento neste período.',
    showMore: total => `+ Ver mais (${total})`
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        messages={messages}
        culture="pt-BR"  
      />
    </div>
  );
};

export default ScheduleCalendar;
 