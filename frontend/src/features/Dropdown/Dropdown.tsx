import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/outline";

type DropdownPropsTypes = {
	label?: string;
	list: Array<string>;
	defaultSelection: string;
	icon?: "setting" | undefined;
	border?: boolean;
	update?: (arg: any) => void;
};

function Dropdown({
	label,
	list,
	defaultSelection,
	icon,
	border,
	update,
}: DropdownPropsTypes) {
	const [currentSelection, setCurrentSelection] =
		React.useState<string>(defaultSelection);

	const updateSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
		setCurrentSelection(e.currentTarget.value);
		if (update) {
			update(e.currentTarget.value);
		}
	};
	return (
		<div className="mb-3 flex flex-row items-center">
			<div className="text-gray-400">{label}</div>
			<div className="ml-3">
				<Menu
					as="div"
					className="relative inline-block text-left z-100"
				>
					<div>
						<Menu.Button
							className={
								`inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white rounded-md  focus:outline-none` +
								(border || border === undefined
									? ` border-[1px] border-gray-300`
									: null)
							}
						>
							{icon === undefined ? (
								<div className="w-full inline-flex">
									{currentSelection}

									<ChevronDownIcon
										className="w-5 h-5 ml-2 -mr-1"
										aria-hidden="true"
									/>
								</div>
							) : (
								<div className="w-8 h-8 rounded-lg bg-gray-50 p-1 flex justify-center items-center">
									<CogIcon className="w-5 h-5 text-gray-400" />
								</div>
							)}
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="z-50 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							{icon === undefined ? null : (
								<Menu.Item>
									<div className="text-sm font-semibold relative grid gap-8 px-3 py-2.5 bg-gray-50 ">
										Graph Settings
									</div>
								</Menu.Item>
							)}
							{list?.length > 0
								? list.map((value, index) => {
										return (
											<div
												key={index}
												className="px-1 py-1 z-100"
											>
												<Menu.Item>
													{({ active }) => (
														<button
															value={value}
															className={`${
																active
																	? "bg-[#00bd71] text-white"
																	: "bg-white"
															} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
															onClick={
																updateSelection
															}
														>
															{value}
														</button>
													)}
												</Menu.Item>
											</div>
										);
								  })
								: null}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	);
}
export default Dropdown;
