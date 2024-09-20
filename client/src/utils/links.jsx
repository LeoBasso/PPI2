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
      path: '/profile',
      icon: FaUserAlt,
    },
    {
      id: 2,
      text: 'Atividades',
      path: '/',
      icon: FaRunning,
    },
    // {
    //   id: 3,
    //   text: 'Registrar usuário',
    //   path: '/register',
    //   icon: FaRunning,
    // },
  ];
} else {
  links = [
    {
      id: 1,
      text: 'Perfil',
      path: '/profile',
      icon: FaUserAlt,
    },
    {
      id: 2,
      text: 'Atividades',
      path: '/',
      icon: FaRunning,
    },
  ];
}
export { links };
