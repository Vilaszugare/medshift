import { Capacitor } from '@capacitor/core';

/**
 * MedShift Centralized Configuration
 * Dynamically switches zwischen Development (localhost) and Production (DuckDNS)
 */

const IS_PROD = import.meta.env.PROD;

// Default endpoints from user request
const PROD_API = "http://quickmedsupport.duckdns.org";
const DEV_API  = "http://localhost:8000";

// Priority: 1. Env Var, 2. Mode-based default
let rawApiUrl = import.meta.env.VITE_API_URL || (IS_PROD ? PROD_API : DEV_API);

// Normalize: remove trailing slash
if (rawApiUrl.endsWith('/')) rawApiUrl = rawApiUrl.slice(0, -1);

// Capacitor Android Emulator support: rewrite localhost to 10.0.2.2
if (Capacitor.isNativePlatform() && rawApiUrl.includes("localhost")) {
  rawApiUrl = rawApiUrl.replace("localhost", "10.0.2.2");
}

export const API_BASE = rawApiUrl;

// Derived WebSocket Logic
const wsProtocol = API_BASE.startsWith('https') ? 'wss:' : 'ws:';
const host = API_BASE.replace(/^https?:\/\//, '');
export const WS_BASE = `${wsProtocol}//${host}`;

/**
 * Helper to build WebSocket URLs for specific paths
 * @param {string} path - e.g. "/ws/notifications/user-id"
 */
export const getWsUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${WS_BASE}${cleanPath}`;
};

export default {
  API_BASE,
  WS_BASE,
  getWsUrl
};
