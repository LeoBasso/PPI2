import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment); // Set up the localizer

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([
      {
        start: new Date(2024, 9, 15, 10, 0), // 15 de outubro, 10h
        end: new Date(2024, 9, 15, 12, 0), // 15 de outubro, 12h
        title: 'Reunião com a equipe',
      },
      {
        start: new Date(2024, 9, 16, 14, 0), // 16 de outubro, 14h
        end: new Date(2024, 9, 16, 15, 0), // 16 de outubro, 15h
        title: 'Chamada com cliente',
      },
    ]);
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Novo evento:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
        onSelectSlot={handleSelect} // Adiciona um evento ao clicar em um slot
        selectable
      />
    </div>
  );
};

export default App;
