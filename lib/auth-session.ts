"use client";

export type UserRole = "admin" | "user";

export type AuthSession = {
  user: {
    name: string;
    email?: string;
    role: UserRole;
  };
};

const STORAGE_KEY = "broadway_auth_session";
export const AUTH_COOKIE = "bs_auth";
export const ROLE_COOKIE = "bs_role";

const getRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : null;

const firstString = (...values: unknown[]) =>
  values.find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );

const normalizeRole = (value: unknown): UserRole =>
  typeof value === "string" && value.toLowerCase() === "admin"
    ? "admin"
    : "user";

const findUserRecord = (response: unknown): Record<string, unknown> => {
  const root = getRecord(response);
  const data = getRecord(root?.data);
  const nestedData = getRecord(data?.data);

  return (
    getRecord(root?.user) ??
    getRecord(data?.user) ??
    getRecord(nestedData?.user) ??
    nestedData ??
    data ??
    root ??
    {}
  );
};

const setCookie = (name: string, value: string, maxAge: number) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const getCookie = (name: string) => {
  const prefix = `${name}=`;
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(prefix))
    ?.slice(prefix.length);
};

export const persistAuthSession = (response: unknown) => {
  const userRecord = findUserRecord(response);
  const role = normalizeRole(userRecord.role);
  const name =
    firstString(userRecord.full_name, userRecord.name, userRecord.email) ??
    (role === "admin" ? "Admin" : "User");
  const email = firstString(userRecord.email);
  const session: AuthSession = { user: { name, email, role } };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  setCookie(AUTH_COOKIE, "1", 60 * 60 * 24 * 7);
  setCookie(ROLE_COOKIE, role, 60 * 60 * 24 * 7);

  window.dispatchEvent(new Event("auth-session-change"));
  return session;
};

export const getStoredAuthSession = (): AuthSession | null => {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const parsed = JSON.parse(stored) as AuthSession;
      if (parsed.user?.role) {
        return parsed;
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const role = getCookie(ROLE_COOKIE);
  if (!role) {
    return null;
  }

  return {
    user: {
      name:
        normalizeRole(decodeURIComponent(role)) === "admin" ? "Admin" : "User",
      role: normalizeRole(decodeURIComponent(role)),
    },
  };
};

export const clearAuthSession = () => {
  window.localStorage.removeItem(STORAGE_KEY);
  setCookie(AUTH_COOKIE, "", 0);
  setCookie(ROLE_COOKIE, "", 0);
  window.dispatchEvent(new Event("auth-session-change"));
};
