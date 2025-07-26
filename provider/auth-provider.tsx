import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_TOKEN_KEY = "fake_token_key";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(FAKE_TOKEN_KEY);
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log("🚀 auth-provider.tsx -> #24 -> error ~", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const signIn = async () => {
    await AsyncStorage.setItem(FAKE_TOKEN_KEY, "dummy_token");
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(FAKE_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
