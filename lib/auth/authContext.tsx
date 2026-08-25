"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockUsers } from "@/data/mockdata/users";
import { mockCredentials } from "@/data/mockdata/credentials";

export type AuthRole = "creditor" | "debtor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: AuthRole;
};

export type AuthStatus = "idle" | "authenticated" | "unauthenticated";

type LoginResult = { ok: true } | { ok: false; error: string };

type RegisterInput = {
  name: string;
  lastName: string;
  email: string;
  role: "creditor" | "debtor";
};

type RegisterResult = { ok: true; user: AuthUser } | { ok: false; error: string };

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (input: RegisterInput) => Promise<RegisterResult>;
  logout: () => void;
};

export const AUTH_STORAGE_KEY = "auth-session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser): void {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredUser(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Starts "idle", never eagerly read from localStorage in useState: the
  // prerendered static-export HTML has no localStorage, so an eager read
  // would desync from the server-rendered markup and produce a hydration
  // mismatch. Real status only resolves after mount, inside this effect.
  const [status, setStatus] = useState<AuthStatus>("idle");

  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const normalizedEmail = email.trim().toLowerCase();
    const credential = mockCredentials.find(
      (entry) => entry.email.toLowerCase() === normalizedEmail && entry.password === password
    );

    if (!credential) {
      return { ok: false, error: "Correo electronico o contrasena incorrectos" };
    }

    const matchedUser = mockUsers.result.find((candidate) => candidate.id === credential.userId);

    if (!matchedUser) {
      return { ok: false, error: "No se encontro un usuario asociado a estas credenciales" };
    }

    const authUser: AuthUser = {
      id: matchedUser.id,
      email: matchedUser.email,
      name: `${matchedUser.name} ${matchedUser.lastName}`,
      role: matchedUser.userType as "creditor" | "debtor",
    };

    setUser(authUser);
    setStatus("authenticated");
    persistUser(authUser);

    return { ok: true };
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<RegisterResult> => {
    if (!input.name.trim() || !input.lastName.trim() || !input.email.trim()) {
      return { ok: false, error: "Todos los campos son requeridos" };
    }

    // In-memory + localStorage only: there is no backend to persist to, so
    // registered users are never written back to data/mockdata/users.ts.
    const authUser: AuthUser = {
      id: crypto.randomUUID(),
      email: input.email,
      name: `${input.name} ${input.lastName}`,
      role: input.role,
    };

    setUser(authUser);
    setStatus("authenticated");
    persistUser(authUser);

    return { ok: true, user: authUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
    clearStoredUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, login, register, logout }),
    [user, status, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
