import React from "react";
import "./Table.css";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

const Trending = () => {
	return (
		<div className="w-10/12 h-5/6 border-2 border-gray-100 rounded-2xl my-5 flex justify-center">
			<table className="table-auto border-separate m-3 text-center w-full text-sm text-gray-500">
				<thead>
					<tr className="h-5">
						<th className="p-3 px-5">#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Change</th>
					</tr>
				</thead>
				<tbody className="text-center font-semibold">
					<tr className="text-md text-[#182c5c]">
						<td>1</td>
						<td>AAPL</td>
						<td>$148.60</td>
						<td className="text-center text-green-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-green-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmUpIcon />
									</div>
									0.72%
								</div>
							</div>
						</td>
					</tr>

					<tr className="text-md text-[#182c5c]">
						<td>2</td>
						<td>SPY</td>
						<td>$450.25</td>
						<td className="text-center text-green-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-green-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmUpIcon />
									</div>
									0.89%
								</div>
							</div>
						</td>
					</tr>

					<tr className="text-md text-[#182c5c]">
						<td>3</td>
						<td>VIX</td>
						<td>$16.39</td>
						<td className="text-center text-red-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-red-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmDownIcon />
									</div>
									13.00%
								</div>
							</div>
						</td>
					</tr>

					<tr className="text-md text-[#182c5c]">
						<td>4</td>
						<td>TWTR</td>
						<td>$63.43</td>
						<td className="text-center text-green-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-green-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmUpIcon />
									</div>
									1.31%
								</div>
							</div>
						</td>
					</tr>

					<tr className="text-md text-[#182c5c]">
						<td>5</td>
						<td>TSLA</td>
						<td>$711.92</td>
						<td className="text-center text-green-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-green-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmUpIcon />
									</div>
									1.53%
								</div>
							</div>
						</td>
					</tr>

					<tr className="text-md text-[#182c5c]">
						<td>6</td>
						<td>AMC</td>
						<td>$40.84</td>
						<td className="text-center text-green-700">
							<div className="w-full h-full flex justify-center items-center">
								<div className="flex flex-row w-20 p-1 bg-green-100 rounded-3xl font-bold">
									<div className="w-5 h-5 text-center">
										<ArrowSmUpIcon />
									</div>
									1.31%
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Trending;
