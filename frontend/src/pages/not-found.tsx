import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <p className="text-2xl md:text-3xl font-light mt-8">
          Sorry, the page you're looking for cannot be found.
        </p>
        <p className="mt-4 mb-8">
          But don't worry, you can always go back home to check your accounts
        </p>
        <Link
          to="/home"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};
