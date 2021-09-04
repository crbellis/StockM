import React from "react";

type PortfolioElementPropsTypes = {
	element?: string;
	accountValue?: number;
	returnValue?: number;
	label?: string;
};

const PortfolioCardElement = ({
	element,
	label,
	accountValue,
	returnValue,
}: PortfolioElementPropsTypes) => {
	return (
		<div className="m-3 flex flex-col items-center">
			{element ? (
				<div className="font-bold text-lg">{element}</div>
			) : accountValue ? (
				<div className="text-[#12B376] font-bold text-lg">
					${accountValue.toLocaleString("en-us")}
				</div>
			) : (
				returnValue && (
					<div className="text-[#12B376] font-bold text-lg">
						{(returnValue * 100).toFixed(2)}%
					</div>
				)
			)}
			<div className="text-gray-400 text-sm">{label}</div>
		</div>
	);
};

export default PortfolioCardElement;
