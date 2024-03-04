import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(true);
	const [employeeList, setEmployeeList] = useState([
		{
			name: "",
			course: ["BCA", "MCA", "B-Tech"],
		},
	]);

	useEffect(() => {
		const getEmployeeList = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:8080/employee/employees"
				);
				setEmployeeList(data);
				console.log(data);
			} catch (error) {}
		};
		getEmployeeList();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				loading,
				setLoading,
				loggedIn,
				setLoggedIn,
				employeeList,
				setEmployeeList,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;
