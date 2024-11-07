import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen px-4 select-none min-[1450px]:flex items-center justify-center">
      <div className="max-w-[360px] w-full mx-auto flex flex-col gap-4 pt-12">
        <h2 className="text-3xl font-medium mt-8 text-center">
          The page your're looking for was not found.
        </h2>

        <Link to="/" className="text-center">
          Return to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
