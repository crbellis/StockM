import NotificationPopover from "./NotificationPopover";
const Header = () => {
	return (
		<header className="flex flex-row justify-between items-center">
			<div>
				<div className="text-xl font-semibold">
					Welcome to the{" "}
					<span className="text-2xl font-black text-[#12B376] tracking-tighter">
						StockM Platform
					</span>
				</div>
				<div className="mt-3 text-gray-400">
					Good morning, Chase Bellisime
				</div>
			</div>
			<div className="flex flex-row items-center">
				{/* notifications */}
				<div className="relative w-7 h-7 text-gray-400">
					<div>
						<NotificationPopover />
					</div>
				</div>
				<div className="mx-5 font-semibold text-lg flex w-9 h-9 bg-green-200 rounded-full text-center justify-center items-center text-green-700 border-2 border-white shadow-md">
					C
				</div>
			</div>
		</header>
	);
};

export default Header;
