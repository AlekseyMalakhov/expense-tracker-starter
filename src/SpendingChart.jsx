import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from './utils/format';

const COLORS = ['#38bdf8', '#34d399', '#fb7185', '#a78bfa', '#fbbf24', '#f472b6', '#60a5fa', '#4ade80'];

const tooltipStyle = {
  background: '#0c1120',
  border: '1px solid rgba(56, 189, 248, 0.15)',
  borderRadius: '8px',
  color: '#dde3ed',
  fontSize: '13px',
  fontFamily: 'Mulish, sans-serif',
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Mulish, sans-serif' }}
            axisLine={{ stroke: 'rgba(56,189,248,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatCurrency(v)}
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Mulish, sans-serif' }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Amount']}
            contentStyle={tooltipStyle}
            cursor={{ fill: 'rgba(56, 189, 248, 0.04)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
