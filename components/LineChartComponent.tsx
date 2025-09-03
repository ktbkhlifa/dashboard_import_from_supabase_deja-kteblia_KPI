import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// L'interface jdida: db wellat kat'9bel kter men dataKey
interface MultiLineChartProps {
  data: any[]; // Data ghadi tkoun f format { name: 'Jan 01', key1: 10, key2: 15 }
  lines: { dataKey: string; stroke: string }[]; // Tableau dyal les courbes li بغينا نرسمو
}

const LineChartComponent: React.FC<MultiLineChartProps> = ({ data, lines }) => {

  // L'7imaya: N't2ekdo أن data kayna 9bel manressmo
  const hasData = data && data.length > 0;

  if (!hasData) {
    return <div className="flex items-center justify-center h-full text-gray-500">No hourly data available for this simulation.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
          }}
        />
        <Legend />
        {/* Hna l'khdma jdida: Kan'boucliw 3la les courbes li bghina n'ressmo */}
        {lines.map(line => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

