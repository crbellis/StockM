import {
	TemplateIcon,
	ChartBarIcon,
	TrendingUpIcon,
} from "@heroicons/react/solid";
import {
	CreditCardIcon,
	ClipboardIcon,
	MailIcon,
	CogIcon,
	PhoneIcon,
} from "@heroicons/react/outline";
import SlackIcon from "../../assets/SlackIcon";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
const Navbar = () => {
	return (
		<nav className="h-screen w-64 min-w-[256px] bg-[#f1f9f9] m-0 overflow-y-hidden">
			{/* logo */}
			<div className="px-7 tracking-tight mt-8">
				<NavLink to="/">
					<div className="h-14 py-10 flex flex-row items-baseline">
						<div className="font-black rounded-full text-[#12B376] text-lg bg-[#def4ea] h-8 w-8 flex  justify-center content-center text-center mr-3 p-1">
							S
						</div>
						<div className="font-black text-2xl tracking-tighter text-[#192c5e]">
							StockM
						</div>
					</div>
				</NavLink>
				<div className="w-full flex justify-center mt-5">
					<button className="tracking-tight shadow-lg bg-[#00bd71] text-sm p-3 pt-4 w-full text-center text-green-50 font-semibold rounded-lg align-baseline hover:shadow-md transition 300ms ease-in-out">
						Invest Now
					</button>
				</div>
			</div>
			<div className="w-full">
				<div className="px-7 mt-8 mb-4 font-semibold uppercase text-sm text-gray-400">
					Menu
				</div>
				<NavItem name="Dashboard" link="/dashboard">
					<TemplateIcon />
				</NavItem>
				<NavItem name="Portfolio" link="/portfolio">
					<ChartBarIcon /> 
				</NavItem>
				<NavItem name="Discover" link="/discover">
					<TrendingUpIcon /> 
				</NavItem>
				<NavItem name="Payment" link="/payment">
					<CreditCardIcon /> 
				</NavItem>
				<NavItem name="History" link="/history">
					<ClipboardIcon /> 
				</NavItem>
				<NavItem name="Inbox" link="/inbox">
					<MailIcon /> 
				</NavItem>
				<NavItem name="Settings" link="/settings">
					<CogIcon /> 
				</NavItem>
			</div>
			<div className="w-full">
				<div className="px-7 mt-8 mb-4 font-semibold uppercase text-sm text-gray-400">
					Community
				</div>
				<NavItem name="Support" link="/support">
					<PhoneIcon />
				</NavItem>
				<NavItem name="Community" link="/slack">
					<SlackIcon /> 
				</NavItem>
			</div>
		</nav>
	);
};

export default Navbar;
