import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import baseURL from "../api/axiosApi";
import { GlobalContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";

const EmployeeEdit = () => {
	const [loading, setLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { setEmployeeList } = useContext(GlobalContext);
	const { id } = useParams();

	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		mobile: "",
		designation: "",
		course: [],
		gender: "",
	});
	const handleInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setInputs((preState) => {
			return { ...preState, [name]: value };
		});
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
			const { data } = await axios.put(
				`${baseURL}/employee/update/${id}`,
				inputs
			);

			console.log(data);
			setEmployeeList((preState) => {
				return preState.map((emp) => {
					console.log(typeof emp.id);
					console.log(typeof id);
					if (emp.id === +id) {
						return { ...data };
					} else {
						return emp;
					}
				});
			});
			setTimeout(() => {
				setSuccess(true);
				setInputs(data);
				setLoading(false);
			}, 1000);
			setTimeout(() => {
				setSuccess(false);
			}, 2400);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		const getEmployeeData = async () => {
			try {
				setEditLoading(true);
				const { data } = await axios.get(`${baseURL}/employee/get/${id}`);
				console.log(data);

				setInputs(data);
				setTimeout(() => {
					setEditLoading(false);
				}, 2000);
			} catch (error) {
				console.log(error);
			}
		};
		getEmployeeData();
	}, []);
	return (
		<div className="h-full">
			<div className="px-6 bg-emerald-700 text-white py-2">
				Edit Employee Page
			</div>
			<div className=" items-center flex h-full    justify-center">
				{editLoading ? (
					<Loader className="h-20 w-20" />
				) : (
					<form
						action=""
						onSubmit={handleFormSubmit}
						className="border-2 shadow-md min-h-[600px] h-[630px] gap-5 flex flex-col p-10 w-[500px]"
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
							<div className="flex items-center gap-4 ">
								<div className="flex items-center gap-2">
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
							<fieldset className="flex  justify-between gap-10">
								<legend className="font-semibold">Course</legend>
								<div>
									<div className="flex gap-4  items-center">
										<input
											onChange={handleCheckboxChange}
											type="checkbox"
											id="bca"
											name="course"
											className="accent-emerald-600 transition-all h-4 w-4 "
											value="BCA"
											checked={inputs.course.includes("BCA")}
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
											checked={inputs.course.includes("MCA")}
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
											checked={inputs.course.includes("BSC")}
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
											checked={inputs.course.includes("CSE")}
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
							{loading ? "Updating" : "Update"} Employee{" "}
						</button>
						<div
							className={`bg-green-500 ${
								success ? "scale-y-100" : "scale-y-0"
							} border py-2 rounded text-white text-center origin-top transition-all`}
						>
							Employee Updated Successfully
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default EmployeeEdit;
