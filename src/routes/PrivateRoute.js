import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({ children }) => {
    const { isLogged } = useAuth();
    const location = useLocation();

    return isLogged ? (
        children
    ) : (
        <Navigate to={{ pathname: '/', state: { from: location } }} />
    );
};

export default PrivateRoute;
