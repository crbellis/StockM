import React from "react";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
	return (
		<div className="flex flex-col justify-between">
			<PortfolioCard
				symbol="TSLA"
				name="Tesla"
				sector="Consumer Cyclical/Auto Manufacturers"
				accountValue={17086.08}
				returnValue={0.4564}
			/>
			<PortfolioCard
				symbol="AAPL"
				name="Apple Inc"
				sector="Technology/Consumer Electronics"
				accountValue={5602.08}
				returnValue={0.1264}
			/>
		</div>
	);
};

export default Portfolio;
