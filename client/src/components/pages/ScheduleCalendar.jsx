import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isBefore } from "date-fns";
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

// Função para formatar a data de forma consistente
const formatDate = (date) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

// Função para mapear os eventos
const mapEvents = (schedules, services, users) => {
  return schedules
    .filter(schedule => schedule.status === 'Aceito')
    .map(schedule => {
      const service = services.find(service => service?.id === schedule?.service_id);
      const scheduleUser = users.find(u => u.id === schedule?.user_id);

      const startDate = new Date(`${formatDate(schedule.date)}T${schedule.hour.padStart(2, '0')}:00`);
      const isPastEvent = isBefore(startDate, new Date());

      return {
        id: schedule.id,  // Adicionando o ID ao evento para rastrear o clique
        title: `${service?.type} - ${scheduleUser?.name}`,
        start: startDate,
        end: new Date(startDate.getTime() + (service?.time * 60000)),
        isPastEvent,
      };
    });
};

const ScheduleCalendar = ({ schedules }) => {
  const [events, setEvents] = useState([]);
  const [clickedEvent, setClickedEvent] = useState(null);  // Estado para armazenar o evento clicado
  const { data: services } = useFetchServices();
  const { data: users } = useFetchUsers();

  useEffect(() => {
    if (schedules && services && users) {
      const mappedEvents = mapEvents(schedules, services, users);
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

  // Função para lidar com o clique no evento
  const handleEventClick = (eventId) => {
    setClickedEvent(prevClickedEvent => prevClickedEvent === eventId ? null : eventId);
  };

  // Função para definir o estilo do evento com base no estado de clique
  const eventStyleGetter = (event) => {
    return {
      className: event.isPastEvent 
        ? (event.id === clickedEvent ? 'past-event-selected' : 'past-event') 
        : '',
    };
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        messages={messages}
        culture="pt-BR"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleEventClick(event.id)} // Adicionando o clique no evento
      />
    </div>
  );
};

export default ScheduleCalendar;
