/**
 * Comprehensive Analytics & Visitor Session Tracker
 * Tracks:
 * - Visitor entry, country, city, date & exact timestamp
 * - Time spent on page (session duration / heartbeat)
 * - Video watch time (YouTube playback duration in seconds)
 * - Exact buttons clicked (sequence and count)
 * - IP Exclusion for owner/admin so test visits never pollute data
 */

export interface ClickAction {
  target: string;
  category: 'cookie' | 'package' | 'checkout' | 'cta' | 'video' | 'navigation' | 'other';
  timestamp: number;
  timeOffsetSeconds: number; // Seconds after landing when clicked
  formattedTime: string;
}

export interface VisitorSession {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  entryTimestamp: number;
  lastActiveTimestamp: number;
  durationSeconds: number; // Total time on page
  formattedDate: string; // Entry date/time
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  videoWatchTimeSeconds: number; // Time watched video in seconds
  videoPlayed: boolean;
  buttonsClicked: ClickAction[];
  isOnline: boolean;
  scrollDepth: number; // 0 to 100%
}

export interface ClickRecord {
  id: string;
  sessionId: string;
  target: string;
  category: 'cookie' | 'package' | 'checkout' | 'cta' | 'video' | 'navigation' | 'other';
  timestamp: number;
  formattedDate: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  ip: string;
  timeOnPageWhenClicked: number;
}

const STORAGE_SESSIONS_KEY = 'sodaslim_analytics_sessions_v2';
const STORAGE_CLICKS_KEY = 'sodaslim_analytics_clicks_v2';
const GEO_CACHE_KEY = 'sodaslim_visitor_geo';
const ADMIN_IPS_KEY = 'sodaslim_admin_excluded_ips';
const ADMIN_MODE_KEY = 'sodaslim_admin_is_excluded';

// In-memory cache for geolocation info
let cachedGeo: {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  ip: string;
} | null = null;

let currentSessionId: string | null = null;
let sessionStartTime: number = Date.now();
let heartbeatInterval: any = null;

// Helper: detect device type
const detectDevice = (): 'Desktop' | 'Mobile' | 'Tablet' => {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return 'Mobile';
  }
  return 'Desktop';
};

// Helper: detect browser name
const detectBrowser = (): string => {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  return 'Browser';
};

// --- Admin IP Exclusion Management ---

export const getExcludedIps = (): string[] => {
  try {
    const raw = localStorage.getItem(ADMIN_IPS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore
  }
  return [];
};

export const isAdminModeActive = (): boolean => {
  try {
    const isExcluded = localStorage.getItem(ADMIN_MODE_KEY);
    return isExcluded !== 'false'; // Default to true if user opened admin
  } catch {
    return true;
  }
};

export const setAdminModeActive = (active: boolean) => {
  try {
    localStorage.setItem(ADMIN_MODE_KEY, active ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('sodaslim_admin_status_changed'));
  } catch {
    // Ignore
  }
};

export const addExcludedIp = (ip: string) => {
  if (!ip || ip === '---' || ip === 'Unknown') return;
  try {
    const list = getExcludedIps();
    if (!list.includes(ip)) {
      list.push(ip);
      localStorage.setItem(ADMIN_IPS_KEY, JSON.stringify(list));
    }
    // Also purge existing records for this IP to clean data
    purgeRecordsByIp(ip);
    window.dispatchEvent(new CustomEvent('sodaslim_admin_status_changed'));
  } catch {
    // Ignore
  }
};

export const removeExcludedIp = (ip: string) => {
  try {
    const list = getExcludedIps().filter((item) => item !== ip);
    localStorage.setItem(ADMIN_IPS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('sodaslim_admin_status_changed'));
  } catch {
    // Ignore
  }
};

export const isIpExcluded = (ip: string): boolean => {
  // If admin mode toggle is disabled, allow tracking
  if (!isAdminModeActive()) return false;

  // If marked as admin device in localStorage
  if (localStorage.getItem('sodaslim_is_admin_device') === 'true') {
    return true;
  }

  // Check explicit IP list
  const list = getExcludedIps();
  if (list.includes(ip)) return true;

  return false;
};

// Mark current device as admin and auto-exclude current IP
export const registerCurrentAsAdmin = (ip?: string) => {
  try {
    localStorage.setItem('sodaslim_is_admin_device', 'true');
    const targetIp = ip || cachedGeo?.ip;
    if (targetIp && targetIp !== '---') {
      addExcludedIp(targetIp);
    }
  } catch {
    // Ignore
  }
};

// Purge any existing records created by a specific IP
export const purgeRecordsByIp = (ip: string) => {
  try {
    // Purge sessions
    const sessions = getVisitorSessions().filter((s) => s.ip !== ip);
    localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));

    // Purge clicks
    const clicks = getClickRecords().filter((c) => c.ip !== ip);
    localStorage.setItem(STORAGE_CLICKS_KEY, JSON.stringify(clicks));

    window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    window.dispatchEvent(new CustomEvent('sodaslim_new_click'));
  } catch {
    // Ignore
  }
};

// --- Geolocation Fetching ---

export const initGeoTracker = async () => {
  if (cachedGeo) return cachedGeo;

  try {
    const local = sessionStorage.getItem(GEO_CACHE_KEY);
    if (local) {
      cachedGeo = JSON.parse(local);
      return cachedGeo;
    }
  } catch {
    // Ignore
  }

  try {
    const res = await fetch('https://ipwho.is/', { cache: 'force-cache' });
    const data = await res.json();
    if (data && data.success !== false) {
      cachedGeo = {
        country: data.country || 'Unknown',
        countryCode: data.country_code || 'US',
        city: data.city || 'Unknown',
        region: data.region || '',
        ip: data.ip || '---',
      };
      try {
        sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cachedGeo));
      } catch {
        // Ignore
      }
      return cachedGeo;
    }
  } catch {
    // Fallback if network blocked
  }

  try {
    const res = await fetch('https://api.country.is/');
    const data = await res.json();
    if (data && data.country) {
      cachedGeo = {
        country: data.country,
        countryCode: data.country,
        city: 'Visitor Location',
        region: '',
        ip: data.ip || '---',
      };
      return cachedGeo;
    }
  } catch {
    // Fallback
  }

  cachedGeo = {
    country: 'United States',
    countryCode: 'US',
    city: 'New York',
    region: 'NY',
    ip: '---',
  };
  return cachedGeo;
};

// --- Visitor Sessions Storage & Management ---

export const getVisitorSessions = (): VisitorSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_SESSIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore
  }
  return [];
};

export const getClickRecords = (): ClickRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_CLICKS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore
  }
  return [];
};

// Start or resume session tracking for the current visitor
export const startVisitorSession = async () => {
  const geo = cachedGeo || (await initGeoTracker());

  // Check if this IP or device is excluded (Owner IP protection!)
  if (geo && isIpExcluded(geo.ip)) {
    console.info(`[Analytics] Admin IP ${geo.ip} detected. Tracking is disabled to keep data clean.`);
    return null;
  }

  const existingSessionId = sessionStorage.getItem('sodaslim_active_session_id');
  if (existingSessionId) {
    currentSessionId = existingSessionId;
  } else {
    currentSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem('sodaslim_active_session_id', currentSessionId);
    sessionStartTime = Date.now();

    const now = new Date();
    const formattedDate = now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newSession: VisitorSession = {
      id: currentSessionId,
      ip: geo?.ip || '---',
      country: geo?.country || 'United States',
      countryCode: geo?.countryCode || 'US',
      city: geo?.city || 'Unknown',
      region: geo?.region || '',
      entryTimestamp: sessionStartTime,
      lastActiveTimestamp: sessionStartTime,
      durationSeconds: 0,
      formattedDate,
      device: detectDevice(),
      browser: detectBrowser(),
      videoWatchTimeSeconds: 0,
      videoPlayed: false,
      buttonsClicked: [],
      isOnline: true,
      scrollDepth: 0,
    };

    try {
      const allSessions = getVisitorSessions();
      // Keep up to 500 recent sessions
      const updated = [newSession, ...allSessions].slice(0, 500);
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    } catch {
      // Ignore
    }
  }

  // Setup periodic heartbeat to update time on page
  if (!heartbeatInterval) {
    heartbeatInterval = setInterval(() => {
      updateSessionHeartbeat();
    }, 4000);
  }

  // Window unload listener to mark offline
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      markSessionOffline();
    });

    // Scroll depth tracking
    window.addEventListener('scroll', handleScrollTracking, { passive: true });
  }

  return currentSessionId;
};

// Update heartbeat: duration on page
export const updateSessionHeartbeat = () => {
  if (!currentSessionId) return;
  const geo = cachedGeo;
  if (geo && isIpExcluded(geo.ip)) return;

  const now = Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((now - sessionStartTime) / 1000));

  try {
    const sessions = getVisitorSessions();
    const index = sessions.findIndex((s) => s.id === currentSessionId);
    if (index !== -1) {
      sessions[index].durationSeconds = elapsedSeconds;
      sessions[index].lastActiveTimestamp = now;
      sessions[index].isOnline = true;
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    }
  } catch {
    // Ignore
  }
};

// Track scroll depth
const handleScrollTracking = () => {
  if (!currentSessionId) return;
  const geo = cachedGeo;
  if (geo && isIpExcluded(geo.ip)) return;

  try {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));

    const sessions = getVisitorSessions();
    const index = sessions.findIndex((s) => s.id === currentSessionId);
    if (index !== -1 && pct > (sessions[index].scrollDepth || 0)) {
      sessions[index].scrollDepth = pct;
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
    }
  } catch {
    // Ignore
  }
};

// Mark session offline when leaving
export const markSessionOffline = () => {
  if (!currentSessionId) return;
  try {
    const sessions = getVisitorSessions();
    const index = sessions.findIndex((s) => s.id === currentSessionId);
    if (index !== -1) {
      sessions[index].isOnline = false;
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    }
  } catch {
    // Ignore
  }
};

// --- Video Watch Time Tracking ---

export const recordVideoWatchTime = (secondsToAdd: number) => {
  if (!currentSessionId) return;
  const geo = cachedGeo;
  if (geo && isIpExcluded(geo.ip)) return;

  try {
    const sessions = getVisitorSessions();
    const index = sessions.findIndex((s) => s.id === currentSessionId);
    if (index !== -1) {
      sessions[index].videoPlayed = true;
      sessions[index].videoWatchTimeSeconds = (sessions[index].videoWatchTimeSeconds || 0) + secondsToAdd;
      sessions[index].lastActiveTimestamp = Date.now();
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    }
  } catch {
    // Ignore
  }
};

export const recordVideoStarted = () => {
  if (!currentSessionId) return;
  const geo = cachedGeo;
  if (geo && isIpExcluded(geo.ip)) return;

  try {
    const sessions = getVisitorSessions();
    const index = sessions.findIndex((s) => s.id === currentSessionId);
    if (index !== -1) {
      sessions[index].videoPlayed = true;
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    }
  } catch {
    // Ignore
  }
};

// --- Button Click Tracking ---

export const recordClick = async (
  target: string,
  category: ClickRecord['category'] = 'other'
): Promise<ClickRecord | null> => {
  const geo = cachedGeo || (await initGeoTracker());

  // Prevent admin clicks from polluting data!
  if (geo && isIpExcluded(geo.ip)) {
    console.info(`[Analytics] Ignored admin click on "${target}" from excluded IP ${geo.ip}`);
    return null;
  }

  const now = new Date();
  const timestamp = Date.now();
  const timeOffsetSeconds = Math.max(0, Math.floor((timestamp - sessionStartTime) / 1000));

  const formattedDate = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const clickAction: ClickAction = {
    target,
    category,
    timestamp,
    timeOffsetSeconds,
    formattedTime,
  };

  const record: ClickRecord = {
    id: `${timestamp}-${Math.random().toString(36).substring(2, 7)}`,
    sessionId: currentSessionId || 'unknown',
    target,
    category,
    timestamp,
    formattedDate,
    country: geo?.country || 'United States',
    countryCode: geo?.countryCode || 'US',
    city: geo?.city || 'New York',
    region: geo?.region || '',
    ip: geo?.ip || '---',
    timeOnPageWhenClicked: timeOffsetSeconds,
  };

  try {
    // Update Click Logs
    const currentClicks = getClickRecords();
    const updatedClicks = [record, ...currentClicks].slice(0, 1000);
    localStorage.setItem(STORAGE_CLICKS_KEY, JSON.stringify(updatedClicks));

    // Append to current Visitor Session
    if (currentSessionId) {
      const sessions = getVisitorSessions();
      const index = sessions.findIndex((s) => s.id === currentSessionId);
      if (index !== -1) {
        sessions[index].buttonsClicked = [...(sessions[index].buttonsClicked || []), clickAction];
        sessions[index].lastActiveTimestamp = timestamp;
        localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
      }
    }

    // Dispatch events
    window.dispatchEvent(new CustomEvent('sodaslim_new_click', { detail: record }));
    window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
  } catch {
    // Ignore
  }

  return record;
};

// Clear all analytics data
export const clearAllAnalytics = () => {
  try {
    localStorage.removeItem(STORAGE_SESSIONS_KEY);
    localStorage.removeItem(STORAGE_CLICKS_KEY);
    window.dispatchEvent(new CustomEvent('sodaslim_sessions_updated'));
    window.dispatchEvent(new CustomEvent('sodaslim_new_click'));
  } catch {
    // Ignore
  }
};
