import React from "react";
import PortfolioCardElement from "./PortfolioCardElement";
type PortfolioCardPropsTypes = {
	symbol: string;
	name: string;
	sector: string;
	accountValue: number;
	returnValue: number;
};

const PortfolioCard = ({
	symbol,
	name,
	sector,
	accountValue,
	returnValue,
}: PortfolioCardPropsTypes) => {
	return (
		<div className="flex items-center border-2 justify-between border-gray-100 rounded-2xl p-3 my-3">
			<div className="flex flex-row justify-around w-3/5">
				<PortfolioCardElement element={symbol} label="Symbol" />
				<PortfolioCardElement element={name} label={sector} />
			</div>
			<div className="ml-5 flex flex-row justify-around w-1/2">
				<PortfolioCardElement
					accountValue={accountValue}
					label="Account Value"
				/>
				<PortfolioCardElement
					returnValue={returnValue}
					label="Return Value"
				/>
			</div>
		</div>
	);
};

export default PortfolioCard;
