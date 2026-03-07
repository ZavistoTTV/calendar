export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const FETCH_TIMEOUT_MS = 20000;

function fetchWithTimeout(url, options = {}, timeout = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiRegister(formData) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out. Is the backend running?');
    if (err.message === 'Failed to fetch' || err.message?.includes('NetworkError')) {
      throw new Error('Cannot reach server. Start the backend (see backend/README.md) and ensure the database is running.');
    }
    throw err;
  }
}

export async function apiLogin(email, password) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out. Is the backend running?');
    if (err.message === 'Failed to fetch' || err.message?.includes('NetworkError')) {
      throw new Error('Cannot reach server. Start the backend (see backend/README.md) and ensure the database is running.');
    }
    throw err;
  }
}

export async function apiHealth() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/health`, {}, 4000);
    return res.ok;
  } catch {
    return false;
  }
}

export async function apiMe() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/me`, {
      headers: getAuthHeaders(),
    }, 5000);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
