import React from "react";
import {
	AreaChart,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	ResponsiveContainer,
	CartesianGrid,
	Legend,
} from "recharts";
import "./CartesianLines.css";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

type SummaryPropsTypes = {
	lineType?: "monotone" | undefined;
};

const Summary = ({ lineType }: SummaryPropsTypes) => {
	const data = [
		{
			name: "Jan",
			returnValue: 2400,
			amt: 2400,
		},
		{
			name: "Feb",
			returnValue: 1398,
			amt: 2210,
		},
		{
			name: "April",
			returnValue: 9800,
			amt: 2290,
		},
		{
			name: "March",
			returnValue: 3908,
			amt: 2000,
		},
		{
			name: "May",
			returnValue: 4800,
			amt: 2181,
		},
		{
			name: "June",
			returnValue: 3800,
			amt: 2500,
		},
		{
			name: "July",
			returnValue: 4300,
			amt: 2100,
		},
	];

	const labels = data.map((obj) => {
		return obj["name"];
	});
	console.log(labels);
	return (
		<div className="w-11/12 h-80 z-0">
			<ResponsiveContainer width="100%">
				<AreaChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 5,
					}}
				>
					<defs>
						<linearGradient
							id="colorPv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#00BD71"
								stopOpacity={0.3}
							/>
							<stop
								offset="95%"
								stopColor="#00BD71"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						x={75}
						vertical={false}
						stroke="#f2f2f2"
						strokeWidth={2}
					/>
					<XAxis
						dataKey="name"
						tickLine={false}
						axisLine={false}
						tick={{ fill: "rgba(156, 163, 175)" }}
						padding={{ left: 25 }}
						// height={10}
					/>
					<YAxis
						tickFormatter={(value) =>
							`$${value.toLocaleString("en-us")}`
						}
						tickLine={false}
						axisLine={false}
						tick={{ fill: "rgba(156, 163, 175)" }}
						padding={{ bottom: 50 }}
					/>
					<Tooltip
						cursor={false}
						wrapperStyle={{
							width: "80px",
							height: "35px",
						}}
						contentStyle={{
							border: "0px",
							borderRadius: "10px",
						}}
						content={<CustomTooltip />}
					/>
					<Legend
						align="right"
						verticalAlign="top"
						iconType="square"
						content={<CustomLegend />}
					/>
					<Area
						type={lineType}
						dataKey="returnValue"
						stroke="#00BD71"
						strokeWidth={4}
						fillOpacity={1}
						fill="url(#colorPv)"
						activeDot={{ r: 6 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Summary;
