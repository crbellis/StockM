import React from "react";

type PayloadType = {
	value: number;
};

type TooltipTypes = {
	active?: boolean;
	payload?: Array<PayloadType>;
	label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipTypes) => {
	if (active && payload?.length) {
		return (
			<div className="w-32 h-20 bg-white text-center flex flex-col justify-center items-center rounded-lg shadow-lg">
				<div className="text-[#00BD71] font-bold text-lg leading-5">
					+${payload[0].value.toLocaleString("en-us")}
				</div>
				<div className="text-gray-400 text-sm">Total Return</div>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;
