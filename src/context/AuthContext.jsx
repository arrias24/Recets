import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("[ERROR] - useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("[ERROR] - No se pudo cargar el usuario:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkStoredUser();
  }, []);

  const getRegisteredUsers = () => {
    try {
      const users = localStorage.getItem("registeredUsers");
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("[ERROR] - No se pudieron cargar los usuarios:", error);
      return [];
    }
  };

  const saveRegisteredUsers = (users) => {
    try {
      localStorage.setItem("registeredUsers", JSON.stringify(users));
    } catch (error) {
      console.error("[ERROR] - No se pudieron guardar los usuarios:", error);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const existingUsers = getRegisteredUsers();

      const userExists = existingUsers.find(
        (user) => user.email === userData.email
      );
      if (userExists) {
        return {
          success: false,
          error: "Este Email ya está registrado",
        };
      }

      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, newUser];

      saveRegisteredUsers(updatedUsers);

      const token = `auth-token-${Date.now()}`;

      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("token", token);

      setUser(userWithoutPassword);

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error("[ERROR] Error en registro:", error);
      return {
        success: false,
        error: "[ERROR] - No se pudo registrar el usuario.",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const registeredUsers = getRegisteredUsers();

      const foundUser = registeredUsers.find((user) => {
        return user.email === email && user.password === password;
      });

      if (foundUser) {
        const token = `auth-token-${Date.now()}`;

        const { password: _, ...userWithoutPassword } = foundUser;

        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        localStorage.setItem("token", token);

        setUser(userWithoutPassword);

        return { success: true, user: userWithoutPassword };
      } else {
        return {
          success: false,
          error: "Email o contraseña incorrectos.",
        };
      }
    } catch (error) {
      console.error("[ERROR] - Error en login:", error);
      return {
        success: false,
        error: "[ERROR] - No se pudo iniciar sesión.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("[ERROR] Error al cerrar sesión:", error);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("token");
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
