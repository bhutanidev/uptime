"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"

const baseTime = Date.now()
const chartData = Array.from({ length: 6 }, (_, i) => ({
  time: new Date(baseTime + i * 3 * 60 * 1000).toISOString(),
  response_time_in_ms: [186, 305, 237, 73, 209, 214][i],
}))

const chartConfig = {
  response_time_in_ms: {
    label: "Response Time",
    color: "blue", // Use direct color if your chart library allows
  },
} satisfies ChartConfig

export function ChartLineLinear() {
  return (
    <Card className=" bg-slate-900/30 border-slate-800 h-80">
        <ChartContainer className=" h-full bg-slate-900/30" config={chartConfig}>
          <LineChart 
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            {/* <CartesianGrid stroke="#333" vertical={false} /> */}
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#ccc" }}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="response_time_in_ms"
              type="linear"
              stroke="#155dfc"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
    </Card>
  )
}
