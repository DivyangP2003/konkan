import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CloudRain, Info } from 'lucide-react';
import { isMonsoonSeason } from '@/lib/weather';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  icon: typeof AlertTriangle;
  color: string;
  bg: string;
  border: string;
  title: string;
  message: string;
  dismissible?: boolean;
}

function buildAlerts(): Alert[] {
  const alerts: Alert[] = [];
  const month = new Date().getMonth() + 1;

  if (isMonsoonSeason()) {
    const isHeavyMonsoon = month === 7 || month === 8; // July–August
    alerts.push({
      id: 'monsoon',
      type: isHeavyMonsoon ? 'warning' : 'info',
      icon: CloudRain,
      color: '#2a8fb5',
      bg: '#0a2030',
      border: '#2a8fb530',
      title: isHeavyMonsoon ? 'Peak Monsoon Season' : 'Monsoon Season Active',
      message: isHeavyMonsoon
        ? 'Heavy rainfall is likely across Konkan. Some beaches, trails & ferry services may be suspended. Verify transport before travel and carry rain gear.'
        : 'Monsoon is active across Konkan (June–September). Lush waterfalls and green landscapes await, but check local transport conditions. Coastal roads may be affected.',
      dismissible: true,
    });
  }

  // Turtle nesting season advisory (Feb–April)
  if (month >= 2 && month <= 4) {
    alerts.push({
      id: 'turtles',
      type: 'info',
      icon: Info,
      color: '#3a9e6e',
      bg: '#0a2018',
      border: '#3a9e6e30',
      title: 'Olive Ridley Turtle Nesting Season',
      message: 'Velas Beach turtle festival is on. Book turtle walk experiences early — limited spots available.',
      dismissible: true,
    });
  }

  // Mango season (Apr–Jun)
  if (month >= 4 && month <= 6) {
    alerts.push({
      id: 'mango',
      type: 'info',
      icon: Info,
      color: '#c17f3a',
      bg: '#201408',
      border: '#c17f3a30',
      title: 'Alphonso Mango Season',
      message: 'Premium Hapus mangoes are in season across Ratnagiri & Devgad. Visit orchards directly for the freshest fruit.',
      dismissible: true,
    });
  }

  return alerts;
}

export function AlertBanner() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    setAlerts(buildAlerts());
  }, []);

  const visibleAlerts = alerts.filter((a) => !dismissed.has(a.id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="w-full z-40">
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: alert.bg, borderBottom: `1px solid ${alert.border}` }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-3 flex items-start gap-3">
              <alert.icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: alert.color }} />
              <div className="flex-1 min-w-0">
                <span
                  className="text-[8px] tracking-[0.22em] uppercase font-sans mr-3"
                  style={{ color: alert.color }}
                >
                  {alert.title}
                </span>
                <span className="text-[10px] font-sans text-[#f4ecd8]/60 leading-relaxed">
                  {alert.message}
                </span>
              </div>
              {alert.dismissible && (
                <button
                  onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
                  className="p-1 text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
