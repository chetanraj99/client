import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";

const Header = () => {
	const [menu, setMenu] = useState(false);
	const { loggedIn } = useContext(GlobalContext);
	return (
		<div className="">
			<div className="bg-gray-800 text-2xl flex justify-between items-center  text-white py-2 px-4">
				<div>EMS</div>
				<button className="md:hidden" onClick={() => setMenu(true)}>
					<GiHamburgerMenu className="text-2xl" />
				</button>
			</div>
			<div
				className={`fixed ${
					menu ? "scale-100" : "scale-0"
				} flex flex-col pt-20 items-center transition-all origin-top-right text-white text-5xl bg-slate-900 inset-0`}
			>
				<button
					className="absolute top-2 right-4 text-2xl"
					onClick={() => setMenu(false)}
				>
					<AiOutlineClose />
				</button>
				{loggedIn && (
					<div
						className="flex flex-col  items-center gap-7"
						onClick={() => setMenu(false)}
					>
						<NavLink
							to="/"
							className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
						>
							Home
						</NavLink>
						<NavLink
							to="/employeelist"
							className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
						>
							Employee List
						</NavLink>
						<NavLink
							className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
							to="/createemployee"
						>
							Create Employee
						</NavLink>
						<NavLink className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black">
							Hakum Gupta
						</NavLink>
						<NavLink className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black">
							Logout
						</NavLink>
					</div>
				)}
			</div>

			{loggedIn && (
				<div className="px-8  md:flex hidden justify-between bg-gray-200 py-2">
					<NavLink
						to="/"
						className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
					>
						Home
					</NavLink>
					<NavLink
						to="/employeelist"
						className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
					>
						Employee List
					</NavLink>
					<NavLink
						className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black"
						to="/createemployee"
					>
						Create Employee
					</NavLink>
					<NavLink className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black">
						Hakum Gupta
					</NavLink>
					<NavLink className="hover:bg-gray-400 px-4 py-1 rounded hover:text-black">
						Logout
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default Header;
