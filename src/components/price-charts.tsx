"use client"

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Пример данных для разных таймфреймов
const data = {
  '1m': [
    { name: '10:01', price: [30, 40, 20, 35] },
    { name: '10:02', price: [35, 45, 30, 42] },
    { name: '10:03', price: [42, 50, 38, 48] },
    { name: '10:04', price: [48, 55, 45, 52] },
    { name: '10:05', price: [52, 58, 50, 55] },
  ],
  '5m': [
    { name: '10:05', price: [40, 50, 35, 48] },
    { name: '10:10', price: [48, 55, 45, 52] },
    { name: '10:15', price: [52, 60, 50, 58] },
    { name: '10:20', price: [58, 65, 55, 62] },
    { name: '10:25', price: [62, 70, 60, 68] },
  ],
  '1h': [
    { name: '10:00', price: [2980, 3000, 2950, 2990] },
    { name: '11:00', price: [2990, 3020, 2980, 3010] },
    { name: '12:00', price: [3010, 3050, 3000, 3040] },
    { name: '13:00', price: [3040, 3080, 3030, 3070] },
    { name: '14:00', price: [3070, 3100, 3060, 3090] },
  ],
  '1d': [
    { name: 'Mon', price: [3000, 3200, 2900, 3150] },
    { name: 'Tue', price: [3150, 3300, 3100, 3250] },
    { name: 'Wed', price: [3250, 3400, 3200, 3350] },
    { name: 'Thu', price: [3350, 3500, 3300, 3450] },
    { name: 'Fri', price: [3450, 3600, 3400, 3550] },
  ],
};

const dataLine = [
  { name: 'Янв', price: 400 },
  { name: 'Фев', price: 300 },
  { name: 'Мар', price: 200 },
  { name: 'Апр', price: 278 },
  { name: 'Май', price: 189 },
  { name: 'Июн', price: 239 },
  { name: 'Июл', price: 349 },
];

export function PriceChartBar() {
  const [timeframe, setTimeframe] = useState('1h');

  const chartData = (data[timeframe as keyof typeof data] || data['1h']).map(d => ({
    name: d.name,
    close: d.price[3], // close
    open: d.price[0], // open
    high: d.price[1], // high
    low: d.price[2], // low
  }));

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        {['1m', '5m', '1h', '1d'].map(tf => (
          <button
            key={tf}
            className={`px-3 py-1 mx-1 rounded text-sm transition-colors ${
              timeframe === tf 
                ? 'bg-secondary text-secondary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Bar dataKey="close" fill="white" name="Close" />
          <Bar dataKey="open" fill="white" name="Open" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PriceChartLine() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataLine}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="white" 
            strokeWidth={2}
            activeDot={{ r: 6, fill: 'white' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
