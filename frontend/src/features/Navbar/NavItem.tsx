import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
	children: JSX.Element;
	name: string;
	link: string;
};

const NavItem = ({ children, name, link }: NavItemProps) => {
	return (
		<div className="font-semibold text-gray-400 hover:text-gray-500">
			<NavLink
				to={link}
				className="flex flex-row content-center  border-l-4 border-opacity-0 transition-all 300ms ease-in-out"
				activeClassName="flex flex-row content-center text-[#00bd71] border-[#00bd71] border-opacity-100"
			>
				<div className="p-3 px-5 flex flex-row content-center">
					<div className="h-5 w-5 mr-3">{children}</div>
					{name}
				</div>
			</NavLink>
		</div>
	);
};

export default NavItem;
