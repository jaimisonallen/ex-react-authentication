import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import { User } from '../../types/User';
import { useAuthApi } from '../../hooks/useAuthApi';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useAuthApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        const data = await api.validateToken(storageData);
        const userId = data?.decodedToken?.userId;
        if (userId) {
          setUser(data?.decodedToken?.userId);
        }
      }
    };
    validateToken();
  }, [api]);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.userId && data.token) {
      setUser(data.userId);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const signout = async () => {
    await api.signout();
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
