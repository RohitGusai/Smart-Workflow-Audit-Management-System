import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-slate-400 mb-8 max-w-md">
                You do not have the required permissions to view this page. 
                Please contact your administrator if you believe this is an error.
            </p>
            <Link 
                to="/dashboard" 
                className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition font-medium"
            >
                Back to Dashboard
            </Link>
        </div>
    );
};

export default Unauthorized;