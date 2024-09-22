"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const year = new Date().getFullYear();

// Updated chart data based on the data you provided

const chartConfig = {
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  occupational: {
    label: "Occupational",
    color: "hsl(var(--chart-2))",
  },
};

export default function PerMonthChart() {
  const [activeChart, setActiveChart] = React.useState("standard");
  const [permonthData, setPermonthData] = React.useState([]); // Using the provided chart data

  const total = React.useMemo(
    () => ({
      standard: permonthData.reduce((acc, curr) => acc + curr.standard, 0),
      occupational: permonthData.reduce((acc, curr) => acc + curr.occupational, 0),
    }),
    [permonthData]
  );



  React.useEffect(() => {
    async function getPermonthData() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('http://localhost:3000/api/getDataPermonth'); // Replace with your actual API route
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Assuming the API returns JSON data
        console.log(data);
        setPermonthData(data); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getPermonthData(); // Call the function inside the useEffect
  },[])



  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Number of Trainees per Month</CardTitle>
          <CardDescription>
            Showing total Trainees for the year {year}
          </CardDescription>
        </div>
        <div className="flex">
          {["standard", "occupational"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={permonthData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(`${value}-01`);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    const date = new Date(`${value}-01`);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              onClick={(data, index) =>
                alert(`You clicked on ${activeChart} bar for month: ${data.month}`)
              }
              className="cursor-pointer"
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
