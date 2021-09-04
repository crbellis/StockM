import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";

type Notification = {
	title: string;
	body: JSX.Element;
};

const NotificationPopover = () => {
	const [notifications, setNotifications] = React.useState<
		Array<Notification>
	>([
		{
			title: "Welcome to the platform!",
			body: (
				<>
					We hope you find great use of our product.
					<br />
					<br />
					If you ever need our help, reach out using the support
					channel to the left!
					<br />
					<br /> - Chase
				</>
			),
		},
	]);
	return (
		<Popover className="relative">
			<Popover.Button>
				{notifications?.length > 0 ? (
					<>
						<span className="animate-ping absolute w-2.5 h-2.5 right-1 rounded-full bg-[#1452EF]"></span>
						<span className="absolute w-2.5 h-2.5 right-1 border-[2px] border-white rounded-full bg-[#1452EF]"></span>
					</>
				) : null}
				<BellIcon className="hover:text-gray-500 transition-all 200ms ease-in-out" />
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
				afterLeave={() => setNotifications([])}
			>
				<Popover.Panel className="absolute z-10 w-80 max-w-sm px-4 mt-3 transform right-0 sm:px-0 lg:max-w-3xl">
					<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
						<div className="text-sm relative grid gap-8 bg-white px-7 py-5 lg:grid-cols-2">
							Notifications
						</div>
						<div className="px-7 py-4 bg-gray-50">
							{notifications?.length > 0 ? (
								notifications.map((element, index) => {
									return (
										<div key={index}>
											<span className="flex items-center mb-2">
												<span className="text-sm font-medium text-gray-900">
													{element["title"]}
												</span>
											</span>
											{/* {element} */}
											<span className="block text-sm text-gray-500 mb-5">
												{element["body"]}
											</span>
										</div>
									);
								})
							) : (
								<div>
									<span className="flex items-center mb-2">
										<span className="text-sm font-medium text-gray-900">
											Nothing to see here!
										</span>
									</span>
									<span className="block text-sm text-gray-500 mb-5">
										We'll notify you once you have some
										notifications ready.
									</span>
								</div>
							)}
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default NotificationPopover;
