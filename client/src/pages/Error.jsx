import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#6e776e]">
        <h1 className="text-9xl font-extrabold text-[#fff7ed] tracking-widest">404</h1>
        <div className="bg-[#FF6A3D] px-2 text-sm text-[#fff7ed] rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <Link
            to="/"
            className="relative inline-block text-sm font-medium text-[#fff7ed] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#fff7ed] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
            <span className="relative block px-8 py-3 bg-[#6e776e] border border-current">
              Voltar ao início
            </span>
          </Link>
        </button>
      </main>
    </>
  );
};

export default Error;
