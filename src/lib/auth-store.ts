export type AuthState = {
  isAuthenticated: boolean;
  adminPassword?: string;
};

const AUTH_KEY = "emberpage.auth.v1";
const DEFAULT_PASSWORD = "admin123"; // Default password - user should change this

export function getAuthState(): AuthState {
  if (typeof window === "undefined") return { isAuthenticated: false };

  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return { isAuthenticated: false };
    const parsed = JSON.parse(raw) as AuthState;
    return parsed;
  } catch {
    return { isAuthenticated: false };
  }
}

export function saveAuthState(state: AuthState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

export function setAdminPassword(currentPassword: string, newPassword: string): boolean {
  if (typeof window === "undefined") return false;

  const state = getAuthState();
  const storedPassword = state.adminPassword || DEFAULT_PASSWORD;

  // Verify current password
  if (currentPassword !== storedPassword) {
    return false;
  }

  // Set new password
  saveAuthState({
    isAuthenticated: true,
    adminPassword: newPassword,
  });

  return true;
}

export function verifyPassword(password: string): boolean {
  const state = getAuthState();
  const storedPassword = state.adminPassword || DEFAULT_PASSWORD;

  return password === storedPassword;
}

export function logout() {
  saveAuthState({ isAuthenticated: false });
}

export function login(password: string): boolean {
  if (verifyPassword(password)) {
    saveAuthState({ isAuthenticated: true, adminPassword: getAuthState().adminPassword });
    return true;
  }
  return false;
}

export function isSessionActive(): boolean {
  return getAuthState().isAuthenticated;
}

export function initializeAuth() {
  // Initialize auth state if it doesn't exist
  if (typeof window === "undefined") return;

  const state = getAuthState();
  if (!state.adminPassword) {
    saveAuthState({
      isAuthenticated: false,
      adminPassword: DEFAULT_PASSWORD,
    });
  }
}
