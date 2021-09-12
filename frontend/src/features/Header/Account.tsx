import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../Login/loginSlice";

const solutions = [
	{
		name: "Settings",
		href: "##",
		// icon: IconOne,
	},
];

const Account: React.FC<{ initial: string }> = ({ initial }): JSX.Element => {
	const dispatch = useDispatch();

	const handleSignout = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			dispatch(signOut());
			// once a user is no longer authenticated, they are redirected to
			// log in page via the protected routes
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button>
						<div className="mx-5 font-semibold text-lg flex w-9 h-9 bg-green-200 rounded-full text-center justify-center items-center text-green-700 border-2 border-white shadow-md">
							{initial}
						</div>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute z-10 w-52 max-w-sm px-4 mt-3 transform right-0 sm:px-0 lg:max-w-3xl">
							<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="relative bg-white p-3 ">
									{solutions.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
										>
											{/* <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
												<item.icon aria-hidden="true" />
											</div> */}
											<div className="ml-4">
												<p className="text-sm font-medium text-gray-900">
													{item.name}
												</p>
											</div>
										</a>
									))}
								</div>
								<div className="p-3 bg-gray-50">
									<div className="flow-root transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
										<span className="ml-4 flex items-center">
											<span className="p-2 text-sm font-medium text-gray-900">
												<NavLink
													to="/login"
													onClick={handleSignout}
												>
													Sign out
												</NavLink>
											</span>
										</span>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default Account;
