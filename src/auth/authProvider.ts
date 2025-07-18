// src/auth/authProvider.ts
import { AuthProvider } from "react-admin";
import { jwtDecode } from "jwt-decode";
import { http } from "../api/http";

type JwtPayload = { sub: string; roles: string[]; exp: number };

const ALLOWED_ROLES = new Set([
  "CHARGEE_OP",
  "GESTIONNAIRE_PORTFEUIL",
  "CHEF_AGENCE",
  "DIRECTEUR_REGION",
  "COORDINATEUR_OPERATION",
  "ADMIN",
]);

const STORAGE_KEY = "access_token";

/* helper: strip optional "ROLE_" prefix */
const cleanRole = (r: string | undefined) =>
  r?.startsWith("ROLE_") ? r.slice(5) : r ?? "";

/* helper: decode + validate */
function getValidToken():
  | { token: string; payload: JwtPayload }
  | null {
  const token = localStorage.getItem(STORAGE_KEY);
  if (!token) return null;

  try {
    const payload: JwtPayload = jwtDecode(token);
    if (payload.exp * 1000 < Date.now()) return null;
    return { token, payload };
  } catch {
    return null;
  }
}

export const authProvider: AuthProvider = {
  /* ---------- login ------------------------------------------------ */
  async login({ username, password }) {
    const { data } = await http.post("/auth/login", {
      email: username,
      password,
    }); // data = { token, email, role }
    console.log("🚀 ~ login ~ data:", data)

    if (!ALLOWED_ROLES.has(cleanRole(data.role)))
      return Promise.reject(new Error("RBAC: forbidden role"));

    localStorage.setItem(STORAGE_KEY, data.token);
    localStorage.setItem("ra_auth_role", cleanRole(data.role));
    return Promise.resolve();
  },


  /* ---------- login ------------------------------------------------ */
  async signup({ username, password }) {
    const { data } = await http.post("/auth/login", {
      email: username,
      password,
    }); // data = { token, email, role }
    
  },


  /* ---------- logout ----------------------------------------------- */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("ra_auth_role");
    return Promise.resolve();
  },

  /* ---------- checkAuth (every refresh) ---------------------------- */
  checkAuth() {
    const info = getValidToken();
    if (info && info.payload.roles.some(r => ALLOWED_ROLES.has(cleanRole(r))))
      return Promise.resolve();
    return Promise.reject();
  },

  /* ---------- expose role to UI ------------------------------------ */
  getPermissions() {
    return Promise.resolve(localStorage.getItem("ra_auth_role"));
  },

  getIdentity() {
    const info = getValidToken();
    if (!info) return Promise.reject();
    return Promise.resolve({
      id: info.payload.sub,
      fullName: info.payload.sub,
      role: cleanRole(info.payload.roles[0]),
    });
  },

  checkError: () => Promise.resolve(),
};
