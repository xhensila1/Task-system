
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectToken } from 'features/auth/authSelectors';

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);
    const isAuthenticated = !!token;  

    return {
      user,
      isAuthenticated,
      token
    };
};
