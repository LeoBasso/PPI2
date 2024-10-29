import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#131313] text-white">
      <div className="w-full max-w-screen-xl mx-auto p-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center sm:flex-row sm:items-center mb-4 sm:mb-0">
          <a href="/" className="flex items-center text-2xl font-bold bg-white bg-clip-text text-transparent hover:bg-gradient-to-r from-[#6e776e] to-[#525252]">
              <img src="/vite.svg" alt="Logo" className="w-8 h-8 mr-2" />
              TimeSync™
            </a>
            <span className="text-sm mt-1 text-gray-400 sm:mt-0 sm:ml-4">© 2024 Todos os direitos reservados.</span>
          </div>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#6e776e]">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#6e776e]">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#6e776e]">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        <div className="text-center text-gray-400 text-sm">
          Desenvolvido com por TimeSync
        </div>
        
        <ul className="flex justify-center space-x-4 text-sm font-medium text-gray-300 mt-4">
          <li>
            <a href="mailto:leobasso08@gmail.com" className="hover:underline hover:text-[#6e776e]">
              Contato
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline hover:text-[#6e776e]">
              Sobre
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
