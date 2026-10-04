export interface ClickRecord {
  id: string;
  target: string;
  category: 'cookie' | 'package' | 'checkout' | 'cta' | 'other';
  timestamp: number;
  formattedDate: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  ip: string;
}

const STORAGE_KEY = 'sodaslim_analytics_clicks_v1';
const GEO_CACHE_KEY = 'sodaslim_visitor_geo';

// In-memory cache for geolocation info
let cachedGeo: {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  ip: string;
} | null = null;

// Initialize location fetching early
export const initGeoTracker = async () => {
  if (cachedGeo) return cachedGeo;

  try {
    const local = sessionStorage.getItem(GEO_CACHE_KEY);
    if (local) {
      cachedGeo = JSON.parse(local);
      return cachedGeo;
    }
  } catch {
    // Ignore storage error
  }

  try {
    // Fast, CORS-enabled HTTPS IP Geolocation API
    const res = await fetch('https://ipwho.is/', { cache: 'force-cache' });
    const data = await res.json();
    if (data && data.success !== false) {
      cachedGeo = {
        country: data.country || 'Desconhecido',
        countryCode: data.country_code || 'BR',
        city: data.city || 'Desconhecida',
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

  // Secondary fallback
  try {
    const res = await fetch('https://api.country.is/');
    const data = await res.json();
    if (data && data.country) {
      cachedGeo = {
        country: data.country === 'BR' ? 'Brasil' : data.country,
        countryCode: data.country,
        city: 'Região do Usuário',
        region: '',
        ip: data.ip || '---',
      };
      return cachedGeo;
    }
  } catch {
    // Fallback defaults
  }

  cachedGeo = {
    country: 'Brasil',
    countryCode: 'BR',
    city: 'São Paulo',
    region: 'SP',
    ip: '---',
  };
  return cachedGeo;
};

// Retrieve all stored clicks
export const getClickRecords = (): ClickRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore
  }
  return [];
};

// Log a click with location details
export const recordClick = async (
  target: string,
  category: ClickRecord['category'] = 'other'
): Promise<ClickRecord> => {
  const geo = cachedGeo || (await initGeoTracker());

  const now = new Date();
  const formattedDate = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const record: ClickRecord = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    target,
    category,
    timestamp: Date.now(),
    formattedDate,
    country: geo?.country || 'Brasil',
    countryCode: geo?.countryCode || 'BR',
    city: geo?.city || 'São Paulo',
    region: geo?.region || '',
    ip: geo?.ip || '---',
  };

  try {
    const current = getClickRecords();
    const updated = [record, ...current].slice(0, 1000); // keep up to 1000 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for real-time dashboard updates
    window.dispatchEvent(new CustomEvent('sodaslim_new_click', { detail: record }));
  } catch {
    // Ignore
  }

  return record;
};

// Clear all analytics data
export const clearClickRecords = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('sodaslim_clicks_cleared'));
  } catch {
    // Ignore
  }
};
