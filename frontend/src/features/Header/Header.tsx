import NotificationPopover from "./NotificationPopover";
import { selectUser } from "../Login/loginSlice";
import { useSelector } from "react-redux";
import Account from "./Account";
const Header = () => {
	const user = useSelector(selectUser);
	const initial = user.firstName?.charAt(0) ? user.firstName?.charAt(0) : "";
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
					Good morning, {user.firstName} {user.lastName}
				</div>
			</div>
			<div className="flex flex-row items-center">
				{/* notifications */}
				<div className="relative w-7 h-7 text-gray-400">
					<div>
						<NotificationPopover />
					</div>
				</div>
				<div>
					<Account initial={initial} />
				</div>
			</div>
		</header>
	);
};

export default Header;
