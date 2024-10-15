import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaPaintBrush,
  FaEnvelope,
  FaWpforms
} from 'react-icons/fa';
import { getUserFromLocalStorage } from './localStorage';

const user = getUserFromLocalStorage();

let links

if (user?.role == 'admin') {
  links = [
    {
      id: 1,
      text: 'Perfil',
      path: '/',
      icon: FaUserAlt,
    },
    {
      id: 2,
      text: 'Serviços',
      path: '/service',
      icon: FaPaintBrush,
    },
    {
      id: 3,
      text: 'Gerenciar agendamentos',
      path: '/schedules',
      icon: FaEnvelope,
    },
    {
      id: 4,
      text: 'Calendário',
      path: '/calendar',
      icon: FaRegCalendarAlt,
    },
  ];
} else {
  links = [
    {
      id: 1,
      text: 'Perfil',
      path: '/',
      icon: FaUserAlt,
    },
    {
      id: 3,
      text: 'Meus agendamentos',
      path: '/schedules',
      icon: FaWpforms,
      
    },
    
  ];
}
export { links };
