import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="h-full">
			<div className="px-6 bg-emerald-700 text-white py-2">Register Page</div>
			<div className=" flex h-full justify-center items-center">
				<form
					action=""
					className="border-2 shadow-md h-[300px] gap-4 flex flex-col p-10 w-[500px]"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="name" className="text-xl">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Name"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="email" className="text-xl">
							Email
						</label>
						<input
							type="text"
							id="email"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Email"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="password" className="text-xl">
							Password
						</label>
						<input
							type="text"
							id="password"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Password"
						/>
					</div>

					<button className="bg-emerald-700 text-xl text-white py-1 rounded">
						Register{" "}
					</button>
					<div>
						Already&apos;t Have account?{" "}
						<Link to="/" className="text-blue-600">
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
