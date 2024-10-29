import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaPaintBrush,
  FaEnvelope,
  FaWpforms,
  FaUsers
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
      text: 'Usuários do sistema',
      path: '/users',
      icon: FaUsers,
    },
    {
      id: 3,
      text: 'Serviços',
      path: '/service',
      icon: FaPaintBrush,
    },
    {
      id: 4,
      text: 'Gerenciar agendamentos',
      path: '/schedules',
      icon: FaEnvelope,
    },
    {
      id: 5,
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
