import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [streamToken, setStreamToken] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");
      const storedStreamToken = await AsyncStorage.getItem("streamToken");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setToken(storedToken ? storedToken : null);
      setStreamToken(storedStreamToken ? storedStreamToken : null);
    };
    loadStoredData();
  }, [user, token, streamToken]);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("streamToken");
    setUser(null);
    setToken(null);
    setStreamToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        streamToken,
        setUser,
        setToken,
        setStreamToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
