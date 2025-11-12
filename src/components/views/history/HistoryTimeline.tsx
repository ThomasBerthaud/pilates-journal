import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { HistoryEntry } from '../../../utils/types';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

interface HistoryTimelineProps {
  data: HistoryEntry[];
}

// Format date ticks in FR (jj/mm)
function formatDateTick(timestamp: number) {
  try {
    const d = new Date(timestamp);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    });
  } catch {
    return '';
  }
}

function formatTooltipLabel(timestamp: number) {
  const d = new Date(timestamp);
  return d.toLocaleString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryTimeline({ data }: HistoryTimelineProps) {
  if (!data || data.length === 0) return null;

  // Convertir l'historique en points { x: completedAt, y: durée en minutes }
  const points = [...data]
    .sort((a, b) => a.completedAt - b.completedAt)
    .map((h) => ({
      x: h.completedAt,
      y: Math.round((h.totalDuration / 60) * 10) / 10, // minutes avec 1 décimale
      name: h.sessionName,
    }));

  const minX = points[0]?.x;
  const maxX = points[points.length - 1]?.x;
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Évolution des durées</h3>
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs md:text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
          Durée (min)
        </span>
      </div>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={points} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            {/* Dégradé pour l'aire sous la courbe (couleurs Tailwind indigo) */}
            <defs>
              <linearGradient id="indigoArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[minX, maxX]}
              tickFormatter={formatDateTick}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="y"
              tickFormatter={(v) => `${v} min`}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              allowDecimals
              domain={[Math.floor(Math.max(0, minY - 2)), Math.ceil(maxY + 2)]}
            />
            <Tooltip
              labelFormatter={(label) => formatTooltipLabel(Number(label))}
              formatter={(value: number, _name: string, payload: Payload<number, string>) => {
                const minutes = value as number;
                return [`${minutes} min`, payload?.payload?.name ?? 'Durée'];
              }}
              contentStyle={{
                borderRadius: 12,
                borderColor: '#e5e7eb',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                padding: '10px 12px',
              }}
              labelStyle={{
                color: '#374151',
                fontWeight: 600,
                marginBottom: 6,
              }}
              itemStyle={{
                color: '#4f46e5',
              }}
              cursor={{ stroke: '#c7d2fe', strokeWidth: 1 }}
            />
            <Area type="monotone" dataKey="y" stroke="#4f46e5" fill="url(#indigoArea)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
