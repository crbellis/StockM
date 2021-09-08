import React from "react";
import Header from "../Header/Header";
import Summary from "./Summary";
import Dropdown from "../Dropdown/Dropdown";
import Trending from "./Trending";
import { NavLink } from "react-router-dom";
import Portfolio from "./DashboardPortfolio/Portfolio";
import DonutChart from "./DonutChart/DonutChart";
import { getSettings } from "../API/API";

type lineTypes = "monotone" | undefined;

type lineTypeUITypes = {
	Smooth: "monotone";
	Rigid: undefined;
};

const Dashboard = () => {
	const lineTypeUI: lineTypeUITypes = {
		Smooth: "monotone",
		Rigid: undefined,
	};
	const [lineType, setLineType] = React.useState<lineTypes>("monotone");
	const updateLine = (line: "Smooth" | "Rigid") => {
		const temp = lineTypeUI[line];
		setLineType(temp);
	};

	React.useEffect(() => {
		getSettings();
	}, []);

	return (
		<div className="w-full h-full p-10 flex flex-col">
			<Header />
			<main className="mt-12 flex flex-row">
				<div className="w-2/3">
					<div className="w-full">
						<div className="font-bold text-lg mb-8">
							Portfolio Summary
						</div>
					</div>
					<div className="flex flex-row justify-between items-center w-[95%] mb-0">
						<Dropdown
							label="Showing data for: "
							defaultSelection="ALL"
							list={["1D", "1W", "1M", "3M", "1Y", "ALL"]}
						/>
						<Dropdown
							border={false}
							icon="setting"
							defaultSelection="Smooth"
							list={["Smooth", "Rigid"]}
							update={updateLine}
						/>
					</div>
					<div className="flex flex-row">
						<Summary lineType={lineType} />
					</div>
				</div>
				<div className="w-1/3">
					<div className="font-bold text-lg">Trending Stocks</div>
					<Trending />
				</div>
			</main>
			<section className="w-full h-full flex mt-12">
				<div className=" w-3/5">
					<div className="flex flex-row justify-between">
						<div className="font-bold text-lg mb-2">
							Your Portfolio
						</div>
						<NavLink to="portfolio">
							<div className="text-[#12B376] font-bold hover:text-[#1e805a]">
								View All
							</div>
						</NavLink>
					</div>
					<Portfolio />
				</div>
				<div className="flex flex-col mx-5 w-2/5">
					<div className="font-bold text-lg mb-2">
						Portfolio Statistics
					</div>
					<div className="flex justify-center items-center h-full w-full">
						<DonutChart />
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
