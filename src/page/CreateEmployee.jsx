import axios from "axios";
import { useContext, useState } from "react";
import Loader from "../components/Loader";
import baseURL from "../api/axiosApi";
import { GlobalContext } from "../context/ContextProvider";

const CreateEmployee = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { setEmployeeList } = useContext(GlobalContext);

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
		console.log(inputs);
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(`${baseURL}/employee/create`, inputs);
			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
			console.log(data);
			setEmployeeList((preState) => [...preState, data]);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<div className="h-full">
			<div className="px-6 bg-emerald-700 text-white py-2 w-full">
				Create Employee Page
			</div>
			<div className=" flex h-full py-10 mt-3 w-full  justify-center">
				<form
					action=""
					onSubmit={handleFormSubmit}
					className="md:border-2  md:shadow-md min-h-[600px] h-[630px] gap-5 flex  flex-col p-4 md:p-10 max-w-[500px] w-full md:max-w-[500px] "
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
							className="w-full border  border-gray-600 px-1 rounded py-1"
						>
							<option value="hr">HR </option>
							<option value="manager">Manager </option>
							<option value="sales">Sales </option>
						</select>
					</div>
					<div className="flex  gap-8 w-full">
						<div className="font-semibold">Gender</div>
						<div className="flex    items-center gap-4 ">
							<div className="flex  items-center gap-2">
								<label htmlFor="male">Male</label>
								<input
									onChange={handleInputChange}
									type="radio"
									name="gender"
									className="accent-emerald-600 transition-all h-4 w-4 p-6"
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
									className="accent-emerald-600 transition-all h-4 w-4 p-6"
									value="Female"
									checked={inputs.gender === "Female"}
								/>
							</div>
							<div className="flex items-center gap-2">
								<label htmlFor="other">Other</label>
								<input
									onChange={handleInputChange}
									type="radio"
									name="gender"
									id="other"
									className="accent-emerald-600 transition-all h-4 w-4 p-6"
									value="Other"
									checked={inputs.gender === "Other"}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-start items-center gap-8 w-full">
						<fieldset className="grid   grid-cols-2 items-center content-center justify-center gap-10">
							<legend className="font-semibold">Course</legend>
							<div className="">
								<div className="flex gap-4  items-center">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="bca"
										name="course"
										className="accent-emerald-600 transition-all h-4 w-4 "
										value="BCA"
									/>
									<label htmlFor="coding">BCA</label>
								</div>
								<div className="flex gap-4  items-center">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="mca"
										name="course"
										className="accent-emerald-600 transition-all h-4 w-4 "
										value="MCA"
									/>
									<label htmlFor="music">MCA</label>
								</div>
							</div>
							<div>
								<div className="flex gap-4  items-center">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="BSC"
										className="accent-emerald-600 transition-all h-4 w-4 "
										name="course"
										value="BSC"
									/>
									<label htmlFor="music">BSC</label>
								</div>
								<div className="flex gap-4  items-center">
									<input
										onChange={handleCheckboxChange}
										type="checkbox"
										id="cse"
										name="course"
										className="accent-emerald-600 transition-all h-4 w-4 "
										value="CSE"
									/>
									<label htmlFor="music">CSE</label>
								</div>
							</div>
						</fieldset>
					</div>

					<button
						type="submit"
						className="bg-emerald-700 mt-10 items-center gap-3 flex justify-center  text-white py-1 rounded"
					>
						{loading && <Loader className={"h-5 w-5"} />}
						{loading ? "Creating" : "Create"} Employee{" "}
					</button>
					<div
						className={`bg-green-500 ${
							success ? "scale-y-100" : "scale-y-0"
						} border py-2 rounded text-white text-center origin-top transition-all`}
					>
						Employee Created Successfully
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateEmployee;
