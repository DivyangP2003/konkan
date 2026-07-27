import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, Thermometer, AlertTriangle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import {
  fetchWeather,
  getWeatherMeta,
  getMonsoonAlert,
  isMonsoonSeason,
  type WeatherData,
  type DailyForecast,
} from '@/lib/weather';
import { cn } from '@/lib/utils';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDay(dateStr: string, i: number) {
  if (i === 0) return 'Today';
  if (i === 1) return 'Tomorrow';
  return DAY_NAMES[new Date(dateStr).getDay()];
}

interface WeatherWidgetProps {
  lat: number;
  lng: number;
  locationName: string;
  compact?: boolean;
  className?: string;
  accentColor?: string;
}

export function WeatherWidget({
  lat,
  lng,
  locationName,
  compact = false,
  className,
  accentColor = '#3a9e6e',
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function load() {
    setLoading(true);
    setError(false);
    const data = await fetchWeather(lat, lng);
    if (data) {
      setWeather(data);
      setLastUpdated(new Date());
    } else {
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // Refresh every 30 minutes
    const interval = setInterval(load, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lat, lng]);

  const monsoonAlert = getMonsoonAlert(weather);
  const meta = weather ? getWeatherMeta(weather.current.weatherCode) : null;

  if (loading) {
    return (
      <div className={cn('bg-[#0d2d1e]/60 border border-[#0d2d1e] p-4 flex items-center gap-3', className)}>
        <RefreshCw className="w-4 h-4 text-[#f4ecd8]/30 animate-spin" />
        <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/30">
          Loading weather…
        </span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={cn('bg-[#0d2d1e]/60 border border-[#0d2d1e] p-4 flex items-center gap-3', className)}>
        <AlertTriangle className="w-4 h-4 text-[#f4ecd8]/30" />
        <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/30">
          Weather unavailable
        </span>
      </div>
    );
  }

  const { current, daily } = weather;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('bg-[#0d2d1e]/60 border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-300', className)}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between gap-4 p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{meta?.emoji}</span>
            <div>
              <p className="text-[9px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/40 mb-0.5">
                {locationName}
              </p>
              <p className="font-sans text-lg font-semibold text-[#f4ecd8]">
                {current.temperature}°C
                <span className="text-[10px] font-normal text-[#f4ecd8]/50 ml-2">{meta?.label}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isMonsoonSeason() && (
              <span
                className="text-[8px] tracking-[0.2em] uppercase font-sans px-2 py-1"
                style={{ color: '#2a8fb5', backgroundColor: '#2a8fb510', border: '1px solid #2a8fb530' }}
              >
                Monsoon
              </span>
            )}
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#f4ecd8]/40" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#f4ecd8]/40" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Current stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#0d2d1e]">
                  <div className="flex flex-col items-center gap-1">
                    <Droplets className="w-3 h-3" style={{ color: accentColor }} />
                    <span className="text-xs font-sans text-[#f4ecd8]/70">{current.humidity}%</span>
                    <span className="text-[8px] font-sans text-[#f4ecd8]/40 uppercase tracking-widest">Humidity</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Wind className="w-3 h-3" style={{ color: accentColor }} />
                    <span className="text-xs font-sans text-[#f4ecd8]/70">{current.windSpeed} km/h</span>
                    <span className="text-[8px] font-sans text-[#f4ecd8]/40 uppercase tracking-widest">Wind</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Droplets className="w-3 h-3 opacity-60" style={{ color: '#2a8fb5' }} />
                    <span className="text-xs font-sans text-[#f4ecd8]/70">{current.precipitation} mm</span>
                    <span className="text-[8px] font-sans text-[#f4ecd8]/40 uppercase tracking-widest">Rain</span>
                  </div>
                </div>

                {/* 5-day forecast */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {daily.slice(0, 5).map((day: DailyForecast, i: number) => (
                    <div
                      key={day.date}
                      className="flex flex-col items-center gap-1 min-w-[48px] bg-[#020d08]/40 p-2"
                    >
                      <span className="text-[8px] font-sans text-[#f4ecd8]/40 uppercase tracking-widest">
                        {formatDay(day.date, i)}
                      </span>
                      <span className="text-base">{getWeatherMeta(day.weatherCode).emoji}</span>
                      <span className="text-[10px] font-sans text-[#f4ecd8]/70">{day.tempMax}°</span>
                      <span className="text-[9px] font-sans text-[#f4ecd8]/30">{day.tempMin}°</span>
                      {day.precipitationProbability > 40 && (
                        <span className="text-[8px] font-sans text-[#2a8fb5]">
                          {day.precipitationProbability}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Monsoon alert */}
                {monsoonAlert && (
                  <div className="flex items-start gap-2 bg-[#2a8fb510] border border-[#2a8fb530] p-3">
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-[#2a8fb5]" />
                    <p className="text-[9px] font-sans text-[#f4ecd8]/60 leading-relaxed">{monsoonAlert}</p>
                  </div>
                )}

                {lastUpdated && (
                  <p className="text-[8px] font-sans text-[#f4ecd8]/20 text-right">
                    Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Full widget
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-[#0d2d1e]/60 border border-[#0d2d1e]', className)}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#0d2d1e]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40 mb-1">
              Live Weather · {locationName}
            </p>
            <div className="flex items-end gap-3">
              <span className="text-5xl">{meta?.emoji}</span>
              <div>
                <p className="font-serif text-5xl text-[#f4ecd8] leading-none">{current.temperature}°C</p>
                <p className="font-sans text-sm text-[#f4ecd8]/50 mt-1">{meta?.label}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {isMonsoonSeason() && (
              <span
                className="text-[8px] tracking-[0.2em] uppercase font-sans px-2.5 py-1"
                style={{ color: '#2a8fb5', border: '1px solid #2a8fb540', backgroundColor: '#2a8fb510' }}
              >
                Monsoon Active
              </span>
            )}
            <button
              onClick={load}
              className="p-1.5 text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors"
              title="Refresh weather"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Current stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Humidity', value: `${current.humidity}%`, icon: Droplets, color: accentColor },
            { label: 'Wind', value: `${current.windSpeed} km/h`, icon: Wind, color: accentColor },
            { label: 'Rainfall', value: `${current.precipitation} mm`, icon: Thermometer, color: '#2a8fb5' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
              <div>
                <p className="text-[9px] font-sans text-[#f4ecd8]/40 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-sans text-[#f4ecd8]/80">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="p-4">
        <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">7-Day Forecast</p>
        <div className="grid grid-cols-7 gap-1">
          {daily.map((day: DailyForecast, i: number) => (
            <div key={day.date} className="flex flex-col items-center gap-1.5 p-2 bg-[#020d08]/30">
              <span className="text-[8px] font-sans text-[#f4ecd8]/40 uppercase">{formatDay(day.date, i)}</span>
              <span className="text-lg">{getWeatherMeta(day.weatherCode).emoji}</span>
              <span className="text-[10px] font-sans text-[#f4ecd8]/70 font-medium">{day.tempMax}°</span>
              <span className="text-[9px] font-sans text-[#f4ecd8]/30">{day.tempMin}°</span>
              {day.precipitationProbability > 30 && (
                <div className="flex items-center gap-0.5">
                  <Droplets className="w-2 h-2 text-[#2a8fb5]" />
                  <span className="text-[7px] font-sans text-[#2a8fb5]">{day.precipitationProbability}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Monsoon alert */}
      {monsoonAlert && (
        <div className="mx-4 mb-4 flex items-start gap-2.5 bg-[#2a8fb510] border border-[#2a8fb530] p-3.5">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#2a8fb5]" />
          <div>
            <p className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#2a8fb5] mb-0.5">Seasonal Advisory</p>
            <p className="text-[10px] font-sans text-[#f4ecd8]/60 leading-relaxed">{monsoonAlert}</p>
          </div>
        </div>
      )}

      {lastUpdated && (
        <div className="px-4 pb-3">
          <p className="text-[8px] font-sans text-[#f4ecd8]/20 text-right">
            Live data via Open-Meteo · Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </motion.div>
  );
}
