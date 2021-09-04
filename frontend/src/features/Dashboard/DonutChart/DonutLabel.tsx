import React from "react";

type DonutLabelPropsTypes = {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
	nameKey: string;
};

interface DonutLinePropsTypes extends DonutLabelPropsTypes {
	color: string;
	startAngle: number;
	endAngle: number;
}

const DonutLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
	nameKey,
}: DonutLabelPropsTypes) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) + 40;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<svg className="h-5 w-5 bg-red shadow-lg">
			<text
				x={x}
				y={y}
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
				fill="rgba(156, 163, 175, 0.8)"
				className="font-semibold bg-gray-400 text-gray-400"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
			{/* <rect
				x={x - 50}
				y={y - 50}
				width="75"
				height="50"
				fill="#fff"
				ry={20}
				rx={20}
				className="text-white shadow-lg"
			></rect> */}
		</svg>
	);
};

export const LabelLine = (props: DonutLinePropsTypes) => {
	let {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		color,
		startAngle,
		endAngle,
	} = props;
	const RADIAN = Math.PI / 180;
	const diffAngle = endAngle - startAngle;
	const radius = innerRadius + (outerRadius - innerRadius);
	let path = "";
	for (let i = 0; i < (360 - diffAngle) / 15; i++) {
		path += `${cx + (radius + i) * Math.cos(-midAngle * RADIAN)},${
			cy + (radius + i * i) * Math.sin(-midAngle * RADIAN)
		} `;
	}
	return <polyline points={path} stroke={color} fill="none" />;
};

export default DonutLabel;
