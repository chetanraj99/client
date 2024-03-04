import axios from "axios";
import { useState, useTransition } from "react";
import Loader from "../components/Loader";

const CreateEmployee = () => {
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "rampravesh",
		email: "ram123@gmail.com",
		mobile: "913383388338",
		designation: "HR",
		course: [],
		gender: "Male",
	});
	const handleInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setInputs((preState) => {
			return { ...preState, [name]: value };
		});
		console.log(inputs);
	};
	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		setInputs((prevState) => {
			if (checked) {
				return { ...prevState, course: [...prevState.course, value] };
			} else {
				return {
					...prevState,
					course: prevState.course.filter((item) => item !== value),
				};
			}
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				"http://localhost:8080/employee/register",
				inputs
			);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<div className="h-full">
			<div className="px-6 bg-emerald-700 text-white py-2">
				Create Employee Page
			</div>
			<div className=" flex h-full ml-10 mt-10 justify-center">
				<form
					action=""
					onSubmit={handleFormSubmit}
					className="border-2 shadow-md min-h-[600px] h-[600px] gap-4 flex flex-col p-10 w-[500px]"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="name" className="font-semibold">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={inputs.name}
							onChange={handleInputChange}
							name="name"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Name"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="email" className="font-semibold">
							Email
						</label>
						<input
							type="email"
							value={inputs.email}
							onChange={handleInputChange}
							id="email"
							name="email"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Email"
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="mobile" className="font-semibold">
							Mobile No.
						</label>
						<input
							type="text"
							value={inputs.mobile}
							id="mobile"
							onChange={handleInputChange}
							name="mobile"
							className="w-full border border-gray-600 px-1 rounded py-1"
							placeholder="Mobile"
						/>
					</div>
					<div className="flex flex-col w-full ">
						<label htmlFor="designation" className=" font-semibold">
							Choose your designation:
						</label>
						<select
							name="designation"
							id="designation"
							value={inputs.designation}
							onChange={handleInputChange}
							className="w-full border border-gray-600 px-1 rounded py-1"
						>
							<option value="hr">HR </option>
							<option value="manager">Manager </option>
							<option value="sales">Sales </option>
						</select>
					</div>
					<div className="flex  gap-8 w-full">
						<div className="font-semibold">Gender</div>
						<div className="flex items-center gap-4 ">
							<div className="flex items-center gap-2">
								<label htmlFor="male">Male</label>
								<input
									onChange={handleInputChange}
									type="radio"
									name="gender"
									id="male"
									value="Male"
									checked={inputs.gender === "Male"}
								/>
							</div>
							<div className="flex items-center gap-2">
								<label htmlFor="female">Female</label>
								<input
									onChange={handleInputChange}
									type="radio"
									name="gender"
									id="female"
									value="Female"
									checked={inputs.gender === "Female"}
								/>
							</div>
						</div>
					</div>
					<div className="flex  gap-8 w-full">
						<fieldset className="flex justify-between gap-10">
							<legend className="font-semibold">Course</legend>
							<div>
								<div className="flex gap-4">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="bca"
										name="course"
										value="bca"
									/>
									<label htmlFor="coding">BCA</label>
								</div>
								<div className="flex gap-4">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="mca"
										name="course"
										value="mca"
									/>
									<label htmlFor="music">MCA</label>
								</div>
							</div>
							<div>
								<div className="flex gap-4">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="BSC"
										name="course"
										value="bsc"
									/>
									<label htmlFor="music">BSC</label>
								</div>
								<div className="flex gap-4">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="cse"
										name="course"
										value="cse"
									/>
									<label htmlFor="music">CSE</label>
								</div>
							</div>
						</fieldset>
					</div>

					<button
						type="submit"
						className="bg-emerald-700 items-center gap-3 flex justify-center  text-white py-1 rounded"
					>
						{loading && <Loader className={"h-5 w-5"} />}
						{loading ? "Creating" : "Create"} Employee{" "}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateEmployee;
