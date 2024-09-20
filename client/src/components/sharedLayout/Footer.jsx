function Footer() {
  return (
    <footer className="bg-gray-800 rounded-lg shadow  mt-5 mr-4 ml-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="" className="hover:underline">
                
              </a>
            </li>
          </ul>
        </div>
        <hr className=" border-gray-200 " />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {" "}
          <a href="/" className="hover:underline">
            
          </a>
          
        </span>
      </div>
    </footer>
  );
}

export default Footer;
