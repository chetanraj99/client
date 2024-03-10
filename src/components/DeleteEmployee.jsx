import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import baseURL from "../api/axiosApi";
import axios from "axios";
import { GlobalContext } from "../context/ContextProvider";

const DeleteEmployee = ({
	empId,
	deleteEmployee,
	setDeleteEmployee,
	deleteSuccess,
	setDeleteSuccess,
}) => {
	const [loading, setLoading] = useState(false);
	const { setEmployeeList } = useContext(GlobalContext);
	useEffect(() => {
		document.body.style.overflow = deleteEmployee ? "hidden" : "auto";
	}, [deleteEmployee]);

	const handleDeleteEmployee = async () => {
		try {
			setLoading(true);
			await axios.delete(`${baseURL}/employee/delete/${empId}`);

			setTimeout(() => {
				setDeleteEmployee(false);
				setDeleteSuccess(true);
				setLoading(false);
				setEmployeeList((presState) =>
					presState.filter((emp) => {
						return emp.id !== empId;
					})
				);
			}, 1000);
			setTimeout(() => {
				setDeleteSuccess(false);
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div
			id="modalContainer"
			onClick={(e) => {
				if (e.target === document.getElementById("modalContainer")) {
					setDeleteEmployee(false);
				}
			}}
			className={`fixed ${
				deleteEmployee ? "scale-100" : "scale-0"
			} inset-0 top-10 flex justify-center items-center`}
		>
			<div
				className={`bg-white ${
					deleteEmployee ? "scale-100" : "scale-75"
				}  shadow h-32 w-[300px] p-4 flex-col  shadow-green-600 border-green-600 border transition-all rounded flex justify-between`}
			>
				<div className="font-bold">Confirm Delete</div>
				<div className="flex gap-4 self-end">
					<button
						onClick={() => setDeleteEmployee(false)}
						className="bg-slate-600 text-white px-6 rounded-md"
					>
						Close
					</button>
					<button
						onClick={handleDeleteEmployee}
						className="bg-green-700 flex justify-center gap-2 items-center text-white rounded-md px-6 py-1"
					>
						{loading && <Loader className="h-4 w-4" />}
						{loading ? "Deleting" : "Yes"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteEmployee;
