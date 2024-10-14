import {
  FaRunning,
  FaUserAlt,
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
      icon: FaRunning,
    },
    {
      id: 3,
      text: 'Meus agendamentos',
      path: '/schedules',
      icon: FaRunning,
    },
    {
      id: 4,
      text: 'Solicitações agendamento',
      path: '/schedulesUpdate',
      icon: FaRunning,
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
      icon: FaRunning,
    },
    
  ];
}
export { links };
