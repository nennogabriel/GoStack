import { createContext } from 'react';

interface AuthContextData {
  name: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
