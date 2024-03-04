import React from "react";
import { twMerge } from "tailwind-merge";

const Loader = ({ className }) => {
	return (
		<div
			className={twMerge(
				"h-5 w-5 border border-e-black rounded-full animate-spin",
				className
			)}
		></div>
	);
};

export default Loader;
