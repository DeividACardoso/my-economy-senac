import { createContext, useContext, useEffect, useState } from "react";
import { signin, signout, signup } from "../services/auth/authService";
import api from "../services/api/api";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const APU_URL = "";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        api.defaults.headers.common["Authorization"] = `${token}`;

        setAuthState({
          token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      return signup({
        name,
        email,
        password,
        confirmPassword,
      });
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signin({ email, password });

      setAuthState({
        token: result.token,
        authenticated: true,
      });

      api.defaults.headers.common["Authorization"] = `${result.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.token);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    api.defaults.headers.common["Authorization"] = ``;

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
