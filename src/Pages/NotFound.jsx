import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
            <h2 className="text-3xl font-semibold mb-4">Oops! Page not found.</h2>
            <p className="text-slate-400 mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full transition shadow-lg">
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;