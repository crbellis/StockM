import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import DonutLabel from "./DonutLabel";

const DonutChart = () => {
	const data = [
		{ name: "Geeksforgeeks", students: 400 },
		{ name: "Technical scripter", students: 700 },
		{ name: "Geek-i-knack", students: 200 },
	];
	const COLORS = ["#33CD8D", "#2F69FF", "#E3EEFF", "#FF8042"];

	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					name="border"
					data={[{ data: 100 }]}
					outerRadius={90}
					innerRadius={45}
					stroke=""
					dataKey="data"
					fill="#F4FAFF"
				></Pie>
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
				<Pie
					data={data}
					dataKey="students"
					cx="50%"
					cy="50%"
					outerRadius={80}
					innerRadius={45}
					stroke=""
					// labelLine={LabelLine}
					label={DonutLabel}
					legendType="square"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default DonutChart;
