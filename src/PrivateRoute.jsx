import { useContext } from 'react';
import AuthContext from './context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>; // Or a better spinner component
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;