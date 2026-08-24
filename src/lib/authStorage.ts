const AUTH_STORAGE_KEY = "nordic-living-auth";

export function getCurrentUserEmail(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.userEmail ?? null;
  } catch {
    return null;
  }
}

export default getCurrentUserEmail;
