"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Use a deterministic data set
const data = [
  { name: "Mon", total: 2000 },
  { name: "Tue", total: 3000 },
  { name: "Wed", total: 4000 },
  { name: "Thu", total: 2500 },
  { name: "Fri", total: 3500 },
  { name: "Sat", total: 4500 },
  { name: "Sun", total: 1500 },
]

export function RevenuePanel() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

