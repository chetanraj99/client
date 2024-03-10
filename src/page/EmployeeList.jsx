import { Link } from "react-router-dom";
import profileImage from "../assets/profie.jpg";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/ContextProvider";
import DeleteEmployee from "../components/DeleteEmployee";
import Loader from "../components/Loader";

const EmployeeList = () => {
	const { employeeList, loading } = useContext(GlobalContext);
	const [deleteEmployee, setDeleteEmployee] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [empId, setEmpId] = useState(null);

	return (
		<div className="h-full">
			<div className="px-6 bg-emerald-700 text-white py-2">
				Create Employee Page
			</div>
			<div
				className={`bg-green-400 ${
					deleteSuccess ? "scale-100" : "scale-y-0"
				} text-lg py-2 text-center transition-all origin-top`}
			>
				Employee Delete Successful.
			</div>
			<div className="flex justify-center items-center mt-10 text-white w-full overflow-scroll">
				{loading ? (
					<Loader className="h-20 w-20" />
				) : (
					<table className="table-auto border md:w-[95%] py-5 w-full">
						<thead className="bg-teal-800 py-4 h-12 ">
							<tr className="divide-x-2 py-4">
								<th>ID</th>
								<th>Name</th>
								<th className="">Email</th>
								<th className="">Mobile Number</th>
								<th className="">Designation</th>
								<th className="">Gender</th>
								<th className="">Course</th>

								<th className="w-44">Action</th>
							</tr>
						</thead>
						<tbody className="">
							{employeeList.map((emp, ind) => {
								return (
									<tr
										key={ind}
										className="border border-black px-1 h-12 even:bg-slate-600 odd:text-black text-center"
									>
										<td className="border border-black px-1">{emp.id}</td>

										<td className="border border-black px-1">{emp.name}</td>
										<td className="border  border-black px-1">{emp.email}</td>
										<td className="border border-black px-1 ">{emp.mobile}</td>
										<td className="border border-black px-1 ">
											{emp.designation}
										</td>
										<td className="border border-black px-1 ">{emp.gender}</td>
										<td className="border border-black px-1 ">
											{emp.course.map((c, ind, arr) => {
												if (ind === arr.length - 1) {
													return <span key={ind}>{c}</span>;
												}
												return <span key={ind}>{c}/</span>;
											})}
										</td>

										<td className="border border-black px-1 space-x-4 gap-2 text-white">
											<Link
												to={`/employeeedit/${emp.id}`}
												className="bg-blue-600 hover:bg-blue-700 transition-all px-4 py-1 text-xs rounded"
											>
												Edit
											</Link>
											<button
												onClick={() => {
													setDeleteEmployee(true);
													setEmpId(emp.id);
												}}
												className="bg-red-600 hover:bg-red-700 transition-all px-4 py-1 rounded text-xs"
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<DeleteEmployee
				empId={empId}
				deleteEmployee={deleteEmployee}
				deleteSuccess={deleteSuccess}
				setDeleteSuccess={setDeleteSuccess}
				setDeleteEmployee={setDeleteEmployee}
			/>
		</div>
	);
};

export default EmployeeList;
