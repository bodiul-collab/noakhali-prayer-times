import React, { useEffect, useState, useId } from 'react';
import { Compass, Navigation2, Info, CheckCircle2, Globe2, Smartphone, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { getCompassDirection, getKaabaDistance, getQiblaExplanation, KAABA_COORDINATES } from '../utils/prayer';

interface QiblaCompassProps {
  qiblaDegrees: number;
  cityName: string;
  latitude?: number;
  longitude?: number;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({
  qiblaDegrees,
  cityName,
  latitude = 40.7128,
  longitude = -74.006,
}) => {
  const [mode, setMode] = useState<'static' | 'live'>('static');
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [sensorStatus, setSensorStatus] = useState<'idle' | 'active' | 'denied' | 'unsupported'>('idle');
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const filterId = useId();

  const cardinal = getCompassDirection(qiblaDegrees);
  const distance = getKaabaDistance(latitude, longitude);
  const explanation = getQiblaExplanation(latitude, longitude, qiblaDegrees);

  // Stop orientation listeners when in static mode
  useEffect(() => {
    if (mode !== 'live' || typeof window === 'undefined') return;

    let mounted = true;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!mounted) return;

      let heading: number | null = null;
      // iOS Safari provides webkitCompassHeading (0 = Magnetic North, clockwise)
      if ('webkitCompassHeading' in e && typeof (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading === 'number') {
        heading = (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading;
      } else if (e.alpha !== null && !isNaN(e.alpha)) {
        // Android / standard: alpha is 0..360 counter-clockwise
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        setDeviceHeading(Math.round(heading));
        setSensorStatus('active');
      }
    };

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setSensorStatus('unsupported');
    }

    return () => {
      mounted = false;
      if ('DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [mode]);

  // Request permission for iOS 13+ devices
  const enableLiveCompass = async () => {
    if (typeof window === 'undefined') return;

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (response === 'granted') {
          setMode('live');
          setSensorStatus('active');
        } else {
          setSensorStatus('denied');
        }
      } catch (err) {
        console.warn('Compass permission error:', err);
        setSensorStatus('denied');
      }
    } else if ('DeviceOrientationEvent' in window) {
      setMode('live');
    } else {
      setSensorStatus('unsupported');
    }
  };

  const disableLiveCompass = () => {
    setMode('static');
    setDeviceHeading(null);
  };

  // In Static mode:
  // Dial is fixed with North (0°) at the top. The needle points directly to qiblaDegrees.
  // In Live mode:
  // Needle points relative to the device's physical heading: (qiblaDegrees - deviceHeading).
  // When the user rotates their body until the needle points straight up, they are facing the Kaaba!
  const needleAngle = mode === 'live' && deviceHeading !== null
    ? ((qiblaDegrees - deviceHeading + 360) % 360)
    : qiblaDegrees;

  // Check if user is aligned within 5 degrees in live mode
  const isAlignedInLiveMode = mode === 'live' && deviceHeading !== null && Math.abs(needleAngle) <= 6;

  // Compass dial markers (every 30 degrees)
  const dialMarkers = [
    { deg: 0, label: 'N', isCardinal: true, isNorth: true },
    { deg: 30, label: '30' },
    { deg: 60, label: '60' },
    { deg: 90, label: 'E', isCardinal: true },
    { deg: 120, label: '120' },
    { deg: 150, label: '150' },
    { deg: 180, label: 'S', isCardinal: true },
    { deg: 210, label: '210' },
    { deg: 240, label: '240' },
    { deg: 270, label: 'W', isCardinal: true },
    { deg: 300, label: '300' },
    { deg: 330, label: '330' },
  ];

  return (
    <div id="qibla-section" className="scroll-mt-28 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-xs p-4 sm:p-5 md:p-6 transition-colors overflow-hidden">
      {/* Header with Title and Bearing Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-stone-800">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Qibla Direction</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-stone-700">·</span>
            <span className="font-bangla text-sm font-medium text-slate-500 dark:text-stone-400">
              কিবলার সঠিক দিক
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
            Bearing towards the Holy Kaaba in Makkah from <span className="font-medium text-slate-700 dark:text-stone-300">{cityName.split('(')[0].trim()}</span>
          </p>
        </div>

        {/* Degree & Cardinal Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
                {qiblaDegrees}°
              </span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                {cardinal.en}
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-stone-400">
              {cardinal.bn} ({Math.round(distance.miles).toLocaleString()} mi)
            </div>
          </div>
        </div>
      </div>

      {/* Main Compass Workspace */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-6 py-2">
        {/* Visual Compass Rose & Dial */}
        <div className="relative flex flex-col items-center">
          {/* Compass Container */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center select-none max-w-full">
            {/* SVG Compass Dial */}
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full drop-shadow-md overflow-visible"
              aria-hidden="true"
            >
              {/* Outer Outer Bezel */}
              <circle
                cx="120"
                cy="120"
                r="114"
                className="fill-slate-50 dark:fill-stone-950 stroke-slate-200 dark:stroke-stone-800"
                strokeWidth="3"
              />

              {/* Inner Dial Face */}
              <circle
                cx="120"
                cy="120"
                r="104"
                className="fill-white dark:fill-stone-900/90 stroke-slate-200 dark:stroke-stone-800"
                strokeWidth="1.5"
              />

              {/* Concentric Decorative Rings */}
              <circle
                cx="120"
                cy="120"
                r="82"
                className="fill-none stroke-slate-100 dark:stroke-stone-800/80"
                strokeWidth="1"
                strokeDasharray="2,3"
              />
              <circle
                cx="120"
                cy="120"
                r="56"
                className="fill-none stroke-slate-100 dark:stroke-stone-800/60"
                strokeWidth="0.75"
              />

              {/* Degree Ticks every 15 degrees */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = i * 15;
                const isMajor = angle % 30 === 0;
                const isCardinal = angle % 90 === 0;
                const tickLength = isCardinal ? 9 : isMajor ? 6 : 4;
                const rOuter = 104;
                const rInner = rOuter - tickLength;
                const rad = ((angle - 90) * Math.PI) / 180;
                const x1 = 120 + rOuter * Math.cos(rad);
                const y1 = 120 + rOuter * Math.sin(rad);
                const x2 = 120 + rInner * Math.cos(rad);
                const y2 = 120 + rInner * Math.sin(rad);

                return (
                  <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={
                      angle === 0
                        ? 'stroke-rose-600 dark:stroke-rose-500 stroke-[2.5]'
                        : isCardinal
                        ? 'stroke-slate-500 dark:stroke-stone-400 stroke-2'
                        : isMajor
                        ? 'stroke-slate-400 dark:stroke-stone-600 stroke-[1.5]'
                        : 'stroke-slate-300 dark:stroke-stone-700 stroke-1'
                    }
                  />
                );
              })}

              {/* Dial Labels (N, E, S, W and numbers) */}
              {dialMarkers.map(({ deg, label, isCardinal, isNorth }) => {
                const rText = 89;
                const rad = ((deg - 90) * Math.PI) / 180;
                const x = 120 + rText * Math.cos(rad);
                const y = 120 + rText * Math.sin(rad);

                return (
                  <text
                    key={deg}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`text-[9px] select-none font-bold ${
                      isNorth
                        ? 'fill-rose-600 dark:fill-rose-400 text-[12px] font-black'
                        : isCardinal
                        ? 'fill-slate-800 dark:fill-stone-200 text-[11px]'
                        : 'fill-slate-400 dark:fill-stone-500 text-[8px] font-medium'
                    }`}
                  >
                    {label}
                  </text>
                );
              })}

              {/* Exact Qibla Target Arc / Pip on Rim */}
              {(() => {
                const targetRad = ((qiblaDegrees - 90) * Math.PI) / 180;
                const pipX = 120 + 104 * Math.cos(targetRad);
                const pipY = 120 + 104 * Math.sin(targetRad);
                return (
                  <g>
                    <circle
                      cx={pipX}
                      cy={pipY}
                      r="4"
                      className="fill-amber-400 stroke-emerald-800 stroke-[1.5] shadow-sm animate-pulse"
                    />
                  </g>
                );
              })()}
            </svg>

            {/* PRECISION DUAL-ARROW NEEDLE (Rotates around center) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              {/* Outer Pointer Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 1. Forward Kaaba Pointer (Points outward toward the calculated Qibla bearing) */}
                <div className="absolute top-4 flex flex-col items-center">
                  {/* Kaaba Badge with Elevation Shadow */}
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-800 text-amber-300 border border-amber-400/90 shadow-md text-[10px] font-black -mb-1 z-20">
                    <span role="img" aria-label="Kaaba">🕋</span>
                    <span className="text-[9px] text-white tabular-nums font-bold">{qiblaDegrees}°</span>
                  </div>

                  {/* Sharp Emerald Needle Tip */}
                  <svg width="24" height="64" viewBox="0 0 24 64" className="filter drop-shadow-sm">
                    <defs>
                      <linearGradient id={`emeraldNeedle-${filterId}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                    </defs>
                    {/* Tapered Sharp Arrowhead pointing directly UP towards perimeter */}
                    <polygon points="12,0 20,44 12,38 4,44" fill={`url(#emeraldNeedle-${filterId})`} />
                    <line x1="12" y1="0" x2="12" y2="64" stroke="#f59e0b" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* 2. Rear Counterweight Pointer (Points 180° opposite) */}
                <div className="absolute bottom-6 flex flex-col items-center">
                  <svg width="18" height="42" viewBox="0 0 18 42" className="opacity-80">
                    <polygon points="9,42 15,10 9,14 3,10" fill="#94a3b8" />
                    <line x1="9" y1="0" x2="9" y2="42" stroke="#64748b" strokeWidth="1" />
                  </svg>
                </div>

                {/* Center Pivot Pin */}
                <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-stone-100 border-2 border-amber-400 shadow-md z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Orientation Mode Status Indicator */}
          <div className="mt-3 text-center">
            {mode === 'static' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-stone-800 text-[11px] font-medium text-slate-700 dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Fixed North Mode (0° is Top)</span>
              </span>
            ) : isAlignedInLiveMode ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 animate-pulse border border-emerald-300 dark:border-emerald-700">
                <span>🕋 Facing Kaaba directly!</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[11px] font-medium text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Turn until green arrow points UP ({deviceHeading !== null ? `${deviceHeading}°` : 'Calibrating...'})</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Explanatory Column & Controls */}
        <div className="flex-1 w-full min-w-0 max-w-md space-y-4">
          {/* How to use & Direction summary */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {explanation.headlineEn}
                </h4>
                <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/80 mt-1 leading-relaxed">
                  {explanation.detailsEn}
                </p>
              </div>
            </div>
          </div>

          {/* Practical Alignment Instructions */}
          <div className="text-xs text-slate-600 dark:text-stone-400 space-y-2">
            <div className="font-semibold text-slate-800 dark:text-stone-200 flex items-center gap-1.5">
              <span>How to align with your room:</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
              <li>
                <strong>Determine True North (0°):</strong> Use your room&apos;s window/sunrise, or your phone&apos;s built-in compass app.
              </li>
              <li>
                <strong>Turn to {qiblaDegrees}° ({cardinal.en}):</strong> Turn clockwise from North toward the green Kaaba needle.
              </li>
              <li>
                <strong>Face the Kaaba:</strong> You are now facing {Math.round(distance.km).toLocaleString()} km towards Makkah al-Mukarramah.
              </li>
            </ol>
          </div>

          {/* Mode Switch Button (Fixed North vs Live Gyro Sensor) */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {mode === 'static' ? (
              <button
                onClick={enableLiveCompass}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Turn On Live Phone Compass</span>
              </button>
            ) : (
              <button
                onClick={disableLiveCompass}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-slate-800 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Switch back to Fixed North</span>
              </button>
            )}

            {/* Math & Spherical Verification Accordion Toggle */}
            <button
              onClick={() => setShowVerifyModal(!showVerifyModal)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-800 hover:bg-slate-50 dark:hover:bg-stone-800 text-slate-700 dark:text-stone-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Verify Mathematical Accuracy</span>
              {showVerifyModal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {sensorStatus === 'denied' && (
            <p className="text-[11px] text-rose-600 dark:text-rose-400">
              Compass permission was denied. You can still use the 100% accurate Fixed North dial above.
            </p>
          )}

          {sensorStatus === 'unsupported' && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400">
              Live orientation sensors not detected on this device. The Fixed North dial above is 100% accurate.
            </p>
          )}
        </div>
      </div>

      {/* Expandable Verification & Astronomical Geodesic Proof Panel */}
      {showVerifyModal && (
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-stone-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Geodesic Coordinates & Astronomical Verification</span>
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-stone-400">
              WGS-84 Great Circle Standard
            </span>
          </div>

          {/* Coordinate Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/60 border border-slate-200 dark:border-stone-800">
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-stone-400">Your Location</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 truncate">{cityName}</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-stone-400 mt-1">
                {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° {longitude >= 0 ? 'E' : 'W'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/60 border border-slate-200 dark:border-stone-800">
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-stone-400">Destination (Kaaba)</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">Makkah al-Mukarramah</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-stone-400 mt-1">
                {KAABA_COORDINATES.latitude.toFixed(4)}° N, {KAABA_COORDINATES.longitude.toFixed(4)}° E
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/60 border border-slate-200 dark:border-stone-800 sm:col-span-2 md:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-stone-400">Great Circle Distance</div>
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                {distance.km.toLocaleString()} km
              </div>
              <div className="text-[11px] font-medium text-slate-600 dark:text-stone-400 mt-1">
                ({distance.miles.toLocaleString()} statute miles)
              </div>
            </div>
          </div>

          {/* Educational Note: Great Circle vs Flat Map */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1.5 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5">
              <span>Why is the Qibla North-East in the USA and not South-East?</span>
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300">
              On a flat 2D wall map (Mercator projection), Saudi Arabia appears lower on the page than North America, leading many to assume the Qibla is South-East. But the Earth is a sphere! The shortest geodesic path from North America to Makkah curves upwards across the North Atlantic towards the North-East ({qiblaDegrees}°).
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300">
              This calculation adheres strictly to the Fiqh Council of North America, ISNA, and the official Google Qibla Finder.
            </p>
          </div>

          {/* Verification with Phone Built-in Compass */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-stone-950/40 border border-slate-200 dark:border-stone-800 text-xs text-slate-700 dark:text-stone-300 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white">
              How to verify this yourself with your phone:
            </div>
            <p className="text-[11px] leading-relaxed">
              1. Open Apple Compass (iPhone) or Google Maps / Compass (Android).<br />
              2. Rotate your body until your compass reads exactly <strong>{qiblaDegrees}°</strong>.<br />
              3. You are now facing the exact forward azimuth toward the Kaaba.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
